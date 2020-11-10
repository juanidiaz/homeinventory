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

export default function CompaniesList(props) {
  const classes = useStyles();

  const { allCompanies, editCompany } = props;

  // console.log("allCompanies", { allCompanies, lenght: allCompanies && allCompanies.lenght > 0 ? allCompanies[4] : "nada" });

  return allCompanies && allCompanies.length > 0 ? (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allCompanies.map(company => {
            // console.log("company", Object.keys(company.subCompanies).length);
            return (
              <TableRow key={company._id}>
                <TableCell component="th" scope="row">{company.name}</TableCell>
                <TableCell align="right"             >{company.description}</TableCell>
                <TableCell align="right"             >
                  <EditIcon fontSize="small" onClick={() => editCompany(company)}/>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
      <h1>LOADING... COMPANIES LIST</h1>
    );
}
