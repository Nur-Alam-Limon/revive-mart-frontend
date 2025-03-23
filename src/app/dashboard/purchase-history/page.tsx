"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchPurchaseHistory } from "@/redux/features/order/orderSlice";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";
import Error from "@/app/error";

interface PurchaseHistoryProps {
  userId: string; // buyerId
}

const PurchaseHistory: React.FC<PurchaseHistoryProps> = ({ userId }) => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const { transactions, loading, error } = useSelector(
    (state: RootState) => state.transactions
  ); // Changed state.transactions to state.orders
  const user = useSelector((state: RootState) => state.auth.user);

  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!user && !session) {
      router.push("/login");
    }
  }, [user, dispatch, router, session, status]);

  useEffect(() => {
    const token = session?.accessToken || undefined;
    if(user || session){
    dispatch(
      fetchPurchaseHistory({ buyerId: (user as any)._id as string, token })
    );} // Fetch transactions for the given userId (buyerId)
  }, []);

  if (loading) return <Loading/>;
  if (error) return <Error/>;

  console.log("Transactions", transactions);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Purchase History</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Purchase History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table className="w-full border border-gray-300 rounded-lg overflow-hidden">
            <TableHeader className="bg-[#272727] font-bold">
              <TableRow>
                <TableHead className="py-4 text-white">Product</TableHead>
                <TableHead className="py-4 text-white">Price</TableHead>
                <TableHead className="py-4 text-white">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center py-8 text-gray-700 font-bold"
                  >
                    No transactions found.
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((transaction: any) => (
                  <TableRow
                    key={transaction?.listing?._id}
                    className="hover:bg-gray-50"
                  >
                    <TableCell className="py-4">
                      {transaction.listing.title}
                    </TableCell>
                    <TableCell className="py-4">
                      {transaction.listing.price}
                    </TableCell>
                    <TableCell className="py-4">
                      {transaction.listing.status}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PurchaseHistory;
