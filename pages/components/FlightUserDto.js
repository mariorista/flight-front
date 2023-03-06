import { DataGrid } from "@mui/x-data-grid";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Collapse,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setFlightRequest } from "../slices/userSlice";

const FlightUserDto = () => {
  console.log("in FlightUserDto");

  const { userData } = useSelector((state) => state.userDataReducer);
  const { flightRequest } = useSelector((state) => state.userDataReducer);
  const dispatch = useDispatch();

  const [row, setRow] = useState("");
  const [status, setStatus] = useState("APPROVED");
  const [notes, setNotes] = useState("");
  const [open, setOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState(
    "You must enter notes in case of denied application!!"
  );

  let rowsShowFlights = [];
  for (let f in flightRequest) {
    // console.log(f,":",flights[f])
    let fl = flightRequest[f].flight;
    let fu = flightRequest[f].fuc;
    let showObj = {
      dep: fl.departure,
      dest: fl.destination,
      depDat: fl.departurDate,
      depTim: fl.departureTime,
      flCl: fu.flightClass,
      price: fu.price,
      status: fu.status,
      uid: fu.id.userId,
      fid: fl.flightId,
      id: f,
    };
    rowsShowFlights.push(showObj);
  }

  const columns = [
    {
      field: "dep",
      headerName: "departure",
      //   width: 250,
      // editable: true,
    },
    { field: "dest", headerName: "destination" },
    { field: "depDat", headerName: "departurDate" },
    { field: "depTim", headerName: "departureTime" },
    { field: "flCl", headerName: "flightClass" },
    { field: "price", headerName: "price" },
    { field: "status", headerName: "status" },
    // { field: "uid", headerName: "uid" },
  ];
  // const rows;
  const chosen = (e) => {
    console.log(e.row);
    setRow(e.row);
  };

  const handleChange = (event) => {
    setStatus(event.target.value);
    // row.status = event.target.value;
    console.log(row);
  };

  const changeNotes = (e) => {
    console.log(e);
    console.log(e.target.value);
    setNotes(e.target.value);
  };

  const confirmStatus = () => {
    if (
      row.status === "APPROVED" ||
      row.status === "DENIED" ||
      row.status === "CANCELLED"
    ) {
      setAlertMsg("Status is set on this request it can not ne changed");
      setOpen(true);
      return;
    }

    let endpoint;
    if (status === "APPROVED")
      endpoint = "http://localhost:8080/air/user/admin/approveflightrequest";
    if (status === "DENIED") {
      endpoint = "http://localhost:8080/air/user/admin/denyflightrequest";
      if (!notes) {
        setOpen(true);
        setAlertMsg("You must enter notes in case of denied application!!");
        return;
      } else {
        setOpen(false);
      }
    }

    const token = `${userData.usr}:${userData.psw}`;
    const encodedToken = Buffer.from(token).toString("base64");
    let conf = { headers: { Authorization: "Basic " + encodedToken } };

    const flightActionPojo = {
      userId: row.uid,
      flightId: row.fid,
      flightClass: row.flCl,
      price: row.price,
      reason: notes,
    };
    axios
      .post(endpoint, flightActionPojo, conf)
      .then(function (response) {
        console.log(response);
        getFlightApplications();
        // flightRequest[row.id].fuc.status = status;

        // dispatch(
        //   setFlightRequest({ idx: row.id, notes: notes, status: status })
        // );
        // {notes:notes, status:status}
        // useDispatch(updateUserData( ));
      })
      .catch(function (error) {
        console.log(error);
        setOpen(true);
        setAlertMsg( error.message);
        return error;
      });
  };



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
        dispatch(setFlightRequest(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <h3>
        {" "}
        datagrid with Dto + a form to show slected dto + functionality for
        pagination
      </h3>
      <div style={{ display: "flex", width: "100%" }}>
        <div>
          <Box sx={{ height: 450, width: "100%", backgroundColor: "ivory" }}>
            <DataGrid
              getRowId={(row) => row.id}
              onRowClick={(e) => chosen(e)}
              // onRowDoubleClick={(e) => openAlert(e)}
              columns={columns}
              rows={rowsShowFlights}
              initialState={{
                // ...data.initialState,
                pagination: { paginationModel: { pageSize: 5 } },
              }}
              pageSizeOptions={[5, 10, 25]}
            />
          </Box>
        </div>
        <div style={{ width: "40%" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">status</InputLabel>
            <Select
              disabled={row === ""}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label="status"
              onChange={handleChange}
            >
              <MenuItem value={"APPROVED"}>APPROVED</MenuItem>
              <MenuItem value={"DENIED"}>DENIED</MenuItem>
            </Select>
          </FormControl>
          <TextField
            disabled={row === ""}
            required={status === "DENIED"}
            margin="dense"
            color={status === "DENIED" ? "warning" : "success"}
            value={notes}
            onChange={changeNotes}
            // onChange={(event) => {
            //   setName(event.target.value);            }}
            fullWidth
            id="standard-basic"
            label="Notes"
            variant="filled"
            placeholder="in case of denied flight request"
          />
          <Box>
            {JSON.stringify(row)}
            <Button
              disabled={row === ""}
              variant="contained"
              onClick={confirmStatus}
            >
              Confirm
            </Button>
          </Box>
        </div>
      </div>

      <div>
        <Collapse in={open}>
          <Alert
            variant="outlined"
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                {/* <CloseIcon fontSize="inherit" /> */}
              </IconButton>
            }
            sx={{ mb: 2 }} 
          >
            {alertMsg}
          </Alert>
        </Collapse>
      </div>
    </div>
  );
};

export default FlightUserDto;
