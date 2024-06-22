import LoginForm from "@/components/auth/login-form";
import LoginFormAction from "@/components/auth/login-form-action";
import LoginFormSubmit from "@/components/auth/login-form-onsubmit";

const LoginPage = () => {
  return (
    <div>
      <h1 className="text-xl">Login</h1>
      <div className="flex justify-between">
        <LoginFormSubmit />
        <LoginFormAction />
      </div>
    </div>
  );
};

export default LoginPage;
