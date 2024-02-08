import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuth } from "../Auth/authProvider";
import Card from "@mui/material/Card";
import { useEffect, useState } from "react";
import "./Styles/OpenDoor.css";
import LogoutIcon from "@mui/icons-material/Logout";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import axios from "axios";
import PinInput from "react-pin-input";
import Alert from "@mui/material/Alert";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const backendRoute = process.env.REACT_APP_BACKEND_ROUTE;

export default function OpenDoor() {
  const { user, clearAuthData, jwtToken } = useAuth();

  const [otp, setOtp] = useState("");
  const [pinMessage, setPinMessage] = useState("");
  const [pinError, setPinError] = useState(false);

  const handleChange = (newValue: any, index: any) => {
    setOtp(newValue);
  };

  const handleLogout = () => {
    clearAuthData();
  };

  const handleOpenDoor = () => {
    const postData = {
      username: user,
      pin: otp,
    };
    axios
      .post(backendRoute + "/opendoor", JSON.stringify(postData), {
        headers: {
          "Content-Type": "application/json",
          //Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then(function (response) {
        setPinError(!response.data.success);
        setPinMessage(response.data.message);
      })
      .catch(function (error) {
        setPinError(!error.data.success);
        setPinMessage(error.data.message);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="openDoorContainer">
        <CssBaseline />
        <div className="cardContainer">
          <Card className="card" sx={{ borderRadius: "2vh" }}>
            <div className="cardArea">
              <div className="row">
                <div className="instructionText">
                  <h1>{user}</h1>
                  <p>Enter your 4-digit door pin</p>
                </div>
              </div>
              <div className="authRow">
                <PinInput
                  length={4}
                  initialValue=""
                  secret
                  secretDelay={100}
                  onChange={(value, index) => {
                    handleChange(value, index);
                  }}
                  type="numeric"
                  inputMode="number"
                  style={{ padding: "10px" }}
                  inputStyle={{ borderColor: "grey" }}
                  inputFocusStyle={{ borderColor: "blue" }}
                  onComplete={(value, index) => {}}
                  autoSelect={true}
                  regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                />
                {pinMessage.length > 0 && (
                  <Alert
                    style={{ width: "65%" }}
                    severity={pinError ? "error" : "success"}
                  >
                    {pinMessage}
                  </Alert>
                )}
              </div>
              <div className="buttonRow" style={{ marginTop: "-5vh" }}>
                <Button
                  variant="outlined"
                  startIcon={<LogoutIcon />}
                  color="error"
                  className="submitButton"
                  size="small"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
                <Button
                  variant="outlined"
                  endIcon={<MeetingRoomIcon />}
                  size="small"
                  className="submitButton"
                  onClick={handleOpenDoor}
                >
                  Open
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  );
}
