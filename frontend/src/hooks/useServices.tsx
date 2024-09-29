import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useServices = () => {
    const axiosPublic = useAxiosPublic();
    const {data: services = [], refetch} = useQuery({
        queryKey:['services'],
        queryFn: async () =>{
            const data = await axiosPublic.get('/services');
            const result = await data.data
            return result
        }
    })
    return [services,refetch]
};

export default useServices;