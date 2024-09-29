import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import useAxios from "@/hooks/useAxios";
import useServices from "@/hooks/useServices";
import { FilePenLine, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ManageServices = () => {
  const [services,refetch] = useServices()
  const axiosSecure = useAxios()
  const handleDelete = (id:string) =>{
    console.log(id);
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
        axiosSecure.delete(`service/${id}`).then((res) => {
          if (res?.data.deletedCount===1){
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
    
  }

    return (
      <div className="w-full mx-auto px-10">
        <div className="text-center my-10">
          <h1 className="font-libre text-rose-300">--- All Services ---</h1>
        </div>
        <Table className=" border-rose-100 border-2">
          <TableHeader>
            <TableRow className="bg-rose-100">
              <TableHead className="w-[100px]">Serial no.</TableHead>
              <TableHead>Cateogry</TableHead>
              <TableHead>Service Cost</TableHead>
              <TableHead className="text-right">Update</TableHead>
              <TableHead className="text-right">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services?.map((service, i) => (
              <TableRow
                key={service._id}
                className=" border-rose-100 border-2 border-y-2"
              >
                <TableCell className="font-medium">{i + 1}</TableCell>
                <TableCell className="font-medium">
                  {service.service_category}
                </TableCell>
                <TableCell>{service.cost}</TableCell>
                <TableCell className="text-right">
                  <Link to={`/dashboard/updateservice/${service._id}`}>
                    <Button className="bg-transparent hover:bg-transparent text-purple-600">
                      <FilePenLine />
                    </Button>
                  </Link>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    onClick={() => handleDelete(service._id)}
                    className="bg-transparent hover:bg-transparent text-rose-600"
                  >
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
};

export default ManageServices;