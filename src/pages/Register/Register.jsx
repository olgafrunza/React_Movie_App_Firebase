import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Register.module.css";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { register, signUpProvider } from "../../firebase";

const Register = () => {
  const navigate = useNavigate();
  const initialValues = { name: "", email: "", password: "" };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email Required"),
    password: Yup.string().min(5, "Minimum 5 characters"),
    name: Yup.string().min(5, "Minimum 5 characters"),
  });

  const handleSubmit = async (values) => {
    const { email, name, password } = values;
    const error = await register(email, password, name);
    if (error) navigate("/register");
    else navigate("/");
  };

  const providerHandler = () => {
    signUpProvider();
    navigate("/");
  };

  return (
    <div className={`page ${classes.Register}`}>
      <div className={classes.RegisterForm}>
        <h1> Register</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <div className="mb-3">
              <label
                htmlFor="name"
                className="form-label text-light d-block mb-2"
              >
                Name
              </label>
              <Field
                id="name"
                type="name"
                autoComplete="off"
                placeholder="Enter Name"
                name="name"
                className="form-control"
              />
              <small className="text-danger">
                <ErrorMessage name="name" />
              </small>
            </div>

            <div className="mb-3">
              <label
                htmlFor="email"
                className="form-label text-light d-block mb-2"
              >
                Email
              </label>
              <Field
                id="email"
                type="email"
                autoComplete="off"
                placeholder="Enter Email"
                name="email"
                className="form-control"
              />
              <small className="text-danger">
                <ErrorMessage name="email" />
              </small>
            </div>
            <div className="mb-3">
              <label
                htmlFor="password"
                className="form-label text-light d-block mb-2"
              >
                Password
              </label>
              <Field
                id="password"
                type="password"
                autoComplete="off"
                placeholder="Enter Password"
                name="password"
                className="form-control"
              />
              <small className="text-danger">
                <ErrorMessage name="password" />
              </small>
            </div>

            <div className="d-grid">
              <button className="btn btn-primary mt-2"> Sign up</button>
            </div>
          </Form>
        </Formik>
        <div className="d-grid">
          <button className="btn btn-primary mt-2" onClick={providerHandler}>
            {" "}
            Continue with Google Account
          </button>
        </div>
        <p className="text-center text-light mt-2">
          Have an account?
          <span
            className="text-warning"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
