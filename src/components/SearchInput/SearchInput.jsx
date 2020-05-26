import React from "react";

import TextField from "@material-ui/core/TextField";

export default function SearchInput({ className, search, handleChangeSearch }) {
  return (
    <div className={className}>
      <TextField
        id="outlined-basic"
        size="small"
        label="Search"
        defaultValue={search}
        onChange={handleChangeSearch}
        variant="outlined"
      />
    </div>
  );
}
