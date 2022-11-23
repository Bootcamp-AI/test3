import React, { useState, useContext } from "react";
import Button from "@material-ui/core/Button";


import { Link as RouterLink } from "react-router-dom";
import {
  CssBaseline,
  Container,

} from '@material-ui/core';


import { makeStyles } from "@material-ui/core/styles";

import { AuthContext } from "../../context/Auth/AuthContext";




const Bot = () => {



  return (
	<div>	
    <Container>
      
        <h4>Click en el botón para ir Dialogflow</h4>
        <Button variant="contained"  href="https://dialogflow.cloud.google.com/" target="_blank">Ir a Dialogflow</Button>
      
    </Container>
	</div>
  );
};

export default Bot;

