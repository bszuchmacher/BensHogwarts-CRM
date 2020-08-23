import React, { useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "100%",
    margin: "10px 0 10px 0",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 5,
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const magicSkills = [
  "Potion making",
  "Spells",
  "Quidditch",
  "Animagus",
  "Apparate",
  "Metamorphmagi",
  "Parseltongue (talking with snakes)",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function MagicSkills(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [skills, setSkills] = React.useState([]);

  const handleChange = (event) => {
    setSkills(event.target.value);
  };

  useEffect(() => {
    props.handleSkills(skills);
  }, [skills]);

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="magic-skills">Existing Magic Skills</InputLabel>
        <Select
          labelId="magic-skills"
          id="magic-skills"
          multiple
          value={props.skills}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {magicSkills.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, skills, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default MagicSkills;
