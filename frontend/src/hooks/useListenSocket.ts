import { useEffect, useState } from 'react';
import useSetProfile from 'src/zustand/auth.ztd';
import { io } from 'socket.io-client';
import useGetStateSocket from 'src/zustand/socket.ztd';
import useGetMessage from 'src/zustand/message.ztd';
import notificationSound from 'src/assets/sounds/notification.mp3';

export const useListenSocket = () => {
    const { profile } = useSetProfile();
    const { setOnlineUsers, setSocket, socket } = useGetStateSocket();
    useEffect(() => {
        if (profile) {
            const socket = io('http://localhost:5000', {
                query: {
                    userId: profile._id,
                },
            });

            setSocket(socket);

            // socket.on() is used to listen to the events. can be used both on client and server side
            socket.on('getOnlineUsers', (users) => {
                setOnlineUsers(users);
            });

            return () => {
                socket.close();
            };
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [profile]);
};

export const useListenMessages = (id: string | undefined) => {
    const { socket } = useGetStateSocket();
    const { messages, setMessages, setIsCheckMessages, setListMebNewMess } = useGetMessage();

    useEffect(() => {
        socket?.on('newMessage', (newMessage) => {
            setIsCheckMessages(false);
            if (newMessage.senderId === id) {
                setMessages([...messages, newMessage]);
            } else {
                const sound = new Audio(notificationSound);
                sound.play();
                setListMebNewMess({ id: newMessage.senderId, type: false });
            }
        });

        return () => {
            socket?.off('newMessage');
        };
    }, [socket, setMessages, messages, id]);
};

export const useListenWriting = () => {
    const { socket } = useGetStateSocket();
    const { setIsWriting, isWriting } = useGetMessage();
    const [idReceiverTyping, setIdReceiverTyping] = useState('');

    useEffect(() => {
        socket?.on('typingServer', ({ senderId, _, message }) => {
            !isWriting && message && setIsWriting(Boolean(message));
            isWriting && !message && setIsWriting(Boolean(message));
            setIdReceiverTyping(senderId);
        });

        return () => {
            socket?.off('typingServer');
        };
    }, [socket, setIsWriting, isWriting, idReceiverTyping, setIdReceiverTyping]);

    return { isWriting, idReceiverTyping };
};
