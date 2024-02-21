import * as yup from 'yup';

const handleConfirmPasswordYup = (refString: string) => {
    return yup
        .string()
        .required('Confirm Password is a required field')
        .min(6, 'Length from 6 - 160 characters')
        .max(160, 'Length from 6 - 160 characters')
        .oneOf([yup.ref(refString)], 'Re-enter the password does not match');
};

export const authSchema = yup.object({
    username: yup.string().required('Username is a required field').min(4, 'Username must be at least 4 characters'),
    fullName: yup.string().required('Full name is a required field').max(160, 'Length from 5 - 160 characters'),
    gender: yup.string().required('You need to select the gender field'),
    password: yup.string().required('Password is a required field').min(6, 'Password must be at least 6 characters'),
    confirmPassword: handleConfirmPasswordYup('password'),
});

export type AuthSchema = yup.InferType<typeof authSchema>;
