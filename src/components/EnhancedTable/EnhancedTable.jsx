import React from "react";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import ButtonsControls from "../ButtonsControls/ButtonsControls";
import { getComparator, stableSort } from "../../utils/helpers";

import "./style.scss";

const headCells = [
  { id: "pair", numeric: false, disablePadding: true, label: "Pair" },
  {
    id: "lastPrice",
    numeric: true,
    disablePadding: false,
    label: "Last Price",
  },
  { id: "change", numeric: true, disablePadding: false, label: "Change" },
];

const EnhancedTableHead = ({ order, orderBy, onRequestSort }) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox disabled />
        </TableCell>
        {headCells.map(({ id, numeric, disablePadding, label }) => (
          <TableCell
            key={id}
            align={numeric ? "right" : "left"}
            padding={disablePadding ? "none" : "default"}
            sortDirection={orderBy === id ? order : false}
          >
            <TableSortLabel
              active={orderBy === id}
              direction={orderBy === id ? order : "asc"}
              onClick={createSortHandler(id)}
            >
              {label}
              {orderBy === id ? (
                <span className="visuallyHidden">
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const EnhancedTableToolbar = ({
  search,
  filter,
  handleChangeSearch,
  toggleShowFavorite,
  changeFilterValue,
  showFavorite,
}) => {
  return (
    <Toolbar className="tool-bar">
      <Typography
        className="tool-bar__title"
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Информация
      </Typography>
      <ButtonsControls
        search={search}
        filter={filter}
        handleChangeSearch={handleChangeSearch}
        changeFilterValue={changeFilterValue}
        toggleShowFavorite={toggleShowFavorite}
        showFavorite={showFavorite}
      />
    </Toolbar>
  );
};

export default function EnhancedTable(props) {
  const {
    handleChangeSearch,
    changeFilterValue,
    handleToggleElement,
    toggleShowFavorite,
    isFavorite,
    search,
    showFavorite,
    priceData,
    filter,
  } = props;

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const rows = priceData;

  const handleRequestSort = (_, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className="enhanced-table">
      <Paper className="enhanced-table__paper">
        <EnhancedTableToolbar
          search={search}
          filter={filter}
          handleChangeSearch={handleChangeSearch}
          changeFilterValue={changeFilterValue}
          toggleShowFavorite={toggleShowFavorite}
          showFavorite={showFavorite}
        />
        <TableContainer className="enhanced-table__container">
          <Table
            className="enhanced-table__table"
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleToggleElement(event, row.id)}
                      role="checkbox"
                      tabIndex={-1}
                      key={row.id}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isFavorite(row.id)}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.pair}
                      </TableCell>
                      <TableCell align="right">{row.lastPrice}</TableCell>
                      <TableCell align="right">{`${row.change}%`}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}
