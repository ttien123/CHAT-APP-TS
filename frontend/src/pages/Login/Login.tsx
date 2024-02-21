import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Input from 'src/Components/Input';
import authApi from 'src/apis/auth.api';
import path from 'src/constants/path';
import { AuthSchema, authSchema } from 'src/utils/rules';
import useSetProfile from 'src/zustand/auth.ztd';

export type FormDataLogin = Pick<AuthSchema, 'username' | 'password'>;
const loginSchema = authSchema.pick(['username', 'password']);

const Login = () => {
    const setProfile = useSetProfile((state) => state.setProfile);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormDataLogin>({
        defaultValues: {
            username: '',
            password: '',
        },
        resolver: yupResolver(loginSchema),
    });

    const loginAccountMutation = useMutation({
        mutationFn: (body: FormDataLogin) => authApi.login(body),
    });

    const onSubmit = handleSubmit((data) => {
        loginAccountMutation.mutate(data, {
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
                    Login
                    <span className="text-blue-500"> ChatApp</span>
                </h1>

                <form onSubmit={onSubmit}>
                    <Input
                        errorsMessage={errors.username?.message}
                        register={register}
                        name="username"
                        labelName="Username"
                        classNameLabel="label p-2"
                        placeholder="Enter username"
                    />
                    <Input
                        errorsMessage={errors.password?.message}
                        register={register}
                        name="password"
                        type="password"
                        labelName="Password"
                        classNameLabel="label"
                        placeholder="Enter Password"
                    />
                    <Link
                        to={path.signUp}
                        className="text-sm text-white hover:underline hover:text-blue-600 mt-2 inline-block"
                    >
                        {"Don't"} have an account?
                    </Link>

                    <div>
                        <button className="btn btn-block btn-sm mt-2" disabled={loginAccountMutation.isPending}>
                            {loginAccountMutation.isPending ? (
                                <span className="loading loading-spinner "></span>
                            ) : (
                                'Login'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Login;
