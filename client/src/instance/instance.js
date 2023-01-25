import axios from "axios";

export const auth_instance = (token) => {
  // used like this: auth_instance(res.data).get("/log/user/").then((res) => console.log(res.data));  // sends the request but with the authorization header with access_token
  return axios.create({
    baseURL: "http://localhost:3001",
    headers: {
      accept: "/", //acá le digo que acepte todas las solicitudes
      "Content-Type": "application/json", //que acepte json
      Authorization: `Bearer ${token ? token : localStorage.getItem("token")}`,
    },
  });
};

export const instance = "http://localhost:3001";
