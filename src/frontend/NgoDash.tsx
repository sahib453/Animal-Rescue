import { useState, useEffect } from 'react';
import api from './api';
import Button from './components/Button';
import Appbar from './components/Appbar';

interface AnimalRequest {
  request_id: string;
  animal_type: string;
  user_phone:string;
  injury_description: string;
  address: string;
  image_url: string;
  request_status:boolean
}

export default function NgoDash() {
  const [ngoData, setNgoData] = useState<{ email?: string; fixed_address?: string;org_name?:string}>({});
  const [requests, setRequests] = useState<AnimalRequest[]>([]);
  const [message, setMessage] = useState<string>('');
  const [activeReq, setActiveReq] = useState<AnimalRequest[]>([]);

  useEffect(() => {
    const fetchNgoData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setMessage('No token found. Please log in.');
          return;
        }

        const ngoResponse = await api.get('api/ngo/ngome', {
          headers: {
            Authorization: `${token}`,
          },
        });

        setNgoData({
          email: ngoResponse.data.email,
          fixed_address: ngoResponse.data.fixed_address,
          org_name:ngoResponse.data.org_name
        });

        const requestsResponse = await api.get(`api/ngo/getReq`, {
          headers: {
            Authorization: `${token}`,
          },
        });

        const filteredRequests = requestsResponse.data.filter((request: AnimalRequest) => !request.request_status);
        setRequests(filteredRequests);
      } catch (error) {
        console.error(error);
        setMessage('Error fetching NGO data or requests.');
      }
    };

    fetchNgoData();
  }, []);

  useEffect(() => {
        
      
    const fetchActiveRequests = async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            setMessage('No token found. Please log in.');
            return;
          }
  
          const activeResponse = await api.get('api/ngo/getReqTrue', {
            headers: { Authorization: `${token}`,
               'X-Custom-Header':`${ngoData.org_name}`}
          });
          setActiveReq(activeResponse.data);
        } catch (error) {
          console.error(error);
          setMessage('Error fetching active requests.');
        }
      };
  
      fetchActiveRequests();
    }
    
  , [ngoData.org_name]);



  const handleAccept = async(id:string)=>{
    const token = localStorage.getItem('token');
     await api.get(`api/ngo/acceptReq?id=${id}`,
    {
        headers:{
        Authorization : `${token}`
    },
}
    )
    
    setMessage("Request Accepted");


  }

  return (
    <div>
      <Appbar />

    <div className="min-h-screen bg-gray-100 p-4">
            

      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">

        <h1 className="text-3xl font-bold text-center mb-6">NGO Dashboard</h1>
        {ngoData.email && (
          <>
            <p><strong>Your Email:</strong> {ngoData.email}</p>
            <p><strong>Fixed Address:</strong> {ngoData.fixed_address}</p>
          </>
        )}
        {message && <p className="mt-4 text-red-500 text-center">{message}</p>}
      </div>
     
        {activeReq.length > 0 ? (

          <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-3 mt-6">
            <div className="flex justify-center">
            <div className="text-3xl text-green-500"> 
              ACTIVE Requests
              </div>
              </div>
            <ul className="space-y-4">

              {activeReq.map((request) => (
                <li key={request.request_id} className="p-4 border border-gray-300 rounded">
                  <p><strong>Animal Type:</strong> {request.animal_type}</p>
                  <p><strong> Description:</strong> {request.injury_description}</p>
                  <p><strong>Address:</strong> {request.address}</p>
                  <div className='flex justify-between pb-2'>
                  <p><strong>User Phone:</strong> {request.user_phone}</p>
                  <a href={`https://wa.me/+91${request.user_phone}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                                </a>
                  </div>

                  
                  <img
                    src={request.image_url}
                    alt="Animal"
                    className="w-full h-50 object-cover rounded-md"
                  />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="text-3xl mt-6">No Active Requests...</div>
          </div>
        )}

   
      {requests.length > 0 ? (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-8">
          <h2 className="text-2xl font-bold mb-4">Pending Animal Rescue Requests</h2>
          <ul className="space-y-4">
            {requests.map((request) => (
              <li key={request.request_id} className="p-4 border border-gray-300 rounded">
                <p><strong>Animal Type:</strong> {request.animal_type}</p>
                <p><strong>Injury Description:</strong> {request.injury_description}</p>
                <p><strong>Address:</strong> {request.address}</p>
                <img
                  src={request.image_url}
                  alt="Animal"
                  className="w-full h-50 object-cover rounded-md"
                />
                <Button label='Accept Request' onClick={()=>handleAccept(request.request_id)}/>
              </li>
            ))}
          </ul>
          
        </div>
      ) : <div className='flex justify-center'>
      <div className='text-3xl mt-6'>
  No New Requests...
    </div>
      </div>}
      
    </div>
    </div>
  );
}
