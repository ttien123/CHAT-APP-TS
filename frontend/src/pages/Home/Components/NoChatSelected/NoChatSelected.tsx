import { TiMessages } from 'react-icons/ti';
import useSetProfile from 'src/zustand/auth.ztd';

const NoChatSelected = () => {
    const { profile } = useSetProfile();
    return (
        <div className="hidden md:min-w-[450px] md:flex flex-col">
            <div className="flex items-center justify-center w-full h-full">
                <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
                    <p>Welcome 👋 {profile?.fullName} ❄</p>
                    <p>Select a chat to start messaging</p>
                    <TiMessages className="text-3xl md:text-6xl text-center" />
                </div>
            </div>
        </div>
    );
};

export default NoChatSelected;
