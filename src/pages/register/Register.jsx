import React, { useState } from "react";
import "./Register.css";
import { signup } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
    const[file,setFile] = useState("");
const dispatch = useDispatch()
    const signupHandler = (e) => {
      e.preventDefault();
      let user = {
        name,
        email,
        password,
        address,
        phone,
        gender,
      };
      console.log(file)
      console.log(user);
      dispatch(signup({...user,file}));
    };
    const LoginHandler =()=>{
        navigate("/login")
    }
  return (
    <div className="login w-screen h-full bg-[#f0f2f5] flex items-center justify-center py-20 ">
      <div className="loginWrapper w-[70%] h-[70%] flex gap-6 flex-col lg:flex-row">
        <div className="loginLeft">
          <h3 className="loginLogo text-[50px] font-bold text-[#1775ee] mb-[10px]  ">Lamasocial</h3>
          <span className="loginDesc text-[24px]  ">
            Connect with friends ant the world aroundyou on Lamasocial.{" "}
          </span>
        </div>
        <div className="loginRight   ">
            <div className="loginBox  p-[20px] bg-white rounded-[10px] flex flex-col justify-between gap-4  ">
            <input
          className="loginInput "
          type="text"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="loginInput "
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="loginInput "
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="loginInput "
          type="text"
          placeholder="address"
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          className="loginInput "
          type="number"
          placeholder="phone"
          onChange={(e) => setPhone(e.target.value)}
        />
        <div className=" flex items-center justify-evenly">
          <div className="flex items-center gap-2">
          <label>Male</label>
          <input
            type="radio"
            name="gender"
            value="male"
            className="h-[20px] w-[20px] "
            onChange={(e) => setGender(e.target.value)}
          />
          </div>
          <div className="flex items-center gap-2">
          <label>female</label>
          <input
            type="radio"
            name="gender"
            value="female"
            className="h-[20px] w-[20px]  "
            onChange={(e) => setGender(e.target.value)}
          />
          </div>
        </div>
        <div className="flex items-center justify-center h-[200px] bg-gray-100">
  <div className="relative group">
    <input
      type="file"
      id="file-upload"
      className="hidden"
      onChange={(e) => setFile(e.target.files[0])}
    />
    <label
      htmlFor="file-upload"
      className="flex items-center justify-center w-48 px-4 py-2 text-white bg-blue-600 rounded-md shadow-md cursor-pointer hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
    >
      <svg
        className="w-5 h-5 mr-2"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M16 16v5H8v-5m4 5V9m0-7l-7 7h4v8h6v-8h4l-7-7z"
        />
      </svg>
      Upload File
    </label>
    {file && (
          <p className="mt-2 text-sm text-gray-800 truncate">
            Selected: {file.name}
          </p>
        )}
  </div>
</div>


                <button className="loginButton h-[50px] rounded-[10px] border-none bg-[#1775ee] text-white text-[20px] font-[500] " onClick={signupHandler}>Sign Up</button>
                
                <button className="loginRegisterButton h-[50px] rounded-[10px] border-none bg-[#42b72a] w-[60%] self-center text-white text-[20px] font-[500] " onClick={LoginHandler}>Log into Account</button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
