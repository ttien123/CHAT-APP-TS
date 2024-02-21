import { AuthResponse } from 'src/types/auth.type';

export const setProfileToLS = (profile: AuthResponse | null) => {
    localStorage.setItem('profile', JSON.stringify(profile));
};

export const getProfileFromLS = () => {
    const result = localStorage.getItem('profile');
    return result ? JSON.parse(result) : null;
};
