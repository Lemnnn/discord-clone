import AuthInput from "../shared/AuthInput/AuthInput";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import AuthButton from "../shared/AuthButton/AuthButton";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/authAPI";

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      navigate("/dashboard");
    },
  });

  const handleUserChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  if (mutation.isLoading) {
    return <p>Loading...</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate(user);
  };

  return (
    <div className="body">
      <div className="loginFormContainer">
        <form className="loginForm" onSubmit={handleSubmit}>
          <div className="loginFormTitleContainer">
            <h1 className="formTitle textColor">Welcom back!</h1>
            <p className="formSubTitle textColorFade">
              We&apos;re so excited to see you again!
            </p>
          </div>
          {mutation.isError ? <p>Error: {mutation.error?.message}</p> : null}
          <AuthInput
            label="EMAIL"
            type="email"
            name="email"
            value={user.email}
            onChange={(e) => handleUserChange(e)}
          />
          <AuthInput
            label="PASSWORD"
            type="password"
            name="password"
            value={user.password}
            onChange={(e) => handleUserChange(e)}
          />
          <Link className="forgotPassword">Forgot your password?</Link>
          <AuthButton label="Log In" type="submit" />
          <p className="textColorFade needAcc">
            Need an account?{" "}
            <Link to="/register" className="authLink">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
