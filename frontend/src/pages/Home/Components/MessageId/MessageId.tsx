import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MessageInput from 'src/Components/messages/MessageInput';
import Messages from 'src/Components/messages/Messages';
import conversationApi from 'src/apis/conversation.api';
import useSelectUser from 'src/zustand/selectUser';
import { FaAngleLeft } from 'react-icons/fa6';
import path from 'src/constants/path';
const MessageId = () => {
    const { id } = useParams();
    const negative = useNavigate();
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
        <div className="h-[100vh] md:h-auto min-w-[100vw] md:min-w-[450px] flex flex-col">
            <div className="bg-slate-500 px-2 py-2 mb-2 flex items-center justify-center md:justify-start">
                <button className="md:hidden block p-2" onClick={() => negative(path.home)}>
                    <FaAngleLeft />
                </button>
                <div className="flex-1 text-center md:text-left">
                    <span className="label-text hidden md:inline">To:</span>{' '}
                    <span className="text-gray-900 font-bold pr-8 md:pr-0">{data?.data.fullName}</span>
                </div>
            </div>
            <Messages />
            <MessageInput />
        </div>
    );
};

export default MessageId;
