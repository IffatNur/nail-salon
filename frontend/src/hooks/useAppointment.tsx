import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthProvider";

// to get all appointments by email 

const useAppointment = () => {
    const axiosSecure = useAxios()
    const {user} = useContext(AuthContext)
    const {data: appointment = [], refetch} = useQuery({
        queryKey:['appointment', user?.email],
        queryFn: async() =>{
          // this part is query: ?email=${user.email}
          const data = await axiosSecure.get(
            `/appointments?email=${user.email}`
          );
          const result = await data.data;
          return result;
        }
    })
    return [appointment, refetch];
};

export default useAppointment;