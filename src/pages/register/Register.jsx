import React from "react";
import "./Register.css";
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
            <div className="loginBox h-[400px] p-[20px] bg-white rounded-[10px] flex flex-col justify-between   ">
                <input type="text" className="loginInput " placeholder="username"  />
                <input type="text" className="loginInput " placeholder="Email"  />
                <input type="password" className="loginInput"  placeholder="Password" />
                <input type="password" className="loginInput"  placeholder="Re-enter Password" />
                <button className="loginButton h-[50px] rounded-[10px] border-none bg-[#1775ee] text-white text-[20px] font-[500] ">Sign Up</button>
                
                <button className="loginRegisterButton h-[50px] rounded-[10px] border-none bg-[#42b72a] w-[60%] self-center text-white text-[20px] font-[500] ">Log into Account</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
