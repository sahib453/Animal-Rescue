import { useNavigate } from 'react-router-dom';

const ErrorPage = ({ errorMessage = "An unexpected error occurred." }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleGoHome = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-5xl font-bold text-red-600 mb-4">Error</h1>
      <p className="text-xl text-gray-700 mb-8">{errorMessage}</p>
      <div className="flex space-x-4">
        <button
          onClick={handleGoBack}
          className="px-6 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition"
        >
          Go Back
        </button>
        <button
          onClick={handleGoHome}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
