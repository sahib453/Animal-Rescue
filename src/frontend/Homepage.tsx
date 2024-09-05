import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';

function Homepage() {
    const navigate = useNavigate();
    const [ngos, setNgos] = useState<any[]>([]);
console.log(api)
    useEffect(() => {
        const fetchNgos = async () => {
            try {
                const response = await api.get('api/ngos');
                setNgos(response.data);
            } catch (error) {
                console.error('Error fetching NGOs:', error);
            }
        };

        fetchNgos();
    }, []);

    function handleUserLogin() {
        navigate('/user-login');
    }

    function handleVetLogin() {
        navigate('/ngo-login');
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            <h1 className="text-4xl font-bold text-gray-800 mt-8 mb-4 text-center">Animal Rescue Dashboard</h1>
            <p className="text-lg text-gray-600 mb-8">Choose your role to login and start helping animals in need.</p>
            <div className="flex space-x-8 mb-12">
                <button
                    onClick={handleUserLogin}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-8 rounded-lg shadow-md"
                >
                    Login as User
                </button>
                <button
                    onClick={handleVetLogin}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-lg shadow-md"
                >
                    Login as NGO
                </button>
            </div>
            <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-gray-700 mb-6">List of NGOs</h2>
                {ngos.length > 0 ? (
                    <ul className="space-y-4">
                        {ngos.map((ngo) => (
                            <li key={ngo.org_name} className="p-4 bg-gray-50 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold text-gray-800">{ngo.org_name}</h3>
                                <p className="text-gray-600">Address: {ngo.fixed_address}</p>
                                <p className="text-gray-600">Working Hours: {ngo.working_hours}</p>
                                <p className="text-gray-600">UPI ID: {ngo.upi_id}</p>
                                <div className="flex justify-between">
                                <p className="text-gray-600">Phone: {ngo.phone}</p>
                                <a href={`https://wa.me/+91${ngo.phone}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                                </a>
                                </div>
                                <div className="flex justify-between">
                                <p className="text-gray-600">Email: {ngo.email}</p>
                                <a href={`mailto:${ngo.email}`}><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M24 21h-24v-18h24v18zm-23-16.477v15.477h22v-15.477l-10.999 10-11.001-10zm21.089-.523h-20.176l10.088 9.171 10.088-9.171z"/>
                                </svg>
                                </a>
                            
                                </div>

                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600">No NGOs available at the moment.</p>
                )}
            </div>
        </div>
    );
}

export default Homepage;
