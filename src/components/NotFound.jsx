import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0d0221] text-white text-center">
      <h1 className="text-9xl font-bold">404</h1>
      <p className="text-2xl mt-4">Page Not Found</p>
      <p className="mt-2 text-[#a6cfd5]">The page you are looking for doesn't exist or has been moved.</p>
      
      <Link to="/" className="mt-6 px-6 py-2 bg-[#0f084b] text-white rounded-md hover:bg-[#26408b]">
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
