import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BsSend } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import messageApi from 'src/apis/message.api';
import useSetProfile from 'src/zustand/auth.ztd';
import useGetMessage from 'src/zustand/message.ztd';
import useGetStateSocket from 'src/zustand/socket.ztd';

const MessageInput = () => {
    const { id } = useParams();
    const { profile } = useSetProfile();
    const [message, setMessage] = useState('');
    const { messages, setMessages, setIsCheckMessages, setListMebNewMess } = useGetMessage();
    const { socket } = useGetStateSocket();
    const [typingCount, setTypingCount] = useState(0);
    const sendMessageMutation = useMutation({
        mutationFn: (body: { id: string; message: string }) => messageApi.sendMessage(body),
    });

    useEffect(() => {
        if (message && typingCount === 0) {
            socket?.emit('typing', { senderId: profile?._id, receiverId: id, message });
            setTypingCount(1);
        } else if (!message && typingCount === 1) {
            socket?.emit('typing', { senderId: profile?._id, receiverId: id, message: '' });
            setTypingCount(0);
        }

        return () => {
            socket?.off('typing');
        };
    }, [message, id, profile?._id, socket, typingCount]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmedMessage = message.trim();

        if (trimmedMessage === '') {
            setMessage('');
            return;
        }
        const data = { id, message };
        sendMessageMutation.mutate(data as { id: string; message: string }, {
            onSuccess: (data) => {
                setMessages([...messages, data.data]);
            },
            onError: () => {
                toast.error('Error');
            },
        });
        setMessage('');
    };

    return (
        <form className="px-4 my-3" onSubmit={handleSubmit}>
            <div className="w-full relative">
                <input
                    type="text"
                    className="border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white"
                    placeholder="Send a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onFocus={() => {
                        setIsCheckMessages(true);
                        id && setListMebNewMess({ id, type: true });
                    }}
                />
                <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3 text-white">
                    {sendMessageMutation.isPending ? <div className="loading loading-spinner"></div> : <BsSend />}
                </button>
            </div>
        </form>
    );
};
export default MessageInput;
