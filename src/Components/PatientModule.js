import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const PatientModule = (props) => {
  return (
    <>
      <Box sx={{ flexGrow: 1, textAlign: "center", mt: "50px", pb: "50vh" }}>
        <Typography
          variant="h2"
          sx={{ m: "10px", fontStyle: "italic", fontWeight: "light" }}
        >
          Web-based implementation of the SATURN self-assessment tool to be done
          as part of potential future research.
        </Typography>
      </Box>
    </>
  );
};

export default PatientModule;
