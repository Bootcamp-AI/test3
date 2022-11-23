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
        <Button  href="https://datastudio.google.com/embed/reporting/44e693cc-2d22-4680-a4da-4a1eacbb461a/page/xnflC" target="_blank" variant="contained">Ir a la Analítica</Button>
      </Container>
    </div>
  )
}

export default Analytics;
