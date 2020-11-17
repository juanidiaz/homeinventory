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

export default function ContractsList(props) {
  const classes = useStyles();

  const { allContracts, editContract } = props;

  // console.log("allContracts", { allContracts, lenght: allContracts && allContracts.lenght > 0 ? allContracts[4] : "nada" });

  return allContracts && allContracts.length > 0 ? (
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
          {allContracts.map(contract => {
            // console.log("contract", Object.keys(contract.subContracts).length);
            return (
              <TableRow key={contract._id}>
                <TableCell component="th" scope="row">{contract.name}</TableCell>
                <TableCell align="right"             >{contract.description}</TableCell>
                <TableCell align="right"             >
                  <EditIcon fontSize="small" onClick={() => editContract(contract)}/>
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
