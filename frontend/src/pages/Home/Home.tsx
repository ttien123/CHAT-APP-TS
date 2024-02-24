import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import Sidebar from 'src/Components/sidebar/Sidebar';
import useGetMessage from 'src/zustand/message.ztd';
import notificationSound from 'src/assets/sounds/notification.mp3';
import { useListenMessages } from 'src/hooks/useListenSocket';

const Home = () => {
    const { id } = useParams();
    const { messages, setMessages, isCheckMessages, setIsCheckMessages } = useGetMessage();
    useListenMessages(id);
    useEffect(() => {
        const titleElement = document.querySelectorAll('title');
        const sound = new Audio(notificationSound);
        if (document.visibilityState != 'visible') {
            !isCheckMessages && sound.play();
            !isCheckMessages && titleElement && (titleElement[0].textContent = 'You have new notification');
        }
    }, [setMessages, messages, isCheckMessages, setIsCheckMessages]);

    useEffect(() => {
        const titleElement = document.querySelectorAll('title');

        const handleVisibilityChange = () => {
            if (!document.hidden) {
                titleElement && (titleElement[0].textContent = 'CHAT-APP-TS');
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    return (
        <div className="flex md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            <Sidebar />
            <div
                className={`${!id ? 'hidden md:flex' : ''} min-w-[100vw] md:min-w-[450px] items-center justify-center`}
            >
                <Outlet />
            </div>
        </div>
    );
};
export default Home;
