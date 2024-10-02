import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Container";
import { AuthContext } from "@/contexts/AuthProvider";
import app from "@/firebase/firebase.init";
import useAppointment from "@/hooks/useAppointment";
import useAxios from "@/hooks/useAxios";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const CheckoutForm = () => {
  const {user} = useContext(AuthContext)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false);
    const [transactionId, setTransactionId] = useState('')
    const stripe = useStripe();
    const elements = useElements();
    const [appointment, refetch] = useAppointment();
    const axiosSecure = useAxios();
    const [clientSecret, setClientSecret] = useState();
    const cost = appointment.reduce((total:number, appoint) => total + appoint.cost, 0);

    useEffect(() => {
      if(cost > 0){
        axiosSecure.post("/create-payment-intent", {
            cost: cost,
          })
          .then((res) => {
            console.log(res.data.clientSecret);
            setClientSecret(res.data.clientSecret);
          });
      }
      
    }, [axiosSecure, cost]);

    const handleSubmit = async(event) =>{
        event.preventDefault();
        if(!stripe || !elements){
            return
        }

        const card = elements.getElement(CardElement);
        if(card === null){
            return
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if(error){
            console.log('Payment error',error);
            setError(error.message)
        }else{
            console.log("Payment method", paymentMethod);
            setError('')
        }

        // confirm card payment 
        if(clientSecret){
          const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || "Anonymous",
                    email: user?.email || "Anonymous",
                },
              },
            }
          );

          if(confirmError){
            console.log('confirm card error',confirmError);
          }else{
            console.log('payment Intent', paymentIntent);
            if(paymentIntent.status === 'succeeded'){
              setSuccess(true);
              setTransactionId(paymentIntent.id);
              // payment history of client
              const paymentDetails = {
                clientEmail: user.email,
                transactionId: paymentIntent.id,
                totalCost: cost,
                appointmentIds: appointment.map((app) => app._id),
                serviceIds: appointment.map((app) => app.serviceId),
                date: new Date(),
                status: "pending",
              };

              const res = await axiosSecure.post(
                "/payment-history",
                paymentDetails
              );
              console.log(res);
              toast.success("Payment Successful");
              refetch()
            }
          }
        }

        
    }
    return (
      <div className="w-full">
        <Container className="w-3/4 mx-auto text-center">
          <div className="text-center my-10">
            <h1 className="font-libre text-rose-300">--- Proceed to Pay ---</h1>
          </div>
          <div className="flex justify-between my-3">
            <p className="font-bold text-gray-600">Your Bill</p>
            <p className="font-bold text-gray-600">
              $<span className="text-rose-400">{cost}</span>
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <CardElement
              className="border-2 border-rose-100 px-5 py-3 mb-5"
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            ></CardElement>
            <p className="text-rose-600 my-2">{error}</p>
            {transactionId && (
              <p className="my-2">
                Transaction ID: <span className="text-green-500">{transactionId}</span>
              </p>
            )}
            <Button
              className="bg-rose-100 hover:bg-transparent text-rose-600 hover:bg-rose-600 hover:text-rose-100 rounded-sm border-2 border-rose-600 w-1/2 "
              type="submit"
              disabled={!stripe || !clientSecret || success}
            >
              Pay
            </Button>
          </form>
        </Container>
      </div>
    );
};

export default CheckoutForm;