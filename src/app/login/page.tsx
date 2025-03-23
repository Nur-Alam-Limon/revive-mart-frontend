"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/redux/store";
import Image from "next/image";
import { login} from "@/redux/features/auth/authSlice";
import { signIn } from "next-auth/react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // Fetching the loading and error state from the auth slice
  const { loading, error, isAuthenticated } = useSelector(
    (state: any) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Dispatch loginUser action with email and password
    const result = await dispatch(login({ email, password }));
    console.log('result', result)
    router.push("/dashboard");
    if(result?.payload?.success) toast.success("User Logged In Successfully", {
      duration: 3000,
    });
    else {
      toast.error(result.payload, {
        duration: 3000,
      });
    }
  };

  // Handle Google login
  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/dashboard` });
  };

  // Handle GitHub login
  const handleGitHubLogin = () => {
    signIn("github", { callbackUrl: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/dashboard` });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white py-20">
      {/* Image Section */}
      <div className="hidden md:block w-1/2 p-6">
        <Image
          src="https://img.freepik.com/free-vector/login-concept-illustration_114360-4525.jpg?t=st=1742249701~exp=1742253301~hmac=73086946b36398a716b6d88015fb49bf79624d57269d8ddc2a772ee3c1c5cdf6&w=1380"
          alt="Login"
          width={500}
          height={500}
          priority={true}
          className="object-contain mx-auto"
        />
      </div>

      {/* Form Section */}
      <div className="w-full max-w-md p-6 border border-gray-300 rounded-md shadow-lg bg-white mx-4 md:mx-0">
        <h2 className="text-2xl text-center font-bold mb-6">Login</h2>
        <form onSubmit={handleLogin}>
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
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="mt-4 text-center space-y-2">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center w-full py-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition"
          >
            <FaGoogle className="mr-2" /> Login with Google
          </button>
          <button
            onClick={handleGitHubLogin}
            className="flex items-center justify-center w-full py-2 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition"
          >
            <FaGithub className="mr-2" /> Login with GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
