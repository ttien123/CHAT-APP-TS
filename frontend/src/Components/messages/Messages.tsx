import { useParams } from 'react-router-dom';
import Message from './Message';
import { useQuery } from '@tanstack/react-query';
import messageApi from 'src/apis/message.api';
import { useEffect, useRef } from 'react';
import useGetMessage from 'src/zustand/message.ztd';
import MessageSkeleton from '../skeletons/MessageSkeleton';
import { useListenMessages, useListenWriting } from 'src/hooks/useListenSocket';

const Messages = () => {
    const { id } = useParams();
    const lastMessageRef = useRef(null);
    const { setMessages, messages, setIsCheckMessages } = useGetMessage();
    const { isWriting, idReceiverTyping } = useListenWriting();
    const { data, isLoading } = useQuery({
        queryKey: ['Messages', id],
        queryFn: () => messageApi.getMessages(id),
    });

    useListenMessages(id);

    useEffect(() => {
        setTimeout(() => {
            (lastMessageRef.current as any)?.scrollIntoView({ behavior: 'smooth' });
        }, 0);
    }, [messages, isWriting]);

    useEffect(() => {
        data?.data && setMessages(data?.data);
        setIsCheckMessages(true);
    }, [data, setMessages]);

    return (
        <div className="px-4 flex-1 overflow-auto pb-2">
            {!isLoading &&
                messages.length > 0 &&
                messages.map((message) => (
                    <div key={message._id} ref={lastMessageRef}>
                        <Message message={message} />
                    </div>
                ))}
            {messages.length > 0 && isWriting && idReceiverTyping === id && (
                <div ref={lastMessageRef}>
                    <Message />
                </div>
            )}
            {isLoading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
            {!isLoading && messages.length === 0 && (
                <p className="text-center text-white">Send a message to start the conversation</p>
            )}
        </div>
    );
};
export default Messages;
