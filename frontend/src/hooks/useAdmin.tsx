import { AuthContext } from "@/contexts/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import useAxios from "./useAxios";

const useAdmin = () => {
    const {user, loading} = useContext(AuthContext);
    const axiosSecure = useAxios()
    const {data: isAdmin, isPending} = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !loading,
        queryFn: async() =>{
            const result = await axiosSecure.get(`users/admin/${user?.email}`)
            return result.data.isAdmin
        }
    })
    return [isAdmin,isPending];
};

export default useAdmin;