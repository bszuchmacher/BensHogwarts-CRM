import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    margin: "10px 0 10px 0",
  },
}));

function Field(props) {
  const classes = useStyles();
  let [fieldValue, setFieldValue] = useState();

  function handleInput(event) {
    setFieldValue(event.target.value);
  }

  useEffect(() => {
    props.handleInput(fieldValue);
  }, [fieldValue]);

  return (
    <>
      <TextField
        className={classes.root}
        onChange={(event) => {
          handleInput(event);
        }}
        value={props.value}
        label={props.label}
        variant="outlined"
      />
    </>
  );
}

export default Field;
