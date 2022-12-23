import React from "react";
import Nav from "../components/Nav";
import { useState } from "react";
import { Formik, Form } from "formik";
import FormItem from "../components/FormIitem";
import logoCard from "../assets/logo-chat.png";
import { logginSchema, signUpSchema } from "../utils/logginSchema";
import * as yup from "yup";

function Register({ props }) {
  const [log, setLog] = useState(props);

  const initialSignIn = {
    username: "",
    password: "",
  };
  const initialSignUp = {
    username: "",
    email: "",
    password: "",
    confirmPass: "",
  };

  return (
    <>
      {log === false ? (
        <>
          <Nav
            props={[
              { li: "Home", redirect: "/" },
              { li: "About", redirect: "/about" },
            ]}
          />
          <div className="form-container">
            <Formik
              key={"1"}
              initialValues={initialSignUp}
              validationSchema={signUpSchema}
              onSubmit={(values, actions) => {
                console.log(values);
                actions.resetForm();
              }}
            >
              {({ handleChange, handleReset, values, errors }) => (
                <Form className="form">
                  <h2>
                    Register to chat with your people from all over the world
                  </h2>
                  <div className="bubbleChat">
                    <img src={logoCard} alt="bubbleChat" />
                    <img src={logoCard} alt="bubbleChat" />
                    <img src={logoCard} alt="bubbleChat" />
                  </div>

                  <div className="input-container">
                    <FormItem
                      props={{
                        type: "text",
                        name: "username",
                        placeholder: "Username",
                        value: values.username,
                        onChange: handleChange,
                      }}
                    />
                    {errors.username ? <p>{errors.username}</p> : null}
                  </div>
                  <div className="input-container">
                    <FormItem
                      props={{
                        type: "text",
                        name: "email",
                        placeholder: "Email",
                        value: values.email,
                        onChange: handleChange,
                      }}
                    />
                    {errors.email ? <p>{errors.email}</p> : null}
                  </div>
                  <div className="input-container">
                    <FormItem
                      props={{
                        type: "password",
                        name: "password",
                        placeholder: "Password",
                        value: values.password,
                        onChange: handleChange,
                      }}
                    />
                    {errors.password ? <p>{errors.password}</p> : null}
                  </div>

                  <div className="input-container">
                    <FormItem
                      props={{
                        type: "password",
                        name: "confirmPass",
                        placeholder: "Confirm password",
                        value: values.confirmPass,
                        onChange: handleChange,
                      }}
                    />
                    {errors.confirmPass ? <p>{errors.confirmPass}</p> : null}
                  </div>
                  <button type="submit" className="btn-reg">
                    Go to chat
                  </button>

                  <span>
                    Already register?{" "}
                    <span className="log" onClick={() => setLog(!log)}>
                      LOGIN
                    </span>{" "}
                  </span>
                </Form>
              )}
            </Formik>
          </div>
        </>
      ) : (
        <>
          <Nav
            props={[
              { li: "Home", redirect: "/" },
              { li: "About", redirect: "/about" },
            ]}
          />
          <div className="form-container">
            <Formik
              key={"2"}
              initialValues={initialSignIn}
              validationSchema={logginSchema}
              onSubmit={(values, actions) => {
                console.log(values);
                actions.resetForm();
              }}
            >
              {({ handleChange, values, errors }) => (
                <Form className="form">
                  <h2>
                    Sign in to chat with your people from all over the world
                  </h2>
                  <div className="bubbleChat login">
                    <img src={logoCard} alt="bubbleChat" />
                    <img src={logoCard} alt="bubbleChat" />
                    <img src={logoCard} alt="bubbleChat" />
                  </div>
                  <div className="input-container login">
                    <FormItem
                      props={{
                        type: "text",
                        name: "username",
                        placeholder: "Username",
                        value: values.username,
                        onChange: handleChange,
                      }}
                    />
                    {errors.username ? <p>{errors.username}</p> : null}
                  </div>
                  <div className="input-container login">
                    <FormItem
                      props={{
                        type: "password",
                        name: "password",
                        placeholder: "Password",
                        value: values.password,
                        onChange: handleChange,
                      }}
                    />
                    {errors.password ? <p>{errors.password}</p> : null}
                  </div>
                  <div className="bubbleChat">
                    <img src={logoCard} alt="bubbleChat" />
                    <img src={logoCard} alt="bubbleChat" />
                    <img src={logoCard} alt="bubbleChat" />
                  </div>
                  <button type="submit" className="btn-reg">
                    Go to chat
                  </button>
                  <span>
                    Don't have an account?{" "}
                    <span className="log" onClick={() => setLog(!log)}>
                      Sign up!
                    </span>{" "}
                  </span>
                </Form>
              )}
            </Formik>
          </div>
        </>
      )}
    </>
  );
}

export default Register;
