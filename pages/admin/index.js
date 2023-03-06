import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

import axios from "axios";

import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// import { setFlightRequest } from "./slices/UserSlice";
import { setFlightRequest } from "../slices/userSlice";
import FlightUserDto from "../components/FlightUserDto";
import UserForm from "../components/UserForm";

const Admin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { userData } = useSelector((state) => state.userDataReducer);
  console.log("userData", userData);

  const [flights, setFlights] = useState([]);
  const [userForm, setUserForm] = useState(false);
  const [buttonMsg, setButtonMsg] = useState("USER FORM");

  const getFlightApplications = (page = 0, size = 5) => {
    // const endpoint = `http://localhost:8080/air/connect/admin/page/all?page=${page}&size=${size}`;
    const endpoint = `http://localhost:8080/air/connect/admin/all`;

    const token = `${userData.usr}:${userData.psw}`;
    const encodedToken = Buffer.from(token).toString("base64");
    let conf = { headers: { Authorization: "Basic " + encodedToken } };
    axios
      .get(endpoint, conf)
      .then(function (response) {
        console.log(response);
        setFlights(response.data);
        dispatch(setFlightRequest(response.data));
      })
      .catch(function (error) {
        console.log(error);
        console.log(error.response.status);
      });
  };

  useEffect(() => {
    if (!userData.usr) router.replace("/Login");
    else {
      getFlightApplications();
    }
  }, []);

  return (
    <div>
      {/* <Head>Admin page</Head> */}
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              {/* <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
              </IconButton> */}
              <Button 
              variant="contained"
              sx={{color:"red", bgcolor:"yellow"}}
                onClick={() => {
                  setUserForm((uf) => (uf = !uf));
                  console.log("userForm",userForm);
                }}
              >
                {buttonMsg}
              </Button>
              <Divider orientation="vertical" sx={{marginRight:"3em"}} />
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <small>role:</small> {userData.role}
              </Typography>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <small>name:</small>
                {userData.fname}
              </Typography>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <small>remaining flights:</small> {userData.remainingFlights}
              </Typography>
              <Button
                color="inherit"
                onClick={() => {
                  router.push("/Logout");
                }}
              >
                Logout
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      </div>
      <div>
      {  !userForm? <FlightUserDto />
        : <UserForm />}
      </div>
    </div>
  );
};

export default Admin;
