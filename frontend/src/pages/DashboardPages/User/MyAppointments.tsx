import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import useAppointment from "@/hooks/useAppointment";
import useAxios from "@/hooks/useAxios";
import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyAppointments = () => {
    const [appointment, refetch] = useAppointment();
    const axios = useAxios()

    const totalCost = appointment.reduce(
      (total, appoint) => total + appoint.cost,
      0
    );
    const handleDelete = (id: string) =>{
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            axios.delete(`/appointments/${id}`)
            .then(res=> {
                if(res.data.deletedCount){
                  Swal.fire({
                    title: "Deleted!",
                    text: "Your appointment has been deleted",
                    icon: "success",
                  });
                  refetch();
                }
            })
          }
        });
    }
  return (
    <div className="w-full mx-auto px-10">
      <div className="text-center my-10">
        <h1 className="font-libre text-rose-300">--- My Appointments ---</h1>
      </div>
      <Table className=" border-rose-100 border-2">
        <TableHeader>
          <TableRow className="bg-rose-100">
            <TableHead className="w-[100px]">Serial no.</TableHead>
            <TableHead>Cateogry</TableHead>
            <TableHead>Service Name</TableHead>
            <TableHead>Service Cost</TableHead>
            <TableHead>Appointment Time</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointment?.map((appoint, i) => (
            <TableRow
              key={appoint._id}
              className=" border-rose-100 border-2 border-y-2"
            >
              <TableCell className="font-medium">{i + 1}</TableCell>
              <TableCell className="font-medium">
                {appoint.serviceCategory}
              </TableCell>
              <TableCell>{appoint.serviceName}</TableCell>
              <TableCell>{appoint.cost}</TableCell>
              <TableCell>{appoint.appointmentTime}</TableCell>
              <TableCell className="text-right">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={() => handleDelete(appoint._id)}
                        className="bg-transparent hover:bg-transparent text-rose-600"
                      >
                        <Trash2 />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell>${totalCost}</TableCell>
            <TableCell colSpan={2} className="text-right">
              {totalCost === 0 ? (
                  <Button className="bg-gray-600 hover:bg-transparent" disabled>
                    Proceed to Pay
                  </Button>
              ) : (
                <Link to="payment">
                  <Button className="bg-rose-100 hover:bg-transparent text-rose-600 hover:bg-rose-600 hover:text-rose-100 rounded-sm border-2 border-rose-600">
                    Proceed to Pay
                  </Button>
                </Link>
              )}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default MyAppointments;
