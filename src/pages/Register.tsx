import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import InputErrorMessage from "../components/ui/InputErrorMessage";
import { REGISTER_FORM } from "../data/index";
import { registerSchema } from "../validation/index";
import { yupResolver } from "@hookform/resolvers/yup";                    
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { createUserWithEmailAndPassword } from "firebase/auth"; 
import { auth } from "../components/firebaseConfig"; 

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      // @ts-ignore
      localStorage.setItem("email", user.email);

      toast.success(
        "You have been successfully registered! You will be redirected to the login page in two seconds.",
        {
          position: "bottom-center",
          duration: 1500,
          style: {
            backgroundColor: "black",
            color: "white",
            width: "fit-content",
          },
        }
      );

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error: any) {
      toast.error(`Error: ${error.message}`, {
        position: "bottom-center",
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderRegisterForm = REGISTER_FORM.map(
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
    <div className="flex flex-col min-h-screen">
      <div className="flex items-center justify-center mt-10 flex-grow">
        <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden max-w-4xl w-full mb-8">
          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-center mb-4 text-3xl font-semibold">
              Sign up to gain access!
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              {renderRegisterForm}
              <Button fullWidth isLoading={isLoading}>
                {isLoading ? "Loading..." : "Sign Up"}
              </Button>
            </form>
          </div>
          <div className="w-full md:w-1/2">
            <img
              src="https://static.vecteezy.com/system/resources/previews/024/881/469/original/mix-icon-for-access-vector.jpg"
              alt="Registration Illustration"
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

export default RegisterPage;
