"use client"
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cart/cartSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  title: string;
  price: string;
  image: string;
  description: string;
  condition: string;
  listing: any
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  price,
  image,
  description,
  condition,
  listing
}) => {
  const dispatch = useDispatch();
  const router = useRouter()
  const handleAddToCart = () => {
    
    dispatch(addToCart(listing)); // Dispatch addToCart action
    toast.success("Product Added to Cart", {
      duration: 3000,
    });
  };
  return (
    <Card onClick={()=>router.push(`/product-details/${listing._id}`)} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-4 cursor-pointer">
      <img
        src={image}
        alt={title}
        className="w-full h-60 object-cover rounded-xl"
      />
      <CardHeader>
        <CardTitle
          className="text-xl font-bold text-gray-800 line-clamp-2"
          style={{ minHeight: "48px" }} 
        >
          {title}
        </CardTitle>

        <CardDescription
          className="text-sm text-gray-500 line-clamp-3"
          style={{ minHeight: "60px" }} 
        >
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-yellow-500 font-semibold">Price: {price}</p>
        <p className="text-gray-600">Condition: {condition}</p>
        <Button onClick={handleAddToCart} className="mt-4 w-full flex items-center justify-center gap-2 cursor-pointer">
          <ShoppingCart size={18} /> Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
