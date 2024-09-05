// Inputbox.tsx

interface InputboxProps {
    label: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    type:string;
}

const Inputbox  = ({ label, onChange, placeholder,type }:InputboxProps) => {
    return (
        <div>
            <div className="text-left font-semibold py-2 text-sm">
                {label}
            </div>
            <input
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                className="w-full px-2 py-1 rounded border border-slate-200"
            />
        </div>
    );
};

export default Inputbox;
