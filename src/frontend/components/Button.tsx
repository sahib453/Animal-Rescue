import * as React from "react";

interface Butt{
    label:string;
    onClick: (event:React.MouseEvent<HTMLButtonElement>)=>void;
}


export default function Button({label,onClick}:Butt){
    return <div>
        <button onClick={onClick} className="px-4 text-white py-3 mt-5 mb-3 w-full bg-slate-900 rounded-lg hover:bg-slate-800">{label}</button>
    </div>

}