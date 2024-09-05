interface Heading{
    label:string
}
export default function Heading({label}:Heading){
    return <>
    <h1 className="font-bold text-4xl pt-6">{label}</h1>
    </>
}