import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Container";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/contexts/AuthProvider";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
type TInput = {
  email: string,
  password: string,
}
const Login = () => {
  // const {loginWithRedirect, user} = useAuth0()
  const navigate = useNavigate();
  const location  = useLocation();
  const {SignIn,user} = useContext(AuthContext)
  const from = location?.state?.from?.pathname || '/'
  const {register,handleSubmit, formState: {errors}, reset} = useForm<TInput>()
  
  const handleOnSubmit = (data: TInput) =>{
    // loginWithRedirect() #Auth0
    const email = data.email;
    const password = data.password;
    SignIn({email,password})
    .then(result => {
      toast.success('Login Successful')
      navigate(from, { replace: true });
    })
    .catch(err => {
      console.log(err);
      toast.error('Invalid Login')

    })
    reset();
  }
  // console.log(user);
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
              <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 via-rose-400 to-purple-500">
                Login
              </Button>
            </div>
          </form>
        </div>
      </Container>
    );
};

export default Login;