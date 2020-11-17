import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function CategoriesList(props) {
  const classes = useStyles();

  const { allCategories, editCategory } = props;

  // console.log("allCategories", { allCategories, lenght: allCategories && allCategories.lenght > 0 ? allCategories[4] : "nada" });

  return allCategories && allCategories.length > 0 ? (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Subcategories</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allCategories.map(category => {
            if (!category.isActive) return;
            
            return (
              <TableRow key={category._id}>
                <TableCell component="th" scope="row">{category.name}</TableCell>
                <TableCell align="right"             >{category.description}</TableCell>
                <TableCell align="right"             >{Object.keys(category.subCategories).length}</TableCell>
                <TableCell align="right"             >
                  <EditIcon fontSize="small" onClick={() => editCategory(category)}/>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
      <h1>LOADING... CATEGORIES LIST</h1>
    );
}
