"use client"
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchUsers, updateProfile } from "@/redux/features/auth/authSlice";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const UserProfilePage = () => {
  const { data: session, status } = useSession();
  const dispatch: AppDispatch = useDispatch();
  const { user, users, token } = useSelector((state: RootState) => state.auth);
  const router = useRouter()

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    profilePic: null as File | string | null,
  });

  const [preview, setPreview] = useState<string | null>(null);


  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        profilePic: user.profilePic || null,
      });

      if (user.profilePic) {
        setPreview(typeof user.profilePic === "string" ? user.profilePic : null);
      }
    } else if(session?.user){
      setProfile({
        name: session.user.name || "",
        email: session.user.email || "",
        phone:  "",
        address:  "",
        profilePic: session.user.image || null,
      });
      setPreview(session.user.image as string);
    }

    if (user?.role === "admin") {
      dispatch(fetchUsers());
    }
  }, [user, dispatch, session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      setProfile((prev) => ({ ...prev, profilePic: file }));
    }
  };

  const handleUpdate = async () => {
    try {

    const token = session?.accessToken || undefined;

      const updatedProfile = {
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        address: profile.address,
        profilePic: preview || "",
        role: 'user',
        password: '123'
      };

      const response = await dispatch(updateProfile({userData:updatedProfile, token}));
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  if (!user && !session) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen py-12">
      <Card className="w-full max-w-2xl shadow-lg rounded-2xl border border-gray-200 mx-auto">
        <CardHeader className="bg-[#272727] text-white rounded-t-2xl">
          <CardTitle className="text-2xl text-center py-3">User Profile</CardTitle>
        </CardHeader>
        <CardContent className="p-6 bg-white rounded-b-2xl space-y-10">
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-yellow-300">
              <img src={preview || ""} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <label
              htmlFor="profilePicUpload"
              className="mt-4 text-md text-[#272727] font-semibold cursor-pointer"
            >
              Upload Profile Picture
            </label>
            <input
              id="profilePicUpload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          <div className="space-y-5">
            <div>
              <label>Full Name</label>
              <Input type="text" name="name" value={profile.name} onChange={handleChange} placeholder="Full Name" />
            </div>
            <div>
              <label>Email</label>
              <Input type="text" name="email" value={profile.email} readOnly />
            </div>
            <div>
              <label>Phone</label>
              <Input type="text" name="phone" value={profile.phone} onChange={handleChange} placeholder="Phone" />
            </div>
            <div>
              <label>Address</label>
              <Input type="text" name="address" value={profile.address} onChange={handleChange} placeholder="Address" />
            </div>
          </div>
          <div className="text-center">
            <Button onClick={handleUpdate} className="mt-6 w-full bg-[#272727] text-white py-3">
              Update Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfilePage;
