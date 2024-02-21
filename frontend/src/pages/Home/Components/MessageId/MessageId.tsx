import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MessageInput from 'src/Components/messages/MessageInput';
import Messages from 'src/Components/messages/Messages';
import conversationApi from 'src/apis/conversation.api';
import useSelectUser from 'src/zustand/selectUser';

const MessageId = () => {
    const { id } = useParams();

    const { setSelectUser } = useSelectUser();
    const { data } = useQuery({
        queryKey: ['User', id],
        queryFn: () => conversationApi.getUser(id),
        staleTime: 3 * 60 * 1000,
    });

    useEffect(() => {
        data?.data && setSelectUser(data?.data);
    }, [data]);
    return (
        <div className="md:min-w-[450px] flex flex-col">
            <div className="bg-slate-500 px-4 py-2 mb-2">
                <span className="label-text">To:</span>{' '}
                <span className="text-gray-900 font-bold">{data?.data.fullName}</span>
            </div>
            <Messages />
            <MessageInput />
        </div>
    );
};

export default MessageId;
