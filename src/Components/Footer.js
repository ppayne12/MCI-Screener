import * as React from "react";
import { Container, Grid, Typography, Link } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";

const icons = {
  margin: "0 5px",
  color: "#a5a58d",
};

const Copyright = () => {
  return (
    <React.Fragment>
      {"© "}
      <Link color="inherit" href="http://www.paulpayne.ca">
        Paul Payne
      </Link>{" "}
      {new Date().getFullYear()}
    </React.Fragment>
  );
};

const Footer = () => {
  return (
    <footer>
      <Container>
        <Grid container alignItems="center" justifyContent="center">
          <Link href="mailto:ppayne@uvic.ca">
            <MailIcon sx={icons} fontSize="medium" />
          </Link>
          <Link href="https://github.com/ppayne12" target="_blank">
            <GitHubIcon sx={icons} fontSize="medium" />
          </Link>
          <Link href="https://twitter.com/tallpaulpayne" target="_blank">
            <TwitterIcon sx={icons} fontSize="medium" />
          </Link>
        </Grid>
        <Typography variant="subtitle1" align="center">
          <Copyright />
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
