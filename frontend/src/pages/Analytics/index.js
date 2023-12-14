import React, { useContext } from "react"

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography";

import useTickets from "../../hooks/useTickets"

import { AuthContext } from "../../context/Auth/AuthContext";

import { i18n } from "../../translate/i18n";

//import Chart from "./Chart"

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  fixedHeightPaper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: 240,
  },
  customFixedHeightPaper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: 120,
  },
  customFixedHeightPaperLg: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    height: "100%",
  },
}))

const Analytics = () => {
const classes = useStyles()

  return (
    <div>
	<Container>
	
	  <h4>Click en el botón para ir a la analítica</h4>
        <Button  href="https://lookerstudio.google.com/reporting/940084c8-52a8-4a6e-853e-58549c628e26" target="_blank" variant="contained">Analítica PMA</Button>&nbsp;&nbsp;&nbsp;
        <Button  href="https://lookerstudio.google.com/reporting/1420c76b-e248-4c0b-a7c6-f5f9a0b697e8" target="_blank" variant="contained">Analítica WAAC</Button>&nbsp;&nbsp;&nbsp;
        <Button  href="https://lookerstudio.google.com/reporting/03fd0bb4-62e2-4418-a39f-28df9704ae54" target="_blank" variant="contained">Analítica OPS</Button>&nbsp;&nbsp;&nbsp;
        <Button  href="https://datastudio.google.com/embed/reporting/44e693cc-2d22-4680-a4da-4a1eacbb461a/page/xnflC" target="_blank" variant="contained">Analítica Otros Bots</Button>
    </Container>
    </div>
  )
}

export default Analytics;
