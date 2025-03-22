"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { deleteUser, fetchUsers } from "@/redux/features/auth/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const ManageUsers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDeleteUser = async (userId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (confirmDelete) {
      try {
        await dispatch(deleteUser(userId));
        toast.success("User deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete user.");
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>
      <Table className="w-full mt-6">
        <TableHeader className="bg-[#272727] font-bold">
          <TableRow>
            <TableHead className="py-4 text-white">Name</TableHead>
            <TableHead className="py-4 text-white">Email</TableHead>
            <TableHead className="py-4 text-white">Role</TableHead>
            <TableHead className="py-4 text-white">Phone</TableHead>
            <TableHead className="py-4 text-white">Address</TableHead>
            <TableHead className="py-4 text-white">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="py-4">{user.name}</TableCell>
              <TableCell className="py-4">{user.email}</TableCell>
              <TableCell className="py-4">{user.role}</TableCell>
              <TableCell className="py-4">{user.phone}</TableCell>
              <TableCell className="py-4">{user.address}</TableCell>
              
              <TableCell>
                <Button
                variant="default"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  Ban User
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageUsers;
