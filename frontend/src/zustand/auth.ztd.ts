import { AuthResponse } from 'src/types/auth.type';
import { getProfileFromLS, setProfileToLS } from 'src/utils/auth';
import { create } from 'zustand';

interface profileInterface {
    profile: AuthResponse | null;
    setProfile: (body: AuthResponse | null) => void;
}

const useSetProfile = create<profileInterface>()((set) => ({
    profile: getProfileFromLS(),
    setProfile: (body) =>
        set((state) => {
            const updatedState = { ...state, profile: body };
            setProfileToLS(body);
            return updatedState;
        }),
}));

export default useSetProfile;
