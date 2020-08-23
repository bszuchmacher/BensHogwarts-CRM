import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function AlertMessage(props) {
  const handleClose = () => {
    props.handleClose();
  };

  return (
    <Snackbar open={props.open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={props.severity}>
        {props.message}
      </Alert>
    </Snackbar>
  );
}

export default AlertMessage;
