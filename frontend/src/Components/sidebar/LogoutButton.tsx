import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { BiLogOut } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import authApi from 'src/apis/auth.api';
import path from 'src/constants/path';
import { setListMebNewMessToLS } from 'src/utils/messages';
import useSetProfile from 'src/zustand/auth.ztd';

const LogoutButton = () => {
    const profile = useSetProfile((state) => state.profile);
    const setProfile = useSetProfile((state) => state.setProfile);
    const navigate = useNavigate();

    const logoutAccountMutation = useMutation({
        mutationFn: () => authApi.logout(),
        onSuccess: () => {
            setProfile(null), navigate(path.login);
            setListMebNewMessToLS([]);
        },
    });

    const handleLogout = () => {
        logoutAccountMutation.mutate();
    };
    return (
        <div className="mt-auto">
            {profile ? (
                <BiLogOut className="w-6 h-6 text-white cursor-pointer" onClick={handleLogout} />
            ) : (
                <span className="loading loading-spinner"></span>
            )}
        </div>
    );
};
export default LogoutButton;
