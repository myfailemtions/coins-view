import React from 'react';

import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

import './style.scss';

const getClassForButton = (state, value) => {
  return state === value ? "primary" : "default"
}

export default function FiltersControls(props) {
  const {filter, changeFilterValue, toggleShowFavorite, showFavorite} = props

  const handleChangeButton = (event) => {
    const value = event.target.innerText
    changeFilterValue(value)
  };

  const handleChangeSelect = (event) => {
    const value = event.target.value
    changeFilterValue(value)
  };

  return (
    <Box className="filters-controls">
      <IconButton onClick={toggleShowFavorite} className="filters-controls__favorite"  color="secondary" aria-label="favorites">
        {showFavorite ? <BookmarkIcon color="secondary" /> :  <BookmarkBorderIcon color="secondary" />}
      </IconButton>
      <ButtonGroup className="filters-controls__buttons-group" disableElevation size="small" variant="contained">
        <Button color={getClassForButton(filter, 'BNB')} onClick={handleChangeButton}>BNB</Button>
        <Button color={getClassForButton(filter, 'BTC')} onClick={handleChangeButton}>BTC</Button>
      </ButtonGroup>
      <Box className="filters-controls__selects-group">
        <FormControl className="filters-controls__select">
          <InputLabel id="alts-select-label">ALTS</InputLabel>
          <Select
            labelId="alts-select-label"
            id="alts-select"
            value={filter}
            onChange={handleChangeSelect}
          >
            <MenuItem value={'ETH'}>ETH</MenuItem>
            <MenuItem value={'TRX'}>TRX</MenuItem>
            <MenuItem value={'XPR'}>XPR</MenuItem>
          </Select>
        </FormControl>
        <FormControl className="filters-controls__select">
          <InputLabel id="usds-select-label">USDS</InputLabel>
          <Select
            labelId="usds-select-label"
            id="usds-select"
            value={filter}
            onChange={handleChangeSelect}
          >
            <MenuItem value={'USDT'}>USDT</MenuItem>
            <MenuItem value={'EUR'}>EUR</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}
