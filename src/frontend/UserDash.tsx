import { useState, useEffect } from 'react';
import api from './api';
import Appbar from './components/Appbar';
import Button from './components/Button';

function UserDash() {
  const [file, setFile] = useState<File | null>(null);
  const [userPhone, setUserPhone] = useState<string>('');
  const [injuryDescription, setInjuryDescription] = useState<string>('');
  const [animalType, setAnimalType] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [requests, setRequests] = useState<any[]>([]);

  const fetchUserData = async () => {
    try {
      setMessage('');
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('No token found. Please log in.');
        return;
      }

      const [userResponse, requestsResponse] = await Promise.all([
        api.get('api/user/me', {
          headers: {
            Authorization: `${token}`,
          },
        }),
        api.get('api/user/getReq', {
          headers: {
            Authorization: `${token}`,
          },
        }),
      ]);

      setUserPhone(userResponse.data.phone);
      setAddress(userResponse.data.address || '');
      setRequests(requestsResponse.data);
    } catch (error) {
      console.error(error);
      setMessage('Error fetching user data.');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file || !injuryDescription || !animalType) {
      setMessage('Please fill in all the required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('user_phone', userPhone);
    formData.append('injury_description', injuryDescription);
    formData.append('animal_type', animalType);
    if (address) {
      formData.append('address', address);
    }

    try {
      const token = localStorage.getItem('token');

      const response = await api.post('api/animal-request', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `${token}`,
        },
      });

      setMessage(`Request created: ${response.data.message}`);
      setTimeout(() => {
        fetchUserData();
      }, 2000);
    } catch (error) {
      console.error(error);
      setMessage('Error creating request.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      await api.delete(`/api/user/delReq?id=${id}`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      setMessage('Request deleted successfully.');

      setTimeout(() => {
        fetchUserData();
      }, 2000);
    } catch (error) {
      console.error(error);
      setMessage('Error deleting request.');
    }
  };

  return (
    <div>
      <Appbar />

      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold text-center mb-6">Create Animal Rescue Request</h1>
          <textarea
            placeholder="Injury Description"
            value={injuryDescription}
            onChange={(e) => setInjuryDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Animal Type"
            value={animalType}
            onChange={(e) => setAnimalType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Address (optional)"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input type="file" onChange={handleFileChange} className="mb-4 w-full" />
          <button
            onClick={handleUpload}
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
          >
            Submit Request
          </button>
          {message && <p id="msg" className="mt-4 text-red-500 text-center">{message}</p>}
        </div>

        {requests.length > 0 && (
          <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-8">
            <h2 className="text-2xl font-bold mb-4">Your Previous Requests</h2>
            <ul className="space-y-4">
              {requests.map((request) => (
                <li key={request.request_id} className="p-4 border border-gray-300 rounded">
                  <p><strong>Animal Type:</strong> {request.animal_type}</p>
                  <p><strong>Injury Description:</strong> {request.injury_description}</p>
                  <p><strong>Address:</strong> {request.address}</p>
                  <img
                    src={request.image_url}
                    alt="Animal"
                    className="w-full h-50 object-cover rounded-md mb-4"
                  />
                  <Button label="Delete" onClick={() => handleDelete(request.request_id)} />
                  <div
                    className={`mt-2 p-2 rounded text-white ${
                      request.request_status === false
                        ? 'bg-yellow-500'
                        : request.request_status === true
                        ? 'bg-green-500'
                        : 'bg-gray-500'
                    }`}
                  >
                    Request Status : {request.request_status ? `Accepted, You will be contacted shortly 
                    by ${request.org_name}` : 'Pending'}
                  </div>
                  
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDash;
