import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import theme from "../Theme";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import Visualization from "./Visualization";

export default function PatientCard(props) {
  // const graphWidth = 250 + props.data.length * 50 + "px";
  const graphWidth = 400;

  return (
    <Card sx={{ minWidth: graphWidth }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="indicator">
            {" "}
          </Avatar>
        }
        title={"Name: " + props.name}
        subheader={"Age: " + props.age}
        sx={{ bgcolor: theme.palette.secondary.main }}
      />
      <CardContent>
        <Visualization data={props.data} />
      </CardContent>
    </Card>
  );
}
