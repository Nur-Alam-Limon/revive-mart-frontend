"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./ProductCard";
import { fetchListings } from "@/redux/features/listing/listingSlice";
import { AppDispatch, RootState } from "@/redux/store";

const FeaturedProducts: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { listings, loading, error } = useSelector(
    (state: RootState) => state.listings
  );

  useEffect(() => {
    dispatch(fetchListings());
  }, [dispatch]);

  if (loading)
    return (
      <div className="my-12 px-16">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Featured Listings
        </h2>
        <div className="text-center py-4 text-xl">
          <div>Loading...</div>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="my-12 px-16">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Featured Listings
        </h2>
        <div className="text-center py-4 text-xl">
          <div>Error: {error}</div>
        </div>
      </div>
    );
  if (!Array.isArray(listings))
    return (
      <div className="my-12 px-16">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Featured Listings
        </h2>
        <div className="text-center py-4 text-xl">
          <div>No products found.</div>
        </div>
      </div>
    ); // Check if listings is an array

  return (
    <div className="my-12 px-16">
      <h2 className="text-3xl font-bold mb-6 text-center">Featured Listings</h2>
      {listings.length>0 ?
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {listings.slice(0,8).map((listing) => (
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
      </div> : <div className="text-center my-16 text-lg text-gray-600">No Product Found.</div>
      }
    </div>
  );
};

export default FeaturedProducts;
