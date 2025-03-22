"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchListings, setSearchQuery } from "@/redux/features/listing/listingSlice";
import { useRouter } from "next/navigation";
import ProductCard from "@/components/home/ProductCard";
import Loading from "../loading";


const ProductsPage = () => {
  const [selectedPrice, setSelectedPrice] = useState("");

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { listings: products, loading } = useSelector((state: RootState) => state.listings);

  const searchQuery = useSelector(
    (state: RootState) => state.listings.searchQuery
  );

  useEffect(() => {
    dispatch(fetchListings());
  }, [dispatch]);

  const filteredProducts = products.filter((product) => {
    const isPriceMatch = selectedPrice ? product.price <= parseFloat(selectedPrice) : true;
    const isSearchMatch = searchQuery ? product.title.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    return isPriceMatch && isSearchMatch;
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const handleAddProduct = () => {
    router.push("/dashboard");
  };

  const handleEditProduct = (id: string) => {
    router.push(`/products/${id}/edit`);
  };

  if (loading) {
    return <Loading/>;
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Filters Section */}
      <aside className="w-full lg:flex-none lg:w-3/12 p-4 lg:p-10 bg-white shadow-md mb-8 lg:mb-0">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>

        {/* Search Bar */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Search</label>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-yellow-500"
            placeholder="Search for products..."
          />
        </div>

        {/* Price Range Filter */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Price Range</label>
          <select
            value={selectedPrice}
            onChange={(e) => setSelectedPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-yellow-500"
          >
            <option value="">All Prices</option>
            <option value="50">Up to $50</option>
            <option value="100">Up to $100</option>
            <option value="200">Up to $200</option>
          </select>
        </div>
      </aside>

      {/* Products Section */}
      <main className="flex-grow p-4 lg:p-10 pb-20">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Products</h1>
          <Button onClick={handleAddProduct}>Sell A Product</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {filteredProducts.map((listing) => (
            <ProductCard
              key={listing._id}
              title={listing.title}
              price={`$${listing.price}`}
              image={listing.image}
              condition={listing.condition}
              description={listing.description}
              listing={listing}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductsPage;
