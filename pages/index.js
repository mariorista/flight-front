import styles from "@/styles/Login.module.css";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

import axios from "axios";

async function axiosPost(url = "", data = {}, conf = {}) {
  axios
    .post(url, data, conf)
    .then(function (response) {
      console.log(response);
      return response;
    })
    .catch(function (error) {
      console.log(error);
      return error;
    });
}

export default function Home() {
  const [usr, setUsr] = useState();
  const [psw, setPsw] = useState();

  //TODO validate fields
  //TODO send to back to confirm
  //TODO awayt response and on type send to user or admin page

  const handleSubmit = async (event) => {
    console.log("handleSubmit");

    console.log("usr", usr);
    console.log("psw", psw);

    // // Send the data to the server in JSON format.
    // const JSONdata = JSON.stringify(data);

    // // API endpoint where we send form data.
    const endpoint = "http://localhost:8080/r1/p1";

    let ret = axiosPost("http://localhost:8080/r1/p1", {
      username: usr,
      password: psw,
    });

    // // Form the request for sending data to the server.
    // const options = {
    //   // The method is POST because we are sending data.
    //   method: "POST",
    //   // Tell the server we're sending JSON.
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   // Body of the request is the JSON data we created above.
    //   body:{pojo: {"username":usr, "password":psw}},
    // };

    // console.log(options);
    // // Send the form data to our forms API on Vercel and get a response.
    // const response = await fetch(endpoint, options);

    // // Get the response data from server as JSON.
    // // If server returns the name submitted, that means the form works.
    // const result = await response.json();
    // alert(`Is this your full name: ${result.data}`);
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
