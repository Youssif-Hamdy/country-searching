import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { LOGIN_FORM } from "../data";
import InputErrorMessage from "../components/ui/InputErrorMessage";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validation";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import Footer from "../components/Footer";
import { auth } from "../components/firebaseConfig";
import { useNavigate } from "react-router-dom"; 

interface IFormInput {
  identifier: string;
  password: string;
}

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.identifier,
        data.password
      );
      const user = userCredential.user;

      localStorage.setItem("loggedInUser", JSON.stringify(user));

      toast.success("Successfully logged in! You will be redirected to the home page...", {
        position: "bottom-center",
        duration: 1500,
        style: {
          backgroundColor: "black",
          color: "white",
          width: "fit-content",
        },
      });

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error: any) {
      toast.error(`${error.message}`, {
        position: "bottom-center",
        duration: 1500,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderLoginForm = LOGIN_FORM.map(
    ({ name, placeholder, type, validation }, idx) => {
      return (
        <div key={idx}>
          <Input
            type={type}
            placeholder={placeholder}
            {...register(name, validation)}
          />
          {errors[name] && <InputErrorMessage msg={errors[name]?.message} />}
        </div>
      );
    }
  );

  return (
    <div className="flex flex-col min-h-screen mt-4">
      <div className="flex items-center justify-center mt-10 flex-grow">
        <div className="bg-white shadow-lg rounded-lg flex flex-col sm:flex-row overflow-hidden max-w-4xl w-full mb-8">
          <div className="w-full sm:w-1/2 p-4 sm:p-8">
            <h2 className="text-center mb-4 text-3xl font-semibold">
              Log in to gain access!
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {renderLoginForm}
              <Button fullWidth isLoading={isLoading}>
                {isLoading ? "Logging in..." : "Log In"}
              </Button>
            </form>
          </div>
          <div className="w-full sm:w-1/2">
            <img
              src="https://static.vecteezy.com/system/resources/previews/024/881/469/original/mix-icon-for-access-vector.jpg"
              alt="Login Illustration"
              className="object-cover h-full w-full"
            />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Footer />
      </div>
    </div>
  );
};

export default LoginPage;
