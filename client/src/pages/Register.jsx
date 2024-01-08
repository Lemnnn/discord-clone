import AuthInput from "../shared/AuthInput/AuthInput";
import { Link, useNavigate } from "react-router-dom";
import "../styles/register.css";
import AuthButton from "../shared/AuthButton/AuthButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser } from "../api/authAPI";
import { useState } from "react";

const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/login");
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
            <h1 className="formTitle textColor">Create an account</h1>
          </div>
          <AuthInput
            label="EMAIL"
            type="email"
            name="email"
            value={user.email}
            onChange={(e) => handleUserChange(e)}
          />
          <AuthInput
            label="USERNAME"
            type="username"
            name="username"
            value={user.username}
            onChange={(e) => handleUserChange(e)}
          />
          <AuthInput
            label="PASSWORD"
            type="password"
            name="password"
            value={user.password}
            onChange={(e) => handleUserChange(e)}
          />
          <AuthButton label="Continue" type="submit" />
          <Link to="/login" className="authLink">
            Already have an account?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
