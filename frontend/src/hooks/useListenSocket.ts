import { useEffect } from 'react';
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
                setListMebNewMess({ id: newMessage.senderId, type: false });
                const sound = new Audio(notificationSound);
                sound.play();
            }
        });

        return () => {
            socket?.off('newMessage');
        };
    }, [socket, setMessages, messages, id]);
};
