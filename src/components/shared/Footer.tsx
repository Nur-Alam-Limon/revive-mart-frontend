"use client";
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa"; 
import { Button } from "../ui/button";

const Footer: React.FC = () => {
  return (
    <footer className="px-4 sm:px-16 md:px-16 bg-[#272727] text-white py-6">
      <div className="container mx-auto space-y-6">
        {/* Logo and Social Media Section */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-700 py-6">
          <div className="text-2xl font-extrabold tracking-widest text-[#FFD447] mb-4 sm:mb-0">
          <div className="flex items-center">
          <img
          src="/revive-mart.png"
          alt="logo"
          className="rounded-sm h-12 w-auto mr-2"
        />
            <span className="mt-2">Revive Mart</span>
          </div>
          </div>
          <div className="flex space-x-6 justify-center sm:justify-end">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-400"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-400"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-400"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-400"
            >
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="flex flex-col sm:flex-row sm:justify-between pt-6">
          <div className="mb-6 sm:mb-0">
            <h4 className="font-semibold text-lg text-gray-300 mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="/products" className="hover:text-yellow-400">
                  Products
                </a>
              </li>
              <li>
                <a href="" className="hover:text-yellow-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="" className="hover:text-yellow-400">
                  Contact
                </a>
              </li>
              <li>
                <a href="/dashboard" className="hover:text-yellow-400">
                  Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h4 className="font-semibold text-lg text-gray-300 mb-3">
              Newsletter
            </h4>
            <p className="text-gray-400 mb-3">
              Sign up for the latest updates and offers.
            </p>
            <div className="flex flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Your email"
                className="p-3 rounded-l-md bg-white text-gray-800 focus:outline-none w-full sm:w-60 mb-4 sm:mb-0"
              />
              <Button
                variant="default"
                className="w-full sm:w-auto py-3 sm:py-6 rounded-r-md bg-yellow-400 hover:bg-[#FFC437] focus:outline-none -ml-6"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center text-gray-400 pt-10">
          &copy; {new Date().getFullYear()} Revive Mart. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
