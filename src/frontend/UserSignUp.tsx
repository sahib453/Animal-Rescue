import Button from "./components/Button";
import Heading from "./components/Heading";
import Inputbox from "./components/Inputbox";
import Subheading from "./components/Subheading";
import BottomWarning from "./components/Bottomwarning";
import {useNavigate} from 'react-router-dom'
import { useState } from "react";
import api from "./api";
export default function UserSignup(){
    const [email,setEmail] = useState("");
    const [name,setName] = useState("");
    const [phone,setPhone] = useState("");
    const [address,setAddress] = useState("");
    const [password,setPassword] = useState("");
    const [message,setMessage] = useState("");
    const [error,setError] = useState("");


    const navigate = useNavigate()
return <>
<div className="flex justify-center border bg-slate-300 h-screen ">
    <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max">
   
        <Heading label="Sign UP"/>
        <Subheading label="Enter your account information to create a new account"/>
<Inputbox
                label="Email"
                placeholder="Johndoe@email.com"
                onChange={(e) => setEmail(e.target.value)}
                type="text"
            />
            <Inputbox label="Name" placeholder="John Doe" onChange={(e)=>setName(e.target.value)}
type="text"/>

            <Inputbox label="Password" placeholder="123@pass" onChange={(e)=>setPassword(e.target.value)}
type="password"/>
            <Inputbox label="Phone" placeholder="9211420420" onChange={(e)=>setPhone(e.target.value)} type="text"/>
            <Inputbox label="Address" placeholder="21 Sector .." onChange={(e)=>setAddress(e.target.value)} type="text"/>



          <Button label="Sign Up" onClick={async()=>{
            try{
                const response = await api.post('api/user/signup',{
                email,
                name,
                phone,
                address,
                password
            })
            setError("");
            localStorage.setItem('token',response.data.token);
            setMessage(response.data.msg);
            setTimeout(()=>{
                navigate('/user-dash');
            },2000)

            }catch(error:any){

                setError(error.response.data.msg)

            }
            
            
          }}/>
          {error && <div className="text-md text-red-500 text-xl ">{error}</div>}
          {message && <div className="text-md text-green-500 text-xl ">{message}</div>}

          <BottomWarning label="Already A Registered User?" buttonText="Login Now" to="/user-login"/>

            </div>
            </div></div>
          


            </>
}
