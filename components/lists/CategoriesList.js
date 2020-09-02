import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function CategoriesList(props) {
  const classes = useStyles();

  const { allCategories } = props;

  console.log("allCategories", { lenght: allCategories.length, allCategories });

  return allCategories && allCategories.length > 0 ? (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Subcategories</TableCell>
            <TableCell align="right">Pictures</TableCell>
            <TableCell align="right">Files</TableCell>
            <TableCell align="right">Active</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allCategories.map((category) => (
            <TableRow key={category.name}>
              <TableCell component="th" scope="row">
                {category.name}
              </TableCell>
              <TableCell align="right">{category.description}</TableCell>
              <TableCell align="right">{category.subCategories.lenght}</TableCell>
              <TableCell align="right">{category.pictures.lenght}</TableCell>
              <TableCell align="right">{category.files.lenght}</TableCell>
              <TableCell align="right">{category.isActive}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
      <h1>LOADING...</h1>
    );
}
