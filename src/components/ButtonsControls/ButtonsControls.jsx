import React from 'react';

import Box from '@material-ui/core/Box';

import FiltersControls from '../FiltersControls/FiltersControls';
import RadioButtonsGroup from '../RadioButtonsGroup/RadioButtonsGroup';
import SearchInput from '../SearchInput/SearchInput';

import './style.scss';

export default function ButtonsControls(props) {
  const {search, filter, handleChangeSearch, toggleShowFavorite,  changeFilterValue, showFavorite} = props

  return (
    <Box className="buttons-controls">
      <Box className="buttons-controls__row">
        <FiltersControls
          changeFilterValue={changeFilterValue}
          toggleShowFavorite={toggleShowFavorite}
          showFavorite={showFavorite}
          filter={filter}
        />
      </Box>
      <Box className="buttons-controls__row">
        <SearchInput search={search} handleChangeSearch={handleChangeSearch} />
        <RadioButtonsGroup className="buttons-controls__radio-group" />
      </Box>
    </Box>
  );
}
