import { useEffect, useState } from 'react';
import { IoSearchSharp } from 'react-icons/io5';
import useDebounce from 'src/hooks/useDebounce';
import useGetConversation from 'src/zustand/conversation.ztd';

const SearchInput = () => {
    const [valueSearch, setValueSearch] = useState('');
    const { setListConversation, listConversation } = useGetConversation();
    const debouncedValue = useDebounce(valueSearch, 500);
    console.log(debouncedValue);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setValueSearch(e.target.value);
        }
    };

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setListConversation([]);
        } else {
            const newList = listConversation.filter((e) =>
                e.fullName.toLocaleLowerCase().includes(debouncedValue?.toLocaleLowerCase() || ''),
            );
            setListConversation(newList);
        }
    }, [debouncedValue]);
    return (
        <form className="flex items-center gap-2">
            <input
                type="text"
                value={valueSearch}
                onChange={handleChange}
                placeholder="Search…"
                className="input input-bordered rounded-full"
            />
            <button type="submit" className="btn btn-circle bg-sky-500 text-white">
                <IoSearchSharp className="w-6 h-6 outline-none" />
            </button>
        </form>
    );
};
export default SearchInput;
