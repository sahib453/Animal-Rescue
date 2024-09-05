import { BrowserRouter, Routes,Route } from "react-router-dom";
import { lazy,Suspense } from 'react';
import { Navigate } from "react-router-dom";
const Homepage = lazy(()=>import('./frontend/Homepage'))
const UserDash = lazy(()=>import('./frontend/UserDash'))
const Userlogin = lazy(()=>import('./frontend/Userlogin'))
const UserSignUp = lazy(()=>import('./frontend/UserSignUp'))
const NgoDash = lazy(()=>import('./frontend/NgoDash'))
const Ngologin = lazy(()=>import('./frontend/NGOlogin'))
const Ngosignup = lazy(()=>import('./frontend/Ngosignup'))

import LoadingSpinner from "./frontend/components/Loading";



function App(){

return <>
<BrowserRouter>
<Routes>

<Route path='/' element={<Suspense fallback={<LoadingSpinner/>}><Homepage/></Suspense>}></Route>
<Route path='/user-dash' element={<Suspense fallback={<LoadingSpinner/>}><UserDash/></Suspense>}></Route>
<Route path='/user-login' element={<Suspense fallback={<LoadingSpinner/>}><Userlogin/></Suspense>}></Route>
<Route path='/user-signup' element={<Suspense fallback={<LoadingSpinner/>}><UserSignUp/></Suspense>}></Route>
<Route path='/ngo-dash' element={<Suspense fallback={<LoadingSpinner/>}><NgoDash/></Suspense>}></Route>
<Route path='/ngo-login' element={<Suspense fallback={<LoadingSpinner/>}><Ngologin/></Suspense>}></Route>
<Route path='/ngo-signup' element={<Suspense fallback={<LoadingSpinner/>}><Ngosignup/></Suspense>}></Route>
<Route path="*" element={<Navigate to="/" />} />








</Routes>



</BrowserRouter>

</>

}

export default App