import React, { useState, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  CssBaseline,
  Container,

} from '@material-ui/core';


import { makeStyles } from "@material-ui/core/styles";

import { AuthContext } from "../../context/Auth/AuthContext";




const Analytics = () => {



  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
	<div>
      <iframe width="600" height="450" src="https://datastudio.google.com/embed/reporting/44e693cc-2d22-4680-a4da-4a1eacbb461a/page/xnflC" 
      frameborder="0" style="border:0" allowfullscreen></iframe>
	</div>
    </Container>
  );
};

export default Analytics;

