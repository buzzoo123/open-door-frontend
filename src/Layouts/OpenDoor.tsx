import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuth } from "../Auth/authProvider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useEffect, useState } from "react";
import "./Styles/OpenDoor.css";
import { MuiOtpInput } from "mui-one-time-password-input";
import { borders } from "@mui/system";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function OpenDoor() {
  const { user } = useAuth();

  const [otp, setOtp] = useState("");

  const handleChange = (newValue: any) => {
    setOtp(newValue);
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
                  <p>Enter the code sent to your phone</p>
                </div>
              </div>
              <div className="authRow">
                <MuiOtpInput value={otp} onChange={handleChange} length={6} />
              </div>
              <div className="row">
                <Button className="submitButton">Open Door</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  );
}
