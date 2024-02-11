import Image from 'next/image';
import { StaticImageData } from "next/image";

interface InputFieldProps {
    name: string,
    type: string,
    label: string,
    svg: StaticImageData,
    value: string,
    handleChange: React.ChangeEventHandler<HTMLInputElement> | undefined,
    error: string | undefined,
    errorMessage: string | undefined,
    placeholder: string,
}

const InputField: React.FC<InputFieldProps> = ({
    svg, handleChange, value, error, errorMessage, 
    label, placeholder, name, type
}) => {
    return (
        <div className="pt-4 w-full">
            <label htmlFor={name} className="">
                {label}
            </label>
            
            <div className="flex overflow-hidden items-center py-1 mt-2 w-full rounded border border-grayy-400 transition-all focus-within:border-primary h-12 px-2 md:px-3">
                <div className="flex justify-center items-center">
                    <Image
                        width={24} height={24}
                        alt="email"
                        src={svg}
                        className="w-6 h-6 pointer-events-none"
                    />
                </div>
                                                
                <input type={type} name={name}
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="px-4 py-5 w-full focus:outline-none font-light border-0 focus:ring-0 my-2"
                />
            </div>
                                            
            {error && (
                <p className="text-red-700 pt-1">{errorMessage}</p>
            )}
        </div>
    );
}

export default InputField;