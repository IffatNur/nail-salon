import DashboardHeader from "@/components/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { CircleUserRound, Trash2, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AllUsers = () => {
    const axiosSecure = useAxios()
    // axios.get('/users')
    // .then(res => console.log(res.data))
    // .catch(err => console.log(err))
    const {data: users = [],refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async () =>{
            const query = await axiosSecure.get("/users");
            return query.data
        }
    })
    const handleDelete = (id) =>{
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
            axiosSecure.delete(`/users/${id}`).then((res) => {
              if (res.data.deletedCount > 0) {
                Swal.fire({
                  title: "Deleted!",
                  text: "User has been removed.",
                  icon: "success",
                });
                refetch();
              }
            });
          }
        });
    }

    const makeAdmin = (id) =>{
        Swal.fire({
          title: "Do you want to make him admin?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Make admin",
        }).then((result) => {
          if (result.isConfirmed) {
            axiosSecure.patch(`/users/${id}`).then((res) => {
              if (res.data.modifiedCount > 0) {
                Swal.fire({
                  title: "Update!",
                  text: "User role has been updated.",
                  icon: "success",
                });
              }
              refetch();
            });
          }
        });
    }
    return (
      <div className="w-full mx-auto px-10">
        <DashboardHeader>--- All Users ---</DashboardHeader>
        <Table className=" border-rose-100 border-2">
          <TableHeader>
            <TableRow className="bg-rose-100 ">
              <TableHead className="w-[100px]">Serial no.</TableHead>
              <TableHead>User Name</TableHead>
              <TableHead>User Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user, i) => (
              <TableRow
                key={user._id}
                className=" border-rose-100 border-2 border-y-2"
              >
                <TableCell className="font-medium">{i + 1}</TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        {user?.role === "admin" ? (
                          <Button className="bg-transparent hover:bg-transparent text-fuchsia-400">
                            <p className="text-green-600">
                              <CircleUserRound />
                            </p>
                          </Button>
                        ) : (
                          <Button
                            onClick={() => makeAdmin(user._id)}
                            className="bg-transparent hover:bg-transparent text-fuchsia-400"
                          >
                            <Users />
                          </Button>
                        )}
                      </TooltipTrigger>
                      <TooltipContent>
                        {user?.role === "admin" ? (
                          <p>Admin</p>
                        ) : (
                          <p>Change role?</p>
                        )}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell className="text-right">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => handleDelete(user._id)}
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
              <TableCell colSpan={5}>Total user : {users?.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    );
};

export default AllUsers;