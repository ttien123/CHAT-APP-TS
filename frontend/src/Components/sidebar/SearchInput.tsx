import { useEffect, useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import useDebounce from 'src/hooks/useDebounce';
import useSetProfile from 'src/zustand/auth.ztd';
import useGetValueSearch from 'src/zustand/conversation.ztd';
import LogoutButton from './LogoutButton';
const SearchInput = () => {
    const [valueInput, setValueInput] = useState('');
    const { setValueSearch } = useGetValueSearch();
    const debouncedValue = useDebounce(valueInput, 500);
    const { profile } = useSetProfile();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setValueInput(e.target.value);
        }
    };

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setValueSearch('');
        } else {
            setValueSearch(debouncedValue);
        }
    }, [debouncedValue]);
    return (
        <form className="flex items-center p-2">
            <div className="flex-1 flex items-center justify-between">
                <input
                    type="text"
                    value={valueInput}
                    onChange={handleChange}
                    placeholder="Search…"
                    className="input input-bordered rounded-full flex-1"
                />
                <div className="btn btn-circle bg-sky-500 text-white ml-2">
                    <IoSearchSharp className="w-6 h-6 outline-none" />
                </div>
            </div>

            <div className="dropdown dropdown-bottom dropdown-end ml-2">
                <div tabIndex={0} role="button" className="btn h-auto">
                    <div className={`avatar`}>
                        <div className="w-12 rounded-full">
                            <img src={(profile && profile.profilePic) || ''} alt="user avatar" />
                        </div>
                    </div>
                </div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                        <LogoutButton />
                    </li>
                </ul>
            </div>
        </form>
    );
};
export default SearchInput;
