import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Container";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { AuthContext } from "@/contexts/AuthProvider";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
type TInput = {
    name: string,
    email: string,
    password: string,
}
const Signup = () => {
  // const{ loginWithRedirect,user } = useAuth0()
    const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm<TInput>();
    const navigate = useNavigate();
    const { Signup, UpdateUserProfile } = useContext(AuthContext);
    const handleOnSubmit = (data: TInput) => {
      const name = data.name;
      const email = data.email;
      const password = data.password;
      // loginWithRedirect({
      //   authorizationParams:{
      //     screen_hint: 'signup'
      //   }
      // })
      // if(user?.nickname){
      //   user.nickname = name;
      // }
      Signup({email, password})
      .then((user) =>{
        console.log(user)
        UpdateUserProfile(name)
        .then(()=>{
          console.log('updated profile');
          toast.success('Profile Created Successfully')
        })
        .catch(err=>console.log(err))
        })
      .catch(err => console.log(err))
      reset();
    };
    // console.log(user);
    return (
      <Container className="flex items-center justify-center h-screen w-full my-0 ">
        <div className="shadow-xl p-10 rounded-lg bg-rose-100">
          <h1 className="text-center font-libre">Register</h1>
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <div className="mt-5 w-full">
              <Input
                className="w-96"
                placeholder="Your full name"
                type="text"
                {...register("name", { required: true })}
              ></Input>
              {errors.name && <span>Please insert your name</span>}
            </div>
            <div className="mt-5 w-full">
              <Input
                className="w-96"
                {...register("email", { required: true })}
                placeholder="Your email"
                type="email"
              ></Input>
              {errors.email && <span>Please insert your email</span>}
            </div>
            <div className="mt-5 w-full">
              <Input
                className="w-96"
                {...register("password", {
                  required: true,
                  pattern: {value : /^(?=.*[!@#$&*])(?=.*[0-9]).{6,}$/, message: 'Add atlease one special character and a number'},
                  minLength: {
                    value: 6,
                    message:
                      "Password length should contain atleast 6 character",
                  },
                  maxLength: {
                    value: 10,
                    message:
                      "Password length should contain at most 10 character",
                  },
                })}
                placeholder="Your password"
                type="password"
              ></Input>
              {errors.password && <span>{errors.password?.message}</span>}
            </div>
            <div>
              <p>
                Already registered?{" "}
                <Link to="/login">
                  <span className="font-bold">Login</span>
                </Link>
              </p>
            </div>
            <div className="mt-5 w-full">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 via-rose-400 to-purple-500"
              >
                Signup
              </Button>
              <div className="flex items-center justify-between">
                <Separator className="my-5 bg-black w-2/5" />
                <span>OR</span>
                <Separator className="my-5 bg-black w-2/5" />
              </div>
              <Button className="w-full bg-gradient-to-r from-purple-500 via-rose-400 to-purple-500">
                Google Signup
              </Button>
            </div>
          </form>
        </div>
      </Container>
    );
};

export default Signup;