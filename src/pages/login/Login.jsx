import React from "react";
import "./Login.css";
function Login() {
  return (
    <div className="login w-screen h-screen bg-[#f0f2f5] flex items-center justify-center ">
      <div className="loginWrapper w-[70%] h-[70%] flex ">
        <div className="loginLeft">
          <h3 className="loginLogo text-[50px] font-bold text-[#1775ee] mb-[10px]  ">Lamasocial</h3>
          <span className="loginDesc text-[24px]  ">
            Connect with friends ant the world aroundyou on Lamasocial.{" "}
          </span>
        </div>
        <div className="loginRight">
            <div className="loginBox h-[300px] p-[20px] bg-white rounded-[10px] flex flex-col justify-between   ">
                <input type="text" className="loginInput " placeholder="Username" />
                <input type="password" className="loginInput" placeholder="Password" />
                <button className="loginButton h-[50px] rounded-[10px] border-none bg-[#1775ee] text-white text-[20px] font-[500] ">Log In</button>
                <span className="loginForgot text-center text-[#1775ee] " >Forgot Password</span>
                <button className="loginRegisterButton h-[50px] rounded-[10px] border-none bg-[#42b72a] w-[60%] self-center text-white text-[20px] font-[500] ">Create a New Account</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
