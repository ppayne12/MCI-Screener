import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Collapse,
} from "@mui/material";
import theme from "../Theme";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Tooltip } from "@mui/material";
import { red, orange, yellow, green, blue } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import * as RulesEngine from "../Services/RulesEngine";
import Visualization from "./Visualization";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import Explanation from "./Explanation";

const LEVEL = [
  "No further action is suggested",
  "Review of patient records is suggested",
  "Follow-up clinical assessment is suggested",
  "Follow-up clinical assessment is strongly recommended",
];

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PatientCard(props) {
  const [expanded, setExpanded] = React.useState(false);
  //stores results of rules engine firing
  const [ruleResults, setRuleResults] = React.useState([]);
  const [level, setLevel] = React.useState(0);
  const [retest, setRetest] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleAdd = (newResults) => {
    setLevel(Math.max.apply(null, newResults));
    setRuleResults((ruleResults) => [...ruleResults, ...newResults]);
  };

  React.useEffect(() => {
    setRetest(RulesEngine.getRetestFlag(props.data));
    handleAdd(RulesEngine.runRankRules(props.data));
  }, [props.data]);

  const Avatars = () => {
    // Level 4 - Red – Clinical Assessment is strongly recommended
    // Level 3 - Orange – Clinical Assessment is suggested
    // Level 2 - Yellow – Review of patient records is suggested
    // Level 1 - Green – No further action is suggested
    // Rationale: Levels based on informal discussions with subject matter expert
    switch (level) {
      case 1:
        return (
          <Tooltip title={LEVEL[0]}>
            <Avatar sx={{ bgcolor: green[500] }} aria-label="indicator">
              {" "}
            </Avatar>
          </Tooltip>
        );
      case 2:
        return (
          <Tooltip title={LEVEL[1]}>
            <Avatar sx={{ bgcolor: yellow[500] }} aria-label="indicator">
              {" "}
            </Avatar>
          </Tooltip>
        );
      case 3:
        return (
          <Tooltip title={LEVEL[2]}>
            <Avatar sx={{ bgcolor: orange[500] }} aria-label="indicator">
              {" "}
            </Avatar>
          </Tooltip>
        );
      case 4:
        return (
          <Tooltip title={LEVEL[3]}>
            <Avatar sx={{ bgcolor: red[500] }} aria-label="indicator">
              {" "}
            </Avatar>
          </Tooltip>
        );
      default:
        return (
          <Avatar sx={{ bgcolor: blue[500] }} aria-label="indicator">
            {" "}
          </Avatar>
        );
    }
  };

  return (
    <Card sx={{ width: "400px" }}>
      <CardHeader
        avatar={<Avatars />}
        title={"Name: " + props.name}
        subheader={"Age: " + props.age}
        sx={{ bgcolor: theme.palette.secondary.main }}
        action={
          retest ? (
            <Tooltip title="Self Assessment Due">
              <AccessAlarmsIcon />
            </Tooltip>
          ) : (
            <></>
          )
        }
      />
      <CardContent>
        <Visualization data={props.data} />
      </CardContent>
      <CardActions disableSpacing>
        <Typography component={"span"} variant="subtitle2">
          Decision Support Rules
        </Typography>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ pb: "0px" }}>
          <Typography variant="h6" sx={level > 2 ? { fontWeight: "bold" } : ""}>
            {level === 4 ? <AnnouncementIcon sx={{ margin: "0 5px" }} /> : ""}{" "}
            {LEVEL[level - 1]}
          </Typography>
          <Typography variant="h6">
            <Explanation results={ruleResults} />
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {retest
              ? "** Note: Patient has not done a self assessment in 12 months **"
              : " "}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
