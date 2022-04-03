import React from "react";
import Typography from "@mui/material/Typography";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
} from "recharts";

const Visualization = (props) => {
  if (props.data.length === 1) {
    return (
      <>
        <Typography variant="h6">
          <span style={{ fontWeight: 600 }}>Self-Assessment Date: </span>
          {" " + props.data[0].date}
        </Typography>
        <Typography variant="h6">
          <span style={{ fontWeight: 600 }}>Results: </span>
          {" " + props.data[0].Results + " / 30"}
        </Typography>
        <Typography variant="h6">
          <span style={{ fontWeight: 600 }}>Time to Complete: </span>
          {" " + props.data[0]["Time to Complete"] + " minutes"}
        </Typography>
      </>
    );
  } else {
    return (
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <ComposedChart
            width={600}
            height={400}
            data={props.data}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="date" scale="band" />
            <YAxis type="number" tickCount={15} domain={[0, 30]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Results" barSize={20} fill="#e9c46a" />
            <Line type="monotone" dataKey="Time to Complete" stroke="#023047" />
            <ReferenceLine y={24} stroke="orange" strokeDasharray="3 3" />
            <ReferenceLine
              y={21}
              stroke="red"
              strokeDasharray="3 3"
              strokeWidth={2}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    );
  }
};

export default Visualization;
