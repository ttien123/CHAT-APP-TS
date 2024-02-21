import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import path from 'src/constants/path';
import { UserCreate } from 'src/types/conversation.type';
import useGetMessage from 'src/zustand/message.ztd';
import useGetStateSocket from 'src/zustand/socket.ztd';

interface Props {
    conversation: UserCreate;
    emoji: string;
    lastIdx: boolean;
}

const Conversation = ({ conversation, lastIdx, emoji }: Props) => {
    const [isSelected, setIsSelected] = useState(false);
    const { listMebNewMess } = useGetMessage();
    const { onlineUsers } = useGetStateSocket();
    const isNewMessNoSelect = listMebNewMess.includes(conversation._id as never);
    const isOnline = onlineUsers.includes(conversation._id as never);
    const { id } = useParams();
    useEffect(() => {
        setIsSelected(id === conversation._id);
    }, [id]);

    return (
        <>
            <Link
                to={`/messages/${conversation._id}`}
                className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? 'bg-sky-500' : ''}
				${isNewMessNoSelect && !isSelected ? '!bg-red-500' : ''}
			`}
            >
                <div className={`avatar ${isOnline ? 'online' : ''} `}>
                    <div className="w-12 rounded-full">
                        <img src={conversation.profilePic} alt="user avatar" />
                    </div>
                </div>

                <div className="flex flex-col flex-1">
                    <div className="flex gap-3 justify-between">
                        <p className="font-bold text-gray-200">{conversation.fullName}</p>
                        <span className="text-xl">{emoji}</span>
                    </div>
                </div>
            </Link>

            {!lastIdx && <div className="divider my-0 py-0 h-1" />}
        </>
    );
};
export default Conversation;
