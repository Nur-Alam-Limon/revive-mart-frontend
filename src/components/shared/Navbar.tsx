"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { FaUserCircle, FaShoppingCart, FaSearch, FaBars } from "react-icons/fa";
import { logout } from "@/redux/features/auth/authSlice";
import { Button } from "../ui/button";
import { setSearchQuery } from "@/redux/features/listing/listingSlice";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react"; 

const Navbar: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth); 
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { data: session, status } = useSession(); 
  const searchQuery = useSelector(
    (state: RootState) => state.listings.searchQuery
  );

  const cartItemCount = useSelector((state: RootState) =>
    state.cart.items.reduce(
      (total, item) => total + (item.cartQuantity ?? 1), // Default to 1 if cartQuantity is undefined
      0
    )
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value)); 
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      // Trigger navigation to the All Products page
      router.push("/products");
    }
  };

  useEffect(() => {
  }, [cartItemCount]);

  const handleLogout = () => {
    signOut({ callbackUrl: "/" }); // Log out using NextAuth
    dispatch(logout()); // Redux logout to clear any other user data
  };

  return (
    <nav className="bg-[#272727] text-white py-6 px-16 flex justify-between items-center shadow-md sticky top-0 z-50">
      {/* Logo */}
      <Link
        href="/"
        className="text-3xl font-bold text-[#FFD447] hover:text-[#FFD447] transition"
      >
        Revive Mart
      </Link>

      {/* Hamburger Icon for Mobile */}
      <div className="lg:hidden flex items-center">
        <button
          className="text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} // toggle mobile menu
        >
          <FaBars />
        </button>
      </div>

      {/* Search Bar (only on large screens) */}
      <div className="pl-28 hidden lg:block flex-grow items-center justify-center mx-20">
        <div className="relative">
          <input
            type="text"
            value={searchQuery} // Controlled input
            onChange={handleSearchChange} // Handle search input change
            onKeyPress={handleSearchKeyPress} // Handle Enter key press for search
            placeholder="Search..."
            className="bg-[#272727] text-white py-2 px-8 rounded-full pl-12 w-96 focus:outline-none focus:ring-2 focus:ring-blue-500 border"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Navigation Links */}
      <div className="space-x-6 flex items-center">
        <Link href="/products" className="hover:text-[#FFD447] transition">
          Products
        </Link>

        {(user || session?.user) ? (
          <>
            <Link
              href="/dashboard"
              className="hover:text-[#FFD447] transition flex items-center"
            >
              <FaUserCircle className="mr-1" /> Dashboard
            </Link>
            {/* Logout button for logged-in users */}
            <Button
              className="py-2 px-4 bg-red-500 text-white rounded-md"
              onClick={handleLogout} // Use handleLogout for Google, GitHub logout
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:text-[#FFD447] transition">
              Login
            </Link>
            <Link href="/register" className="hover:text-[#FFD447] transition">
              Register
            </Link>
          </>
        )}

        {/* Shopping Cart */}
        <Button
          variant="ghost"
          size="default"
          className="relative text-gray-200 hover:text-gray-900 flex items-center"
          onClick={() => router.push("/cart")} // Go to the cart page when clicked
        >
          <FaShoppingCart className="hover:text-[#FFD447] cursor-pointer transition text-xl" />
          {/* Show item count */}
          {cartItemCount > 0 && (
            <span className="absolute top-0 right-0 text-xs text-white bg-yellow-500 rounded-full w-4 h-4 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-[#272727] text-white py-4 px-8 flex flex-col space-y-4">
          <Link href="/products" className="hover:text-[#FFD447] transition">
            Products
          </Link>

          {(user || session?.user) ? (
            <>
              <Link
                href="/dashboard"
                className="hover:text-[#FFD447] transition flex items-center"
              >
                <FaUserCircle className="mr-1" /> Dashboard
              </Link>
              <Button
                className="py-2 px-4 bg-red-500 text-white rounded-md"
                onClick={handleLogout} // Handle logout for mobile menu
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-[#FFD447] transition">
                Login
              </Link>
              <Link href="/register" className="hover:text-[#FFD447] transition">
                Register
              </Link>
            </>
          )}

          <Button
            variant="ghost"
            size="default"
            className="relative text-gray-200 hover:text-gray-900 flex items-center"
            onClick={() => router.push("/cart")}
          >
            <FaShoppingCart className="hover:text-[#FFD447] cursor-pointer transition text-xl" />
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 text-xs text-white bg-yellow-500 rounded-full w-4 h-4 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
