import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import GenderCheckbox from 'src/Components/GenderCheckbox';
import Input from 'src/Components/Input';
import authApi from 'src/apis/auth.api';
import path from 'src/constants/path';
import { AuthSchema, authSchema } from 'src/utils/rules';
import useSetProfile from 'src/zustand/auth.ztd';

export type FormDataSignUp = Pick<AuthSchema, 'username' | 'password' | 'confirmPassword' | 'fullName' | 'gender'>;
const registerSchema = authSchema.pick(['username', 'password', 'confirmPassword', 'fullName', 'gender']);

const SignUp = () => {
    const [selectGender, setSelectGender] = useState('');
    const setProfile = useSetProfile((state) => state.setProfile);
    const navigate = useNavigate();
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<FormDataSignUp>({
        defaultValues: {
            fullName: '',
            username: '',
            password: '',
            confirmPassword: '',
            gender: '',
        },
        resolver: yupResolver(registerSchema),
    });

    const registerAccountMutation = useMutation({
        mutationFn: (body: FormDataSignUp) => authApi.signup(body),
    });
    // useEffect(() => {
    //     const { confirmPassword, fullName, gender, password, username } = test;
    //     const handle = async () => {
    //         try {
    //             const res = await fetch('/api/auth/signup', {
    //                 method: 'POST',
    //                 headers: { 'Content-Type': 'application/json' },
    //                 body: JSON.stringify({
    //                     fullName,
    //                     username,
    //                     password,
    //                     confirmPassword,
    //                     gender,
    //                 }),
    //             });

    //             const data = await res.json();
    //             console.log(data);

    //             if (data.error) {
    //                 throw new Error(data.error);
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         } finally {
    //         }
    //     };
    //     handle();
    // }, [test]);

    const onSubmit = handleSubmit((data) => {
        registerAccountMutation.mutate(data, {
            onSuccess: (data) => {
                setProfile(data.data);
                navigate('/');
            },
            onError: (errors) => {
                toast.error(errors.message);
            },
        });
    });

    return (
        <div className="flex flex-col items-center justify-center min-w-full md:min-w-96 mx-auto">
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
                <h1 className="text-3xl font-semibold text-center text-gray-300">
                    Sign Up <span className="text-blue-500"> ChatApp</span>
                </h1>

                <form onSubmit={onSubmit}>
                    <Input
                        errorsMessage={errors.fullName?.message}
                        register={register}
                        name="fullName"
                        labelName="Full Name"
                        classNameLabel="label p-2"
                        placeholder="John Doe"
                    />
                    <Input
                        errorsMessage={errors.username?.message}
                        register={register}
                        name="username"
                        labelName="Username"
                        classNameLabel="label p-2"
                        placeholder="johndoe"
                    />
                    <Input
                        errorsMessage={errors.password?.message}
                        register={register}
                        type="password"
                        name="password"
                        labelName="Password"
                        placeholder="Enter Password"
                    />
                    <Input
                        errorsMessage={errors.confirmPassword?.message}
                        register={register}
                        type="password"
                        name="confirmPassword"
                        labelName="Confirm Password"
                        placeholder="Confirm Password"
                    />

                    <GenderCheckbox selectGender={selectGender} setSelectGender={setSelectGender} setValue={setValue} />

                    <div className="mt-1 mb-1 text-red-600 min-h-[2px] text-[14px] font-semibold">
                        {!selectGender && errors.gender?.message}
                    </div>

                    <Link
                        to={path.login}
                        className="text-sm text-white hover:underline hover:text-blue-600 mt-2 inline-block"
                    >
                        Already have an account?
                    </Link>

                    <div>
                        <div>
                            <button className="btn btn-block btn-sm mt-2" disabled={registerAccountMutation.isPending}>
                                {registerAccountMutation.isPending ? (
                                    <span className="loading loading-spinner "></span>
                                ) : (
                                    'Login'
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default SignUp;
