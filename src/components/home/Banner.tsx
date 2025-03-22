import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Banner: React.FC = () => {
  return (
    <div className="w-full h-[500px] relative mb-8">
      {/* Background Image */}
      <Image
        src="https://img.freepik.com/free-vector/memphis-style-black-friday-wide-yellow-banner-design_1017-34720.jpg?t=st=1742504870~exp=1742508470~hmac=d9fe042d2e073ce4a35023c0ce89f7f5aa3278398d613d58b0800ed921fe1b66&w=1800"
        alt="Banner Background"
        fill
        style={{ objectFit: "cover" }}
        priority={true}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 flex items-center justify-center text-white"
        style={{ backgroundColor: "rgba(39, 39, 39, 0.3)" }}
      >
        <div className="text-center space-y-4 px-4 sm:px-6 lg:px-16">
          <h1 className="text-4xl sm:text-5xl font-bold">Revive Mart</h1>
          <p className="text-lg sm:text-xl pb-2">Buy & Sell Quality Used Items Effortlessly</p>
          <Link
            href="/products"
            className="bg-[#F0F7F4] py-3 px-6 text-black rounded font-semibold transition hover:bg-[#e0e8e4]"
          >
            Explore Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
