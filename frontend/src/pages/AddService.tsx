import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import generateTimeRange from "@/hooks/generateTimeRange";
import useAxios from "@/hooks/useAxios";
import { useForm } from "react-hook-form";

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


const AddService = () => {
    const { register, handleSubmit, formState:{errors}
     } = useForm<TForm>()
     const axiosSecure = useAxios()
     const onSubmit = (data) =>{
        const time = generateTimeRange(data.startTime, data.endTime)
        console.log(time);
        const serviceDetails = {
          cost: `$${data.cost}`,
          service_category: data.service_category,
          service_name: [data.service_name],
          image: data.image,
          time,
        };
        axiosSecure.post('/addservice', serviceDetails)
        .then((res) => console.log(res))
        .catch(err => console.log(err))
     }
    return (
      <Container>
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
            <Input className="bg-rose-200" type="file" {...register("image")} placeholder="Image URL" />
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