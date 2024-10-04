import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAppointment from "@/hooks/useAppointment";
import useAxios from "@/hooks/useAxios";
import { useForm } from "react-hook-form";

const SSLPayment = () => {
    const axiosSecure = useAxios()
    const [appointment] = useAppointment()
    const totalCost = appointment.reduce((total, appoint) => total + appoint.cost, 0)
    const {register,handleSubmit, error} = useForm()
    const handleOnSubmit = (data) =>{
        const paymentDetails = {
            amount: totalCost,
            currency: 'USD'
        }
        axiosSecure.post("/create-ssl-payment",paymentDetails)
        .then(res => console.log(res));
    }

    return (
        <form onSubmit={handleSubmit(handleOnSubmit)}>
            {/* <Input {...register('')}></Input> */}
            <Button type="submit">Confirm Payment</Button>
        </form>
    );
};

export default SSLPayment;