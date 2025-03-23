"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  FaUserCircle,
  FaShoppingCart,
  FaSearch,
  FaBars,
  FaHeart,
  FaTimes
} from "react-icons/fa";
import { logout } from "@/redux/features/auth/authSlice";
import { Button } from "../ui/button";
import { setSearchQuery } from "@/redux/features/listing/listingSlice";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const Navbar: React.FC = () => {
  const { user, token } = useSelector((state: RootState) => state.auth);
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

  const wishlistItemCount = useSelector(
    (state: RootState) => state.wishlist.items.length
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      router.push("/products");
    }
  };

  useEffect(() => {}, [cartItemCount, wishlistItemCount]);

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
    dispatch(logout());
  };

  return (
    <nav className="bg-[#272727] text-white py-6 px-8 lg:px-16 flex justify-between items-center shadow-md sticky top-0 z-50">
      {/* Logo */}
      <Link href="/">
        <div className="flex items-center justify-center">
          <img
            src="/revive-mart.png"
            alt="logo"
            className="rounded-sm h-12 w-auto mr-2"
          />
          <span className="text-2xl font-bold text-[#FFD447] mt-2">
            Revive Mart
          </span>
        </div>
      </Link>

      {/* Hamburger Icon for Mobile */}
      <div className="lg:hidden flex items-center">
        <button
          className="text-white text-3xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <FaTimes/> // Cross icon when the menu is open
          ) : (
            <FaBars className="text-2xl" /> // Hamburger icon when the menu is closed
          )}
        </button>
      </div>

      {/* Search Bar - Hidden on Mobile */}
      <div className="pl-28 hidden lg:block flex-grow items-center justify-center mx-20">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyPress={handleSearchKeyPress}
            placeholder="Search..."
            className="bg-[#272727] text-white py-2 px-8 rounded-full pl-12 w-96 focus:outline-none focus:ring-2 focus:ring-blue-500 border"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Mobile Menu - Displayed when isMobileMenuOpen is true */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-0 left-0 right-0 bg-[#272727] py-16 px-8 z-40">
          <div className="absolute right-10 top-10 text-2xl" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <FaTimes/>
          </div>
          <div className="space-y-8">
            <Link href="/products" className="block hover:text-[#FFD447] transition">
              Products
            </Link>

            {token || session?.user ? (
              <>
                <Link
                  href="/dashboard"
                  className="block hover:text-[#FFD447] transition flex items-center"
                >
                  <FaUserCircle className="mr-1" /> Dashboard
                </Link>
                <Button
                  className="py-2 px-4 bg-red-500 text-white rounded-md"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" className="block hover:text-[#FFD447] transition">
                  Login
                </Link>
                <Link href="/register" className="block hover:text-[#FFD447] transition">
                  Register
                </Link>
              </>
            )}

            {/* Wishlist Text */}
            <Link
              href="/wishlist"
              className="block hover:text-[#FFD447] transition"
            >
              Wishlist
            </Link>

            {/* Cart Text */}
            <Link
              href="/cart"
              className="block hover:text-[#FFD447] transition"
            >
              Cart
            </Link>
          </div>
        </div>
      )}

      {/* Navigation Links - Visible on larger screens */}
      <div className="space-x-6 flex items-center hidden lg:flex">
        <Link href="/products" className="hover:text-[#FFD447] transition">
          Products
        </Link>

        {token || session?.user ? (
          <>
            <Link
              href="/dashboard"
              className="hover:text-[#FFD447] transition flex items-center"
            >
              <FaUserCircle className="mr-1" /> Dashboard
            </Link>
            <Button
              className="py-2 px-4 bg-red-500 text-white rounded-md"
              onClick={handleLogout}
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

        <div className="flex items-center mr-2">
          {/* Wishlist Icon - Hidden on Mobile */}
          <Button
            variant="ghost"
            size="default"
            className="relative text-gray-200 flex items-center hidden lg:block"
            onClick={() => router.push("/wishlist")}
          >
            <FaHeart className="cursor-pointer text-xl" />
            {wishlistItemCount > 0 && (
              <span className="absolute top-0 right-0 text-xs text-white bg-red-500 rounded-full w-4 h-4 flex items-center justify-center">
                {wishlistItemCount}
              </span>
            )}
          </Button>

          {/* Shopping Cart Icon - Hidden on Mobile */}
          <Button
            variant="ghost"
            size="default"
            className="relative text-gray-200 flex items-center hidden lg:block"
            onClick={() => router.push("/cart")}
          >
            <FaShoppingCart className="cursor-pointer text-xl" />
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 text-xs text-white bg-yellow-500 rounded-full w-4 h-4 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
