"use client"
import { useRouter } from 'next/navigation';
import React from 'react';

const Categories: React.FC = () => {
  const categories = ['Electronics', 'Furniture', 'Fashion', 'Books', 'Home Appliances','Baby Item', 'Gadgets', 'Kitchen Items'];
  const router = useRouter()
  return (
    <div className="my-12 px-16 text-center">
      <h2 className="text-3xl font-bold mb-6 text-center">Browse by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {categories.map((category) => (
          <div
            onClick={()=>router.push('/products')}
            key={category}
            className="bg-white p-3 rounded-lg shadow hover:bg-yellow-400 cursor-pointer transition"
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
