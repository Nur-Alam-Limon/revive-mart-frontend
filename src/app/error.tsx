 "use client"
 import { FaExclamationTriangle } from 'react-icons/fa';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="flex items-center gap-4 bg-white shadow-lg p-8 rounded-xl">
        <FaExclamationTriangle className="text-red-500 text-6xl" />
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Oops! Something went wrong.</h1>
          <p className="text-gray-600 mt-2">We couldn’t find the page you’re looking for.</p>
          <div className='space-x-6'>
          <Link href="/" className="mt-4 inline-block text-white bg-[#272727] hover:bg-[#272727] px-6 py-2 rounded-lg transition">
            Go Back Home
          </Link>
          <Button onClick={() => window.location.reload()}>Reload</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
