import React from "react";
import "./Register.css";
import { signup } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Loader from "../../components/loader/Loader";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    address: Yup.string().required("Address is required"),
    phone: Yup.string()
      .matches(/^\d{10,15}$/, "Phone must be between 10-15 digits")
      .required("Phone is required"),
    gender: Yup.string().required("Gender is required"),
    file: Yup.mixed()
    .required("File is required")
    .test(
      "fileType",
      "Only image files are allowed (e.g., jpg, png, gif)",
      (value) => {
        return value && ["image/jpeg", "image/png", "image/gif"].includes(value.type);
      }
    ),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      const { file, ...user } = values;
      // console.log(file);
      // console.log(user);
      await dispatch(signup({ ...user, file }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login w-screen h-full bg-[#f0f2f5] flex items-center justify-center py-20">
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          address: "",
          phone: "",
          gender: "",
          file: null,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({ setFieldValue, values, isSubmitting }) => (
          <Form className="loginWrapper w-[70%] h-[70%] flex gap-6 flex-col lg:flex-row">
            <div className="loginLeft">
              <h3 className="loginLogo text-[50px] font-bold text-[#1775ee] mb-[10px]">
                FaceLink
              </h3>
              <span className="loginDesc text-[24px]">
                Connect with friends and the world around you on FaceLink.
              </span>
            </div>
            <div className="loginRight">
              <div className="loginBox p-[20px] bg-white rounded-[10px] flex flex-col justify-between gap-4">
                <Field
                  className="loginInput"
                  type="text"
                  name="name"
                  placeholder="Name"
                />
                <ErrorMessage name="name" component="div" className="text-red-500" />

                <Field
                  className="loginInput"
                  type="email"
                  name="email"
                  placeholder="Email"
                />
                <ErrorMessage name="email" component="div" className="text-red-500" />

                <Field
                  className="loginInput"
                  type="password"
                  name="password"
                  placeholder="Password"
                />
                <ErrorMessage name="password" component="div" className="text-red-500" />

                <Field
                  className="loginInput"
                  type="text"
                  name="address"
                  placeholder="Address"
                />
                <ErrorMessage name="address" component="div" className="text-red-500" />

                <Field
                  className="loginInput"
                  type="text"
                  name="phone"
                  placeholder="Phone"
                />
                <ErrorMessage name="phone" component="div" className="text-red-500" />

                <div className="flex items-center justify-evenly">
                  <label>
                    <Field type="radio" name="gender" value="male" />
                    Male
                  </label>
                  <label>
                    <Field type="radio" name="gender" value="female" />
                    Female
                  </label>
                </div>
                <ErrorMessage name="gender" component="div" className="text-red-500" />

                <div className="flex items-center justify-center h-[200px] bg-gray-100">
                  <div className="relative group">
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files.length > 0) {
                          setFieldValue("file", e.target.files[0]);
                        }
                      }}
                    />
                    <label
                      htmlFor="file-upload"
                      className="flex items-center justify-center w-48 px-4 py-2 text-white bg-blue-600 rounded-md shadow-md cursor-pointer hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                      <svg
                        className="w-5 h-5 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 16v5H8v-5m4 5V9m0-7l-7 7h4v8h6v-8h4l-7-7z"
                        />
                      </svg>
                      Upload File
                    </label>
                    <ErrorMessage name="file" component="div" className="text-red-500" />
                    <p className="mt-2 text-sm text-gray-800 truncate">
                      {values.file ? `Selected: ${values.file.name}` : "No file selected"}
                    </p>
                  </div>
                </div>

                <button
                  className="loginButton h-[50px] rounded-[10px] bg-[#1775ee] text-white"
                  type="submit"
                  disabled={isSubmitting}>
                  {isSubmitting ? <Loader /> : "Sign Up"}
                </button>

                <button
                  className="loginRegisterButton h-[50px] rounded-[10px] bg-[#42b72a] w-[60%] self-center text-white"
                  type="button"
                  onClick={() => navigate("/login")}>
                  Log into Account
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
