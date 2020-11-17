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

export default function RoomsList(props) {
  const classes = useStyles();

  const { allRooms, editRoom } = props;

  return allRooms && allRooms.length > 0 ? (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allRooms.map((room) => {
            if (!room.isActive) return;
            console.log("++++++++++++++", room)
            return (
              <TableRow key={room.name}>
                <TableCell component="th" scope="row">
                  {room.name}
                </TableCell>
                <TableCell align="right">{room.description}</TableCell>
                <TableCell align="right">{room.location ? room.location.name : <i style={{color: 'red'}}>Enter location</i>}</TableCell>
                <TableCell align="right">
                  <EditIcon fontSize="small" onClick={() => editRoom(room)} />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
      <h1>LOADING... ROOMS LIST</h1>
    );
}
