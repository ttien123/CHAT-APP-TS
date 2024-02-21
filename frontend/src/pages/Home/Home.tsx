import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from 'src/Components/sidebar/Sidebar';
import useGetMessage from 'src/zustand/message.ztd';
import notificationSound from 'src/assets/sounds/notification.mp3';

const Home = () => {
    const { messages, setMessages, isCheckMessages, setIsCheckMessages } = useGetMessage();

    useEffect(() => {
        const titleElement = document.querySelector('title');
        const sound = new Audio(notificationSound);
        if (document.visibilityState != 'visible') {
            !isCheckMessages && sound.play();
            !isCheckMessages && titleElement && (titleElement.textContent = 'You have new notification');
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
        <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            <Sidebar />
            <Outlet />
        </div>
    );
};
export default Home;
