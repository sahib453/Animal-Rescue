import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function Appbar() {
    const navigate = useNavigate();
    return (
        <div className="flex w-full h-14 px-3 border-b-2 text-xl shadow-sm justify-between items-center">
            <div className="font-semibold">Animal Rescue</div>
            <div className="flex items-center mr-2 space-x-2">
                
                <div className="flex justify-center text-sm mb-2">
                <Button label="Logout" onClick={()=>{
                    localStorage.removeItem('token'); 
                    navigate('/');
                    } }/>
                </div>
            </div>
        </div>
    );
}
