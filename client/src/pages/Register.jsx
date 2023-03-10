import React from "react";
import axios from "axios";
import Nav from "../components/Nav";
import { useState } from "react";
import { Formik, Form } from "formik";
import FormItem from "../components/FormIitem";
import logoCard from "../assets/logo-chat.png";
import { logginSchema, signUpSchema } from "../utils/logginSchema";
import { useNavigate } from "react-router-dom";
import { instance } from "../instance/instance";
function Register({ props }) {
  const [log, setLog] = useState(props);

  const navigate = useNavigate();

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
              onSubmit={async (values, actions) => {
                await axios
                  .post(`${instance}/log/register`, values)
                  .then((res) => {
                    localStorage.setItem("token", res.data);
                    return res.status === 200 //-> res.data = access token with signed info
                      ? // useAuth to start sending http req with access token because is oficially logged after registration
                        navigate(`/avatar/${res.data}`) // -> nice, now API returns a token so decode that from the server and you will get the id
                      : null;
                  });
                actions.resetForm();
              }}
            >
              {({ handleChange, values, errors, touched }) => (
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
                    {touched.username && errors.username ? (
                      <p>{errors.username}</p>
                    ) : null}
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
                    {touched.email && errors.email ? (
                      <p>{errors.email}</p>
                    ) : null}
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
                    {touched.password && errors.password ? (
                      <p>{errors.password}</p>
                    ) : null}
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
                    {touched.password && errors.confirmPass ? (
                      <p>{errors.confirmPass}</p>
                    ) : null}
                  </div>
                  <button type="submit" className="btn-reg">
                    Select avatar
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
                axios.post(`${instance}/log/login`, values).then((res) => {
                  localStorage.setItem("token", res.data);
                  return res.status === 200 //-> res.data = access token with signed info
                    ? // useAuth to start sending http req with access token because is oficially logged after registration
                      navigate(`/chat`) // -> nice, now API returns a token so decode that from the server and you will get the id
                    : null;
                });
                actions.resetForm();
              }}
            >
              {({ handleChange, values, errors, touched }) => (
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
                    {touched.username && errors.username ? (
                      <p>{errors.username}</p>
                    ) : null}
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
                    {touched.password && errors.password ? (
                      <p>{errors.password}</p>
                    ) : null}
                  </div>
                  <div className="bubbleChat">
                    <img src={logoCard} alt="bubbleChat" />
                    <img src={logoCard} alt="bubbleChat" />
                    <img src={logoCard} alt="bubbleChat" />
                  </div>
                  <button type="submit" className="btn-reg">
                    Select avatar
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
