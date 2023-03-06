import styles from "@/styles/Login.module.css";
import { Button } from "@mui/material";

import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { storeUserData } from "./slices/UserSlice";

export default function Logout() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (event) => {
    const endpoint = "http://localhost:8080/air/logout";
    console.log("handleSubmit");
    axios
      .get(endpoint)
      .then(function (response) {
        console.log(response);
        console.log("ivalidate everything");
        clearStoredData();
        router.push("/Login");
      })
      .catch(function (error) {
        console.log(error);
        console.log(error.response.status);
        if (error.response.status == 401) {
          console.log("ivalidate everything");
          clearStoredData();
          router.push("/Login");
        }
      });
  };

  const clearStoredData = () => {
    dispatch(storeUserData(null));
  };

  return (
    <>
      <form>
        {/* <div className={`${styles["centerer"]} ${styles["borderer"]}`}> */}
        <div className={`${styles["form-container"]} `}>
          <Button variant="contained" color="success" onClick={handleSubmit}>
            LOG OUT
          </Button>
        </div>
      </form>
    </>
  );
}
