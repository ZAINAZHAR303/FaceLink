import React, { useState } from "react";
import "./Login.css";
import { login } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async() => {
    try{
    let user = {
      email,
      password,
    };

   await dispatch(login(user));
  }finally{
    setloading(false);
  }
  };

  const handleRegister = () => {
    // console.log("Register");
    navigate("/signup");
  };

  return (
    <div className="login w-screen h-full py-20 bg-[#f0f2f5] flex   items-center justify-center ">
      <div className="loginWrapper w-[70%] h-[70%] flex flex-col lg:flex-row gap-4">
        <div className="loginLeft">
          <h3 className="loginLogo text-[50px] font-bold text-[#1775ee] mb-[10px]  ">
            FaceLink
          </h3>
          <span className="loginDesc text-[24px]  ">
            Connect with friends ant the world aroundyou on FaceLink.{" "}
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox  p-[20px] bg-white rounded-[10px] flex flex-col justify-between gap-4  ">
            <input
              type="email"
              className="loginInput"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="loginInput"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="loginButton h-[50px] rounded-[10px] border-none bg-[#1775ee] text-white text-[20px] font-[500] "
              onClick={handleLogin}>
              Log In
            </button>
            <span className="loginForgot text-center text-[#1775ee] ">
              Forgot Password
            </span>
            
            <button
              className="loginRegisterButton h-[50px] rounded-[10px] border-none bg-[#42b72a] w-[60%] self-center text-white text-[20px] font-[500] "
              onClick={handleRegister}>
              Create a New Account
            </button>
          </div>
        </div>
      </div>
      {
        loading &&(
          <Loader />
        )
      }
    </div>
  );
}

export default Login;
