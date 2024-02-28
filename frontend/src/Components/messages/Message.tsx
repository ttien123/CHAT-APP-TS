import { AuthResponse } from 'src/types/auth.type';
import { MessageType } from 'src/types/message.type';
import { extractTime } from 'src/utils/extractTime';
import useSetProfile from 'src/zustand/auth.ztd';
import useSelectUser from 'src/zustand/selectUser';

const Message = ({ message }: { message?: MessageType }) => {
    const { profile } = useSetProfile();
    const { selectUser } = useSelectUser();

    const formattedTime = message && extractTime(message?.createdAt);
    const fromMe = profile && message?.senderId === profile._id;
    const bubbleBgColor = fromMe ? 'bg-blue-500' : '';

    const chatClassName = fromMe ? 'chat-end' : 'chat-start';
    const profilePic = fromMe ? profile.profilePic : selectUser && selectUser.profilePic;

    return (
        <div className={`chat ${chatClassName}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS chat bubble component" src={profilePic || ''} />
                </div>
            </div>
            {message && <div className={`chat-bubble text-white ${bubbleBgColor} pb-2`}>{message.message}</div>}
            {!message && <div className={`chat-bubble text-white ${bubbleBgColor} pb-2`}>Typing...</div>}
            {message && (
                <div className="chat-footer opacity-50 text-xs flex gap-1 items-center text-white">{formattedTime}</div>
            )}
        </div>
    );
};
export default Message;
