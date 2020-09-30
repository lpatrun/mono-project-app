import React, { FunctionComponent, useEffect, useState } from 'react';
import Make from '../stores/data/car-makes/make';
import './CarMake.css';
import { TableRow, TableCell, Button } from '@material-ui/core';

interface Props {
  make: Make
}

const CarMake: FunctionComponent<Props> = ({ make }) => {
  useEffect(() => {
    setEditMake(make.name);
  }, [make.name]);

  useEffect(() => {
    setEditAbreviation(make.abreviation);
  }, [make.abreviation]);

  const [editMake, setEditMake] = useState('');
  const [editAbreviation, setEditAbreviation] = useState('');
  const [editMode, setEditMode] = useState(false);

  return (
    <React.Fragment>
      {editMode ?
        <TableRow>
          <TableCell>{make.id}</TableCell>
          <TableCell align="right"><input type="text" value={editMake} onChange={e => setEditMake(e.target.value)} /></TableCell>
          <TableCell align="right"><input type="text" value={editAbreviation} onChange={e => setEditAbreviation(e.target.value)} /></TableCell>
          <TableCell align="right">
            <Button onClick={() => { setEditMode(false); make.editFields(editMake, editAbreviation) }} variant="outlined">
              Save
            </Button>
          </TableCell>
        </TableRow>
        :
        <TableRow>
          <TableCell>{make.id}</TableCell>
          <TableCell align="right">{make.name}</TableCell>
          <TableCell align="right">{make.abreviation}</TableCell>
          <TableCell align="right">
            <i
              className="fa fa-pencil-square-o addHoverHand"
              aria-hidden="true"
              onClick={() => setEditMode(true)}
            ></i>
          </TableCell>
        </TableRow>
      }
    </React.Fragment>
  )
}

export default CarMake;