import { UseFormSetValue } from 'react-hook-form';
import { FormDataSignUp } from 'src/pages/SignUp/SignUp';

const GenderCheckbox = ({
    selectGender,
    setSelectGender,
    setValue,
}: {
    selectGender: string;
    setSelectGender: React.Dispatch<React.SetStateAction<string>>;
    setValue: UseFormSetValue<FormDataSignUp>;
}) => {
    return (
        <div className="flex">
            <div className="form-control">
                <label className={`label gap-2 cursor-pointer selected`}>
                    <span className="label-text text-white">Male</span>
                    <input
                        type="checkbox"
                        checked={selectGender === 'Male'}
                        onChange={() => {
                            setSelectGender('male');
                            setValue('gender', 'Male');
                        }}
                        className="checkbox border-slate-900"
                    />
                </label>
            </div>
            <div className="form-control">
                <label className={`label gap-2 cursor-pointer`}>
                    <span className="label-text text-white">Female</span>
                    <input
                        type="checkbox"
                        checked={selectGender === 'Female'}
                        onChange={() => {
                            setSelectGender('Female');
                            setValue('gender', 'female');
                        }}
                        className="checkbox border-slate-900"
                    />
                </label>
            </div>
        </div>
    );
};
export default GenderCheckbox;
