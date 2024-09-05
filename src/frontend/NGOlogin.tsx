import BottomWarning from "./components/Bottomwarning";
import Button from "./components/Button";
import Heading from "./components/Heading";
import Inputbox from "./components/Inputbox";
import Subheading from "./components/Subheading";
import { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";



export default  function Ngologin(){
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword]= useState("");
    const [error,setError] = useState("");
    const [message,setMessage] = useState("");

    useEffect(()=>{
      const isLoggedIn = async()=>{
     const token  = localStorage.getItem('token');
     if(token){
      const response = await api.get('/api/ngo/ngome',{
        headers:{
          Authorization:token
        },

        
      })
      if(response.status === 200){
        navigate('/ngo-dash')
      }
     }
      }
      
      isLoggedIn();

    },[])
    
    

return <>
<div className="flex justify-center border bg-slate-300 h-screen ">
    <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max">
   
        <Heading label="Sign In"/>
        <Subheading label="Enter your account information to create a new account"/>
<Inputbox
                label="Email"
                placeholder="Johndoe@email.com"
                onChange={(e) => setEmail(e.target.value)}
                type="text"
            />
        
            <Inputbox label="Password" placeholder="123@pass" onChange={(e)=>setPassword(e.target.value)}
type="password"/>
          <Button label="Sign In" onClick={async()=>{
             try {
                const response = await api.post('/api/ngo/login', {
                  email,
                  password,
                });
          
                if (response.data.token) {
                    setError("")
                    setMessage(response.data.msg);
                  localStorage.setItem('token', response.data.token);
                  setTimeout(()=>{
                    navigate('/ngo-dash');

                  },2000)
                }
              } catch (error:any) {
                if (error.response && error.response.status === 403 || error.response.status===400) {
                  
                  setError(error.response.data.msg)
                  
                } else {
                  setError("Unexpected Error Occured")
                }
              }
            }}/>
            {error && <div className="text-red-500 mt-4 text-center">{error}</div>}
            {message && <div className="text-green-500 mt-4 text-center">{message}</div>}
          <BottomWarning label="Not A Registered NGO?" buttonText="Sign Up Now" to="/ngo-signup"/>

            </div>
            </div></div>
          


            </>
}
