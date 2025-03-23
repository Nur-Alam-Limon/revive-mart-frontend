"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/redux/store"; // Make sure to import RootState for type checking
import {
  createListing,
  fetchListingsUser,
} from "@/redux/features/listing/listingSlice";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const { user } = useSelector((state: RootState) => state.auth);
  const listings = useSelector((state: RootState) => state.listings.listings);
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    condition: "Used" as "Used",
    image: "",
    status: "available" as "available" | "sold",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "loading") return;
    if (!user && !session) {
      router.push("/login");
    } else {
      let email = user?.email ? user?.email : session?.user?.email;
      dispatch(fetchListingsUser(email));
    }
  }, [user, dispatch, router, session, status]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    // Check if the user is not available in Redux state and try to fallback to session user
    const currentUser = user || session?.user;
    const token = session?.accessToken || undefined;
  
    if (!currentUser) {
      // Handle the case where user is null, maybe show an error or redirect
      return;
    }
  
    try {
      const newListing = {
        ...formData,
        userId: currentUser.id,
        image: formData.image,
        email: currentUser.email
      };
  
      await dispatch(createListing({ listingData: newListing, token })).unwrap();

      toast.success("Listing Created Successfully", {
        duration: 3000,
      });
  
      setFormData({
        title: "",
        description: "",
        price: 0,
        condition: "Used",
        image: "",
        status: "available",
      });
  
    } catch (err: any) {
      console.log("error", err);
      toast.error("Error in creating listing", {
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 mx-8 lg:mx-20 text-center">
      <h2 className="text-2xl font-bold my-6">List a Product For Sell</h2>

      {/* Product Creation Form */}
      <form onSubmit={handleSubmit} className="space-y-6 mb-8">
        <div className="space-y-4 text-left">
          {/* Product Title */}
          <label className="block text-sm font-medium mb-1">
            Product Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter Product Title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />

          {/* Price */}
          <label className="block text-sm font-medium mb-1">
            Price (in BDT)
          </label>
          <input
            type="number"
            name="price"
            placeholder="Enter Price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />

          {/* Product Description */}
          <label className="block text-sm font-medium mb-1">
            Product Description
          </label>
          <textarea
            name="description"
            placeholder="Enter Product Description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            rows={4}
            required
          />

          {/* Condition */}
          <label className="block text-sm font-medium mb-1">Condition</label>
          <select
            name="condition"
            value={formData.condition}
            onChange={handleSelectChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="Used">Used</option>
            <option value="New">New</option>
          </select>

          {/* Product Image URL */}
          <label className="block text-sm font-medium mb-1">
            Product Image URL
          </label>
          <input
            type="text"
            name="image"
            placeholder="Enter Image URL"
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-[#272727] text-white rounded"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Listing"}
        </button>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default Dashboard;
