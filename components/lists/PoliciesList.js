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

export default function PoliciesList(props) {
  const classes = useStyles();

  const { allPolicies, editPolicy } = props;

  // console.log("allPolicies", { allPolicies, lenght: allPolicies && allPolicies.lenght > 0 ? allPolicies[4] : "nada" });

  return allPolicies && allPolicies.length > 0 ? (
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
          {allPolicies.map(policy => {
            // console.log("policy", Object.keys(policy.subPolicies).length);
            return (
              <TableRow key={policy._id}>
                <TableCell component="th" scope="row">{policy.name}</TableCell>
                <TableCell align="right"             >{policy.description}</TableCell>
                <TableCell align="right"             >
                  <EditIcon fontSize="small" onClick={() => editPolicy(policy)}/>
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
