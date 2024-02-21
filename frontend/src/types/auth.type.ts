export type AuthResponse = {
    _id: string;
    fullName: string;
    username: string;
    profilePic: string;
};

export type FormDataSignUp = {
    username: string;
    fullName: string;
    gender: string;
    password: string;
    confirmPassword: string;
};

export type FormDataLogin = {
    username: string;
    password: string;
};
