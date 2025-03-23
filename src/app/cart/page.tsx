"use client";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { FaTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { AppDispatch, RootState } from "@/redux/store";
import { removeFromCart } from "@/redux/features/cart/cartSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

const CartPage = () => {
  
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * (item.cartQuantity ?? 1), // Default to 1 if cartQuantity is undefined
    0
  );


  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);
  const { data: session, status } = useSession();
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
      if (status === "loading") return;
      if (!user && !session) {
        router.push("/login");
      }
    }, [user, dispatch, router, session, status]);

  const handleRemoveItem = (itemId: string) => {
    // Dispatch the action to remove the item from the cart (assuming you have this action)
    dispatch(removeFromCart(itemId));
    toast.success("Removed From Cart", {
      duration: 3000,
    });
  };

  const handleCheckout = async () => {
    try {
      // Extract item IDs from cart items
      const itemIDs = cartItems.map((item) => item._id);
      let tranId= `TRX-${Date.now()}`;
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/initiate-payment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          total_amount: cartTotal,
          currency: "BDT",
          tran_id: `${tranId}`,
          success_url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/ssl/success/${tranId}`,
          fail_url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/ssl/fail`,
          cancel_url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders/ssl/cancel`,
          customer: {
            name: user?.name,
            email: user?.email,
            phone: user?.phone || "123",
            address: user?.address || "Dhaka",
            buyerID: (user as any)._id || ""
          },
          itemIDs, // Sending the array of item IDs to the backend
        }),
      });
  
      const data = await response.json();
  
      if (data.success && data.GatewayPageURL) {
        window.location.href = data.GatewayPageURL;
        toast.success("Payment initiated successfully! Redirecting...", {
          duration: 3000,
        });
      } else {
        toast.error("Failed to initiate payment. Please try again.");
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      toast.error("An error occurred while initiating payment.");
    }
  };
  
  

  return (
    <div className="bg-gray-50 min-h-screen py-8 md:py-10 px-4 sm:px-8 lg:px-16">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-semibold text-center text-gray-800 my-8 md:mb-10">
          Your Cart
        </h2>

        {cartItems.length === 0 ? (
          <p className="text-center text-lg text-gray-600">
            Your cart is empty
          </p>
        ) : (
          <div className="space-y-6 mx-auto max-w-4xl">
            {cartItems.map((item) => (
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
                    <p className="text-lg text-gray-500 py-1 pr-6">
                      Description: {item.description || "N/A"}
                    </p>
                    <p className="text-lg text-gray-500 py-1">
                      Quantity: {item.cartQuantity || 1}
                    </p>
                    
                  </div>
                </div>

                {/* Price and Button in One Row on Mobile */}
                <div className="flex flex-col md:flex-row justify-between items-center w-full md:w-auto mt-4 md:mt-0">
                  <div className="flex flex-row justify-between items-center w-full">
                    <span className="text-gray-700 text-2xl font-semibold">
                      ${item.price * (item.cartQuantity ?? 1)}{" "}
                      {/* Display cartQuantity */}
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

        <div className="mt-8 md:mt-12 bg-white p-6 rounded-lg shadow-lg py-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Cart Summary
          </h3>

          <div className="flex justify-between mb-4">
            <span className="text-lg text-gray-700">Subtotal</span>
            <span className="text-lg text-gray-700 font-semibold">
              $ {cartTotal.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between mb-4">
            <span className="text-lg text-gray-700">Shipping</span>
            <span className="text-lg text-gray-700">Free</span>
          </div>

          <div className="flex justify-between mb-6">
            <span className="text-xl font-semibold text-gray-800">Total</span>
            <span className="text-xl font-semibold text-gray-800">
              $ {cartTotal.toFixed(2)}
            </span>
          </div>

          <Button
            variant="outline"
            className="w-full py-6 text-lg bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 hover:text-white transition-colors duration-300 ease-in-out"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
