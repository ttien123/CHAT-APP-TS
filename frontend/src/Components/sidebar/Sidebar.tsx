import { useParams } from 'react-router-dom';
import Conversations from './Conversations';
import LogoutButton from './LogoutButton';
import SearchInput from './SearchInput';

const Sidebar = () => {
    const { id } = useParams();
    return (
        <div
            className={`${
                id ? 'hidden md:flex' : 'flex'
            } w-[100vw] md:w-auto h-[100vh] md:h-auto max-h-[100vh] border-r border-slate-500 py-4 md:p-4 flex-col`}
        >
            <SearchInput />
            <div className="divider px-3"></div>
            <Conversations />
        </div>
    );
};
export default Sidebar;
