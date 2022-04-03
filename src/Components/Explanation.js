import * as React from "react";
import { List, ListItem } from "@mui/material";
export default function Explanation(props) {
  return (
    <List>
      {props.results[0] === 4 ? (
        <ListItem sx={{ display: "list-item" }}>SATURN Score below 21</ListItem>
      ) : props.results[0] === 3 ? (
        <ListItem sx={{ display: "list-item" }}>
          SATURN score between 21-24
        </ListItem>
      ) : (
        ""
      )}
      {props.results[1] === 2 ? (
        <ListItem sx={{ display: "list-item" }}>
          Reading speed is in the lower quartile
        </ListItem>
      ) : (
        ""
      )}
      {props.results[2] === 2 ? (
        <ListItem sx={{ display: "list-item" }}>
          Later test score is lower than the previous test score
        </ListItem>
      ) : (
        ""
      )}
      {props.results[3] === 2 ? (
        <ListItem sx={{ display: "list-item" }}>
          Test time is &gt; higher than a previous test
        </ListItem>
      ) : (
        ""
      )}
      {props.results[4] === 2 ? (
        <ListItem sx={{ display: "list-item" }}>
          Visuospatial scores are in the lower quartile
        </ListItem>
      ) : (
        ""
      )}
      {props.results[5] === 2 ? (
        <ListItem sx={{ display: "list-item" }}>
          Time spent on the recall 5 words task is in the upper quartile
        </ListItem>
      ) : (
        ""
      )}
    </List>
  );
}
