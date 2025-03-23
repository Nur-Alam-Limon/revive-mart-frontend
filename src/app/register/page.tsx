"use client";

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { AppDispatch } from '@/redux/store';
import Image from 'next/image';
import { register } from '@/redux/features/auth/authSlice';
import toast from 'react-hot-toast';

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading, error } = useSelector((state: any) => state.auth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async (e: any) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      // Dispatch the register action with the payload including name, email, and password
      await dispatch(register({ name, email, password }));
      router.push('/login');
      toast.success("User Registered Successfully", {
        duration: 3000,
      });
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-white py-20">
      {/* Image Section */}
      <div className="hidden md:block w-1/2 p-6">
        <Image
          src="https://img.freepik.com/free-vector/login-concept-illustration_114360-4525.jpg?t=st=1742249701~exp=1742253301~hmac=73086946b36398a716b6d88015fb49bf79624d57269d8ddc2a772ee3c1c5cdf6&w=1380"
          alt="Register"
          width={500}
          height={500}
          priority={true}
          className="object-contain mx-auto"
        />
      </div>

      {/* Form Section */}
      <div className="w-full max-w-md p-6 border border-gray-300 rounded-md shadow-lg bg-white mx-4 md:mx-0">
        <h2 className="text-2xl text-center font-bold mb-6">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <button
            type="submit"
            className="w-full py-2 bg-[#272727] text-white rounded-md hover:bg-[#1d1d1d] transition"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
