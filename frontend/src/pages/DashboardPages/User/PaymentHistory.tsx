import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AuthContext } from "@/contexts/AuthProvider";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

const PaymentHistory = () => {
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxios();

    const { data: payments= [], refetch } = useQuery({
      queryKey: [user?.email],
      queryFn: async () => {
        const data = await axiosSecure.get(`/payment-history/${user?.email}`);
        const result = await data.data;
        return result;
      },
    });
    
    return (
      <div className="w-full mx-auto px-10">
        <div className="text-center my-10">
          <h1 className="font-libre text-rose-300">--- My Appointments ---</h1>
        </div>
        <Table className=" border-rose-100 border-2">
          <TableHeader>
            <TableRow className="bg-rose-100">
              <TableHead className="w-[100px]">Serial no.</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Payment Date</TableHead>
              <TableHead>Total Cost</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments?.map((payment: any, i: number) => (
              <TableRow
                key={payment._id}
                className=" border-rose-100 border-2 border-y-2"
              >
                <TableCell className="font-medium">{i + 1}</TableCell>
                <TableCell className="font-medium">
                  {payment.clientEmail}
                </TableCell>
                <TableCell className="font-medium text-green-400">
                  {payment.transactionId}
                </TableCell>
                <TableCell>{payment.date}</TableCell>
                <TableCell>{payment.totalCost}</TableCell>
                <TableCell>{payment.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
};

export default PaymentHistory;