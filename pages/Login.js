import styles from "@/styles/Login.module.css";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useRouter } from "next/router";

import axios from "axios";
import { UserRoles } from "./UserRoles";
import { useDispatch } from "react-redux";
import { storeUserData } from "./slices/UserSlice";

// function axiosPost(url = "", data = {}, conf = {}) {
//   return axios
//     .post(url, data, conf)
//     .then(function (response) {
//       console.log(response);
//       return response;
//     })
//     .catch(function (error) {
//       console.log(error);
//       return error;
//     });
// }

export default function Login() {
  const dispatch = useDispatch();

  const router = useRouter();
  const [usr, setUsr] = useState();
  const [psw, setPsw] = useState();

  const handleSubmit = async (event) => {
    console.log("handleSubmit");

    console.log("usr", usr);
    console.log("psw", psw);

    //------------------------------------------
    // // API endpoint where we send form data.
    const endpoint = "http://localhost:8080/air/loglog/login";
    

    // axiosPost(url,data,config)
    
    const token = `${usr}:${psw}`;
    const encodedToken = Buffer.from(token).toString("base64");
    let data = { username: usr, password: psw };
    let conf = { headers: { Authorization: "Basic " + encodedToken } };

    //  axiosPost(url = "", data = {}, conf = {}) {
    axios
      .post(endpoint, data, conf)
      .then(function (response) {
        console.log(response);

        dispatch(storeUserData(response.data));
        
        switch (response.data.role) {
          case UserRoles.ADMIN:
            router.push(`/admin/`);
            break;
          case UserRoles.SIMPLE:
            router.push(`/user`);
            break;
        }
      })
      .catch(function (error) {
        console.log(error);
        return error;
      });

  };

  return (
    <>
      <form>
        {/* <div className={`${styles["centerer"]} ${styles["borderer"]}`}> */}
        <div className={`${styles["form-container"]} `}>
          <h2>Log In</h2>
          <div>
            <TextField
              margin="normal"
              // required
              id="usr"
              label="UserName"
              defaultValue=""
              value={usr}
              onChange={(event) => {
                setUsr(event.target.value);
              }}
            />
          </div>
          <div>
            <TextField
              margin="normal"
              id="psw"
              label="Password"
              type="password"
              value={psw}
              onChange={(event) => {
                setPsw(event.target.value);
              }}
              // autoComplete="current-password"
              // variant="filled"
            />
          </div>
          <div>
            <Button variant="contained" color="success" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
