import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import classes from "./Login.module.css";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { forgetPassword, login, signUpProvider } from "../../firebase";

const Login = () => {
  const navigate = useNavigate();

  const initialValues = { email: "", password: "" };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email Required"),
    password: Yup.string().min(5, "Minimum 5 characters"),
  });

  const handleSubmit = async (values) => {
    const error = await login(values.email, values.password);
    if (error) navigate("/login");
    else navigate("/");
  };

  const providerHandler = () => {
    signUpProvider();
    navigate("/");
  };

  const forgetPasswordHandler = async (email) => {
    await forgetPassword(email);
  };

  return (
    <div className={`page ${classes.Login}`}>
      <div className={classes.LoginForm}>
        <h1> Login</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ values }) => (
            <Form>
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
              <div
                onClick={() => forgetPasswordHandler(values.email)}
                className="text-center text-warning mt-3"
                style={{ cursor: "pointer" }}
              >
                Forgot Password?
              </div>

              <div className="d-grid">
                <button className="btn btn-primary mt-2"> Login</button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="d-grid">
          <button
            className="btn btn-primary mt-2"
            type="button"
            onClick={providerHandler}
          >
            {" "}
            Continue with Google Account
          </button>
        </div>
        <p className="text-center text-light mt-2">
          Don't have an account?
          <span
            className="text-warning"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
