import React, { useState, useEffect } from "react";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { deleteStudent } from "../lib/StudentAPI.js";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  openModalButton: {
    width: "100%",
  },
  paper: {
    backgroundColor: "red",
    border: "1px solid #adadad",
    borderRadius: 4,
    boxShadow: theme.shadows[5],
    padding: "0 10px 20px 10px",
  },
  description: {
    margin: 0,
  },
  deleteButton: {
    display: "block",
    marginTop: 20,
    width: "100%",
    
  },
}));

const theme = createMuiTheme({
  palette: { type: "dark" },
  typography: {
    fontFamily: `"Caveat", cursive`,
    fontSize: 17,
  },
});

function DeleteStudent(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [password, setPassword] = useState("");
  const [disableDeleteButton, setDisableDeleteButton] = useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  useEffect(() => {
    if (password.length > 0) {
      setDisableDeleteButton(false);
    } else {
      setDisableDeleteButton(true);
    }
  }, [password]);

  async function handleDelete(event) {
    event.preventDefault();
    let response = await deleteStudent(props.studentId, password);
    props.handleDelete(response);
    if (response.statusText === "OK") {
      handleClose();
    }
  }

  return (
    <div>
      <Button
        className={classes.enrollButton}
        variant="contained"
        className={classes.openModalButton}
        color="secondary"
        onClick={handleOpen}
      >
        Delete Student
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Delete</h2>
            <p className={classes.description}>
              * Secret password required to delete a student.
            </p>
            <ThemeProvider theme={theme}>
              <TextField
                id="standard-basic"
                label="Password"
                type="password"
                classname="paper"
                onChange={(event) => {
                  handlePassword(event);
                }}
              />
              <Button
                className={classes.deleteButton}
                variant="contained"
                disabled={disableDeleteButton}
                onClick={(event) => {
                  handleDelete(event);
                }}
              >
                Delete Student
              </Button>
            </ThemeProvider>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default withRouter(DeleteStudent);
