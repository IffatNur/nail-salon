// service update is pending 
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";


const time = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00"];

const UpdateService = () => {
    const axiosPublic = useAxiosPublic()
    // axiosPublic.get(`/services/${id}`)
    const { _id, cost, image, service_category, service_name, time } =
      useLoaderData();
    const{register, handleSubmit, formState:{errors}, reset} = useForm()
    const onSubmit = (data) =>{
        console.log(data);
        // const updateService = {
        //   service_category: data.service_category,
        //   image: data.image,
        //   cost: data.cost,
        // };
        // Swal.fire({
        //   title: "Are you sure?",
        //   text: "You won't be able to revert this!",
        //   icon: "warning",
        //   showCancelButton: true,
        //   confirmButtonColor: "#3085d6",
        //   cancelButtonColor: "#d33",
        //   confirmButtonText: "Yes, update it!",
        // }).then((result) => {
        //   if (result.isConfirmed) {
        //     axiosPublic.patch(`/service/${_id}`,updateService)
        //     .then(res=>{
        //       console.log(res);
        //       Swal.fire({
        //         title: "Updated!",
        //         text: "Your file has been updated.",
        //         icon: "success",
        //       });
        //     });
            
        //   }
        // });
    }
    return (
      <Container>
        <div className="text-center my-10">
          <h1 className="font-libre text-rose-300">--- Update Service ---</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* <div>
            <Label htmlFor="service_name">Service Name</Label>
            <Input
              type="text"
              defaultValue={service_name}
              {...register("service_name")}
              placeholder="Service Name"
            />
            {errors.service_name && (
              <p className="text-rose-500">Please provide a service name</p>
            )}
          </div> */}
          <div>
            <Label htmlFor="service_category">Category</Label>
            <Input
              type="text"
              defaultValue={service_category}
              {...register("service_category")}
              placeholder="Service Category"
            />
            {errors.service_category && (
              <p className="text-rose-500">Please provide a service category</p>
            )}
          </div>
          <div>
            <Label htmlFor="image">Service Image</Label>
            <Input
              className="bg-rose-200"
              type="file"
              {...register("image")}
              placeholder="Image URL"
            />
          </div>
          <div>
            <Label htmlFor="cost">Cost</Label>
            <Input
              type="text"
              defaultValue={cost}
              {...register("cost")}
              placeholder="Service Cost"
            />
            {errors.cost && (
              <p className="text-rose-500">Please add service cost</p>
            )}
          </div>
          {/* <div className="flex gap-5">
            <div className="w-full">
              <Label htmlFor="startTime">Start time</Label>
              <select
                {...register("startTime")}
                className="w-full px-3 py-2 rounded-lg"
              >
                {time.map((t, i) => (
                  <option value={t} key={i}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <Label htmlFor="endTime">End time</Label>
              <select
                {...register("endTime")}
                className="w-full px-3 py-2 rounded-lg"
              >
                {time.map((t, i) => (
                  <option value={t} key={i}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div> */}

          <Button
            type="submit"
            className="bg-rose-300 hover:bg-purple-400 text-gray-200"
            
          >
            Update Information
          </Button>
        </form>
      </Container>
    );
};

export default UpdateService;