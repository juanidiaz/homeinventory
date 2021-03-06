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

export default function ConditionsList(props) {
  const classes = useStyles();

  const { allConditions, editCondition } = props;

  return allConditions && allConditions.length > 0 ? (
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
          {allConditions.map(condition => {
            // if (!condition.isActive) return;

            return (
              <TableRow key={condition.name}>
                <TableCell component="th" scope="row">
                  {condition.name}
                </TableCell>
                <TableCell align="right">{condition.description}</TableCell>
                <TableCell align="right">
                  <EditIcon fontSize="small" onClick={() => editCondition(condition)} />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
      <h1>LOADING... CONDITIONS LIST</h1>
    );
}
