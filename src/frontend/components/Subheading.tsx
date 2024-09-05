interface Subhead {
    label : string;
}

export default function Subheading({label}:Subhead){
return<>
<div className="text-slate-500 pt-1 px-4 pb-4 mt-2" >{label}</div>
</>
}