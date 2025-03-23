"use client";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { RootState } from "@/redux/store";
import { removeFromWishlist } from "@/redux/features/wishlist/wishlistSlice";

const WishlistPage = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const handleRemoveItem = (itemId: string) => {
    dispatch(removeFromWishlist(itemId));
    toast.success("Removed From Wishlist", { duration: 3000 });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 md:py-10 px-4 sm:px-8 lg:px-16">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-semibold text-center text-gray-800 my-8 md:mb-10">
          Your Wishlist
        </h2>

        {wishlistItems.length === 0 ? (
          <p className="text-center text-lg text-gray-600">
            Your wishlist is empty
          </p>
        ) : (
          <div className="space-y-6 mx-auto max-w-4xl">
            {wishlistItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out py-8"
              >
                <div className="flex flex-col items-center space-y-4 md:space-y-0 md:flex-row md:space-x-12">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-40 h-40 object-cover rounded-md shadow-md"
                  />
                  <div className="text-left md:text-left">
                    <h3 className="text-2xl font-semibold text-gray-800 py-2">
                      {item.title}
                    </h3>
                    <p className="text-lg text-gray-500 py-1">
                      Description: {item.description || "N/A"}
                    </p>
                    <p className="text-lg text-gray-500 py-1">
                      Condition: {item.condition}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center w-full md:w-auto mt-4 md:mt-0">
                  <div className="flex flex-row justify-between items-center w-full">
                    <span className="text-gray-700 text-2xl font-semibold">
                      ${item.price}
                    </span>
                    <button
                      className="text-red-600 hover:text-red-800 ml-6"
                      onClick={() => handleRemoveItem(item._id as string)}
                    >
                      <FaTrashAlt className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
