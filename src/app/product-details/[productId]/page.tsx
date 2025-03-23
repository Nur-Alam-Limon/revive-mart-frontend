"use client";
import React, { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { fetchListings } from "@/redux/features/listing/listingSlice";
import { RootState } from "@/redux/store";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface ProductDetailsProps {
  params: Promise<{ productId: string }>;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ params }) => {
  const { productId } = use(params);
  const dispatch = useDispatch();

  const { listings, loading, error } = useSelector(
    (state: RootState) => state.listings
  );

  useEffect(() => {
    if (listings.length === 0) {
      dispatch(fetchListings() as any);
    }
  }, [dispatch, listings.length]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-yellow-500">
          Loading product...
        </h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-red-500">
          Failed to load product details. Please try again later.
        </h1>
      </div>
    );
  }

  const product = listings.find((p) => p._id === productId);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-red-500">
          Product not found!
        </h1>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("Product Added to Cart", { duration: 3000 });
  };

  return (
    <section className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Product Image */}
          <div className="flex justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="rounded-lg shadow-lg w-full max-w-md object-cover"
            />
          </div>

          {/* Product Information */}
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {product.title}
            </h1>
            <p className="text-yellow-500 text-2xl font-semibold mb-4">
              ${product.price}
            </p>

            <div className="mb-6">
              <p className="text-lg text-gray-700 leading-relaxed mb-3">
                {product.description}
              </p>
              <p className="text-lg text-gray-600 mb-2">
                <span className="font-semibold">Condition:</span>{" "}
                {product.condition}
              </p>
              <p className="text-lg text-gray-600 mb-2">
                <span className="font-semibold">Status:</span> {product.status}
              </p>
            </div>

            {/* Call to Action */}
            <div className="flex gap-4">
              {product.status == "available" ? (
                <Button
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingCart size={18} /> Add to Cart
                </Button>
              ) : (
                <Button
                  disabled
                  className="md:w-auto flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingCart size={18} /> Already Sold
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
