import { InputHTMLAttributes } from 'react';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    errorsMessage?: string;
    classNameInput?: string;
    classNameError?: string;
    classNameLabel?: string;
    classNameWrapper?: string;
    register?: UseFormRegister<any>;
    rules?: RegisterOptions;
    labelName: string;
}

const Input = ({
    register,
    errorsMessage,
    name,
    type = 'text',
    rules,
    classNameWrapper,
    classNameInput = 'w-full input input-bordered  h-10',
    classNameError = 'mt-1 mb-1 text-red-600 min-h-[2px] text-[14px] font-semibold',
    classNameLabel = 'label',
    placeholder,
    autoComplete,
    labelName,
    ...rest
}: Props) => {
    const registerResult = register && name ? register(name, rules) : null;

    return (
        <div className={classNameWrapper}>
            <label className={classNameLabel}>
                <span className="text-base label-text text-white">{labelName}</span>
            </label>
            <input
                placeholder={placeholder}
                autoComplete="current-password"
                type={type}
                className={classNameInput}
                {...registerResult}
                {...rest}
            />
            {type != 'checkbox' && <div className={classNameError}>{errorsMessage}</div>}
        </div>
    );
};

export default Input;
