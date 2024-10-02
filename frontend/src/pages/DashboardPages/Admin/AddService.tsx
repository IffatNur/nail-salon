import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import generateTimeRange from "@/hooks/generateTimeRange";
import useAxios from "@/hooks/useAxios";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type TForm = {
  service_name: string,
  service_category:string,
  cost:string,
  image:string,
  startTime:string,
  endTime:string
};
const time = [
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
]
const image_hosting_url = `https://api.imgbb.com/1/upload?key=${
  import.meta.env.VITE_IMAGE_API_KEY
}`;
const AddService = () => {
    const { register, handleSubmit, formState:{errors}, reset} = useForm<TForm>()
     const axiosPublic = useAxiosPublic()
     const axiosSecure = useAxios()
     const onSubmit = async(data) =>{
        const time = generateTimeRange(data.startTime, data.endTime)
        
        const imageFile = {image: data.image[0]}
        const res = await axiosPublic.post(image_hosting_url, imageFile,{
          headers:{
            'content-type': 'multipart/form-data'
          }
        })
        console.log(res.data);
        if(res.data.success){
          const serviceDetails = {
            cost: data.cost,
            service_category: data.service_category,
            service_name: [data.service_name],
            image: res.data.data.display_url,
            time,
          };
          axiosSecure.post("/addservice", serviceDetails)
          .then(res => {
            if(res.data.insertedId){
              toast.success('New service added')
            }
          })
          .catch(err => console.log(err));
        }
        reset()
     }
    return (
      <Container>
        <div className="text-center my-10">
          <h1 className="font-libre text-rose-300">---Add Service ---</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div>
            <Label htmlFor="service_name">Service Name</Label>
            <Input
              type="text"
              {...register("service_name", { required: true })}
              placeholder="Service Name"
            />
            {errors.service_name && (
              <p className="text-rose-500">Please provide a service name</p>
            )}
          </div>
          <div>
            <Label htmlFor="service_category">Category</Label>
            <Input
              type="text"
              {...register("service_category", { required: true })}
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
              {...register("cost", { required: true })}
              placeholder="Service Cost"
            />
            {errors.cost && (
              <p className="text-rose-500">Please add service cost</p>
            )}
          </div>
          <div className="flex gap-5">
            <div className="w-full">
              <Label htmlFor="startTime">Start time</Label>
              <select
                {...register("startTime", { required: true })}
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
                {...register("endTime", { required: true })}
                className="w-full px-3 py-2 rounded-lg"
              >
                {time.map((t, i) => (
                  <option value={t} key={i}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Button type="submit">Submit</Button>
        </form>
      </Container>
    );
};

export default AddService;