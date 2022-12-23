import * as yup from "yup";

export const logginSchema = yup.object({
  username: yup.string().required("Username is required").min(3, "To short!"),
  password: yup.string().required("Password is required").min(5, "To short!"),
});

export const signUpSchema = yup.object({
  username: yup.string().required("Username is required").min(3, "To short!"),
  email: yup
    .string()
    .email("Valid email is required")
    .required("Email is required"),

  password: yup.string().required("Password is required").min(5, "To short!"),
  confirmPass: yup
    .string()
    .required("Please retype your password.")
    .oneOf([yup.ref("password")], "Your passwords do not match."),
});
