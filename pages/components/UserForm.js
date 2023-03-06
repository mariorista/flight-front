import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { FormControl, MenuItem, Select, TextField, Typography } from "@mui/material";

// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const UserForm = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const [fname, setFname] = React.useState();
  const [lname, setLname] = React.useState();
  const [email, setEmail] = React.useState();

  const [usr, setUsr] = React.useState();
  const [psw, setPsw] = React.useState();

  const [bdate, setBdate] = React.useState();
  const [role, setRole] = React.useState();

  return (
    <div style={{ width: "60%" }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={6}>
          <Item>
            <Typography>First Name</Typography>
          </Item>
        </Grid>
        <Grid xs={6}>
          <Item>
            <TextField
              //   margin="dense"
              color="success"
              value={fname}
              onChange={(e) => {
                setFname(e.target.value);
              }}
            />
          </Item>
        </Grid>

        <Grid xs={6}>
          <Item>Last Name</Item>
        </Grid>
        <Grid xs={6}>
          <Item>
            <TextField
              margin="dense"
              color="success"
              value={lname}
              onChange={(e) => {
                setLname(e.target.value);
              }}
            />
          </Item>
        </Grid>

        <Grid xs={6}>
          <Item>Email</Item>
        </Grid>
        <Grid xs={6}>
          <Item>
            <TextField
              margin="dense"
              color="success"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Item>
        </Grid>

        <Grid xs={6}>
          <Item>Username</Item>
        </Grid>
        <Grid xs={6}>
          <Item>
            <TextField
              margin="dense"
              color="success"
              value={usr}
              onChange={(e) => {
                setUsr(e.target.value);
              }}
            />
          </Item>
        </Grid>

        <Grid xs={6}>
          <Item>Password</Item>
        </Grid>
        <Grid xs={6}>
          <Item>
            <TextField
              margin="dense"
              color="success"
              value={psw}
              onChange={(e) => {
                setPsw(e.target.value);
              }}
            />
          </Item>
        </Grid>

        <Grid xs={6}>
          <Item>BDate</Item>
        </Grid>
        <Grid xs={6}>
          <Item>
            <TextField
              margin="dense"
              color="success"
              value={bdate}
              onChange={(e) => {
                setBdate(e);
              }}
            />
          </Item>
        </Grid>

        <Grid xs={6}>
          <Item>Role</Item>
        </Grid>
        <Grid xs={6}>
          <Item>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">status</InputLabel>
              <Select
                disabled={row === ""}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                label="status"S
                onChange={(r) => setRole(r)}
              >
                <MenuItem value={"APPROVED"}>APPROVED</MenuItem>
                <MenuItem value={"DENIED"}>DENIED</MenuItem>
              </Select>
            </FormControl>
          </Item>
        </Grid>
        <Grid xs={6}>
          <Item>7</Item>
        </Grid>
        <Grid xs={6}>
          <Item>8</Item>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserForm;
