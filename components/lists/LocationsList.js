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

export default function LocationsList(props) {
  const classes = useStyles();

  const { allLocations, editLocation } = props;

  return allLocations && allLocations.length > 0 ? (
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
          {allLocations.map((location) => {
            // if (!location.isActive) return;

            return (
              <TableRow key={location.name}>
                <TableCell component="th" scope="row">
                  {location.name}
                </TableCell>
                <TableCell align="right">{location.description}</TableCell>
                <TableCell align="right">
                  <EditIcon fontSize="small" onClick={() => editLocation(location)} />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
      <h1>LOADING... LOCATIONS LIST</h1>
    );
}
