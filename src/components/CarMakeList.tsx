import React, { useState } from 'react';
import { useObserver } from 'mobx-react';
import { useStores } from '../stores/helpers/use-store';
import CarMake from './CarMake';
import Make from '../stores/data/car-makes/make';
import classes from './CarMakeList.module.css';

import { makeStyles } from '@material-ui/core/styles';
import {
  Table, TextField, Toolbar, TableSortLabel, Paper, InputAdornment,
  TableCell, TableContainer, TableBody, TableHead, TablePagination, TableRow
} from '@material-ui/core';
import { Search } from "@material-ui/icons";

const useStyles = makeStyles({
  pageContent: {
    padding: "25px 0px"
  },
  head: {
    fontWeight: "bold",
  },
});

function CarMakeList() {
  interface HeadCell {
    id: string;
    label: string;
    disableSorting: boolean
  }

  const headCells: HeadCell[] = [
    { id: 'id', label: 'Id', disableSorting: false },
    { id: 'name', label: 'Name', disableSorting: false },
    { id: 'abreviation', label: 'Abrv', disableSorting: false },
    { id: 'actions', label: 'Actions', disableSorting: true }
  ];

  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
  const [order, setOrder] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [filterFn, setFilterFn] = useState({ fn: (items: Make[]) => { return items } });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  const stableSort = (array: any, comparator: any) => {
    const stabilizedThis = array.map((el: any, index: any) => [el, index]);
    stabilizedThis.sort((a: any, b: any) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el: [Make, number]) => el[0]);
  }

  function getComparator(order: string, orderBy: string) {
    return order === 'desc'
      ? (a: any, b: any) => descendingComparator(a, b, orderBy)
      : (a: any, b: any) => -descendingComparator(a, b, orderBy)
  }

  function descendingComparator(a: any, b: any, orderBy: string) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const handleSearch = (e: { target: any; }) => {
    let target = e.target;
    setFilterFn({
      fn: (items: Make[]) => {
        if (target.value === "")
          return items;
        else
          return items.filter(x => x.name.toLowerCase().includes(target.value))
      }
    })
  }

  const makesAfterPagingAndSorting = () => {
    return stableSort(
      filterFn.fn(makeStore.allMakes),
      getComparator(order, orderBy)).slice(page * rowsPerPage, (page + 1) * rowsPerPage
      );
  }

  const handleSortRequest = (cellId: string) => {
    const isAsc = orderBy === cellId && order === "asc";
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(cellId);
  }

  const { dataStores: { makeStore } } = useStores();

  const classesMUI = useStyles();

  return useObserver(() => {
    return (
      <div className={classes.tableContainer}>
        <Paper className={classesMUI.pageContent}>
          <Toolbar>
            <TextField
              label="Search makes"
              variant="outlined"
              InputProps={{
                startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
              }}
              onChange={handleSearch}
            />

          </Toolbar>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {headCells.map(element => (
                    <TableCell
                      key={element.id}
                      className={classesMUI.head}
                      // @ts-ignore
                      sortDirection={orderBy === element.id ? order : false}
                      align={element.id === 'id' ? 'left' : 'right'}
                    >
                      { element.disableSorting
                        ? element.label
                        :
                        <TableSortLabel
                          active={orderBy === element.id}
                          // @ts-ignore
                          direction={orderBy === element.id ? order : "asc"}
                          onClick={() => handleSortRequest(element.id)}
                        >
                          {element.label}
                        </TableSortLabel>
                      }
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {makesAfterPagingAndSorting().map((make: Make) => <CarMake make={make} key={make.id} />)}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={pages}
            page={page}
            component="div"
            rowsPerPage={rowsPerPage}
            count={makeStore.allMakes.length}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </div >
    )
  })
}

export default CarMakeList;