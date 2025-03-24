"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  deleteListing,
  updateListing,
  fetchListingsUser,
  fetchListings,
} from "@/redux/features/listing/listingSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ManageListings = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: session, status } = useSession();

  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<any>({
    title: "",
    description: "",
    price: 0,
    quantity: 0,
    condition: "Used",
    image: "",
    userId: "",
    status: "available",
    inStock: false,
  });
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!user && !session) {
      router.push("/login");
    }
  }, [user, dispatch, router, session, status]);

  // Fetch listings when the component mounts or email changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const email = user?.email || session?.user?.email;
      if (email) {
        try {
          const response = user?.role=='admin' ? await dispatch(fetchListings()) :  await dispatch(fetchListingsUser(email));
          console.log("response", response);
          // After fetching, set the listings data
          setListings(
            (response.payload as { listings: any[] })?.listings || []
          );

          setLoading(false);
        } catch (error) {
          console.error("Failed to fetch listings:", error);
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [dispatch, session?.user?.email]);

  const openModal = (listing: any) => {
    if (listing) {
      setFormData(listing);
      setEditingProduct(listing);
    } else {
      setFormData({
        title: "",
        description: "",
        price: 0,
        quantity: 0,
        condition: "Used",
        image: "",
        userId: "",
        status: "available",
        inStock: false,
      });
      setEditingProduct(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" ? Number(value) : value,
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleDeleteListing = async (listingId: string) => {
    // Dispatch delete action
    const result = await dispatch(
      deleteListing({
        id: listingId,
        token: session?.accessToken,
      })
    );

    toast.success("Listing Deleted Successfully", {
      duration: 3000,
    });

    // Remove the deleted listing from the state
    setListings((prevListings) =>
      prevListings.filter((listing) => listing._id !== listingId)
    );
  };

  const handleSave = () => {
    if (editingProduct) {
      const token = session?.accessToken; // Ensure the accessToken is in your session callback
      dispatch(
        updateListing({
          id: editingProduct._id,
          updateData: { ...formData },
          token: token as string,
        })
      ).then(async () => {
        const email = user?.email || session?.user?.email;
        await dispatch(fetchListingsUser(email)); // Fetch updated listings after update
        setListings((prevListings) =>
          prevListings.map((listing) =>
            listing._id === editingProduct._id
              ? { ...listing, ...formData }
              : listing
          )
        );
        toast.success("Listing Updated Successfully", {
          duration: 3000,
        });
      });
    }
    closeModal();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold mt-4">Manage Listing</h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Your All Listings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="w-full mt-2">
            <TableHeader className="bg-[#272727] font-bold">
              <TableRow>
                <TableHead className="py-4 text-white">Title</TableHead>
                <TableHead className="py-4 text-white">Description</TableHead>
                <TableHead className="py-4 text-white">Price</TableHead>
                <TableHead className="py-4 text-white">Quantity</TableHead>
                <TableHead className="py-4 text-white">Status</TableHead>
                <TableHead className="py-4 text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : !listings.length ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-16 text-gray-700 font-bold"
                  >
                    No Listings found.
                  </TableCell>
                </TableRow>
              ) : (
                listings.map((listing: any) => (
                  <TableRow key={listing._id}>
                    <TableCell className="py-4">{listing.title}</TableCell>
                    <TableCell className="py-4">
                      {listing.description.length > 50
                        ? listing.description.substring(0, 50) + "..." // Truncate after 50 characters
                        : listing.description}
                    </TableCell>
                    <TableCell className="py-4">{listing.price}</TableCell>
                    <TableCell className="py-4">{listing.quantity}</TableCell>
                    <TableCell className="py-4">{listing.status}</TableCell>
                    <TableCell>
                      <Button onClick={() => openModal(listing)}>Edit</Button>
                      <Button
                        onClick={() => handleDeleteListing(listing._id)}
                        className="ml-2"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isModalOpen} onOpenChange={closeModal}>
        <DialogContent className="bg-white p-6 sm:p-8 rounded-lg shadow-lg my-6 sm:my-12 max-h-[80vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Edit Product" : "Create Product"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 my-4">
            <div>
              <label className="block mb-2">Title</label>
              <Input
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label className="block mb-2">Description</label>
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                rows={4}
                required
              />
            </div>

            <div>
              <label className="block mb-2">Price</label>
              <Input
                name="price"
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label className="block mb-2">Condition</label>
              <Input
                name="condition"
                value="Used"
                readOnly
                className="bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block mb-2">Image URL</label>
              <Input
                name="image"
                placeholder="Image URL"
                value={formData.image}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label className="block mb-2">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="available">Available</option>
                <option value="sold">Sold</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={closeModal} variant="destructive" className="mr-2">
              Cancel
            </Button>
            <Button onClick={handleSave} variant="default">
              {editingProduct ? "Update" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageListings;
