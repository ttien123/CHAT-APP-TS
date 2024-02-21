export type UserCreate = {
    _id: string;
    fullName: string;
    username: string;
    gender: string;
    profilePic: string;
    createdAt: string;
    updatedAt: string;
    __v: 0;
};

export type ListUserCreate = UserCreate[];
