import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Container";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
type TInput = {
  email: string,
  password: string,
}
const Login = () => {
  const {register,handleSubmit, formState: {errors}, reset} = useForm<TInput>()
  const handleOnSubmit = (data: TInput) =>{
    console.log(data);
    reset();
  }
    return (
      <Container className="flex items-center justify-center h-screen w-full my-0 ">
        <div className="shadow-xl p-10 rounded-lg bg-rose-100">
          <h1 className="text-center font-libre">Login</h1>
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            
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
                {...register("password",{required:true})}
                placeholder="Your password"
                type="password"
              ></Input>
              {errors.password && <span>Please insert your password</span>}
            </div>
            <div>
              <p>
                Not registered yet?{" "}
                <Link to="/register">
                  <span className="font-bold">Signup</span>
                </Link>
              </p>
            </div>
            <div className="mt-5 w-full">
              <Button className="w-full bg-gradient-to-r from-purple-500 via-rose-400 to-purple-500">
                Login
              </Button>
            </div>
          </form>
        </div>
      </Container>
    );
};

export default Login;