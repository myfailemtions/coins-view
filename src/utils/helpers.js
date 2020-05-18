function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

function getNumberOfSimbolsAfterComma(x) {
  return ( (x.toString().includes('.')) ? (x.toString().split('.').pop().length) : (0) )
}

function formatLastPrice(value) {
  let numberOfSimbolsAfterComma = getNumberOfSimbolsAfterComma(value);
  numberOfSimbolsAfterComma = numberOfSimbolsAfterComma > 8 ? 8 : numberOfSimbolsAfterComma;
  return numberOfSimbolsAfterComma > 0 ? value.toFixed(numberOfSimbolsAfterComma) : value;
}



export { getComparator, stableSort, descendingComparator, formatLastPrice }
