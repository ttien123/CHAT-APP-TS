export const setListMebNewMessToLS = (value: string[]) => {
    localStorage.setItem('listMemberNewMess', JSON.stringify(value));
};

export const getListMebNewMessToLS = () => {
    const result = localStorage.getItem('listMemberNewMess');
    return result ? JSON.parse(result) : [];
};
