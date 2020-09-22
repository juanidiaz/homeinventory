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

export default function SubCategoriesList(props) {
  const classes = useStyles();

  const { allSubCategories } = props;

  // console.log("allSubCategories", { allSubCategories, lenght: allSubCategories && allSubCategories.lenght > 0 ? allSubCategories[4] : "nada" });

  return allSubCategories && allSubCategories.length > 0 ? (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allSubCategories.map(subCategory => {
            // console.log("subCategory", Object.keys(subCategory.subCategories).length);
            return (
              <TableRow key={subCategory._id}>
                <TableCell component="th" scope="row">{subCategory.name}</TableCell>
                <TableCell align="right"             >{subCategory.description}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
      <h1>LOADING...</h1>
    );
}
