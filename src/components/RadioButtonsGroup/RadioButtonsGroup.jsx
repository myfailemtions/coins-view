import React from "react";

import cn from "classnames";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import "./style.scss";

export default function RadioButtonsGroup({ className }) {
  return (
    <RadioGroup
      className={cn("RadioButtonGroup", className)}
      row
      aria-label="position"
      name="position"
      defaultValue="change"
    >
      <FormControlLabel
        className="MuiFormControlLabel-root"
        value="change"
        control={<Radio color="primary" />}
        label="Change"
      />
      <FormControlLabel
        value="volume"
        control={<Radio color="primary" />}
        label="Volume"
      />
    </RadioGroup>
  );
}
