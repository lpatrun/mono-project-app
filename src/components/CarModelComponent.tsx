import React, { FunctionComponent, useEffect, useState } from 'react';
import CarModel from '../stores/data/car-models/car-model';
import { TableRow, TableCell, Button } from '@material-ui/core';

interface Props {
  model: CarModel
}

const CarModelComponent: FunctionComponent<Props> = ({ model }) => {

  useEffect(() => { setMakeId(model.makeId); }, [model.makeId]);

  useEffect(() => { setModelName(model.modelName); }, [model.modelName]);

  useEffect(() => { setModelAbrv(model.modelAbrv); }, [model.modelAbrv]);

  const [makeId, setMakeId] = useState('');
  const [modelName, setModelName] = useState('');
  const [modelAbrv, setModelAbrv] = useState('');
  const [editMode, setEditMode] = useState(false);

  return (
    <React.Fragment>
      { editMode ?
        <TableRow>
          <TableCell>{model.id}</TableCell>
          <TableCell align="right"><input type="text" value={makeId} onChange={e => setMakeId(e.target.value)} /></TableCell>
          <TableCell align="right"><input type="text" value={modelName} onChange={e => setModelName(e.target.value)} /></TableCell>
          <TableCell align="right"><input type="text" value={modelAbrv} onChange={e => setModelAbrv(e.target.value)} /></TableCell>
          <TableCell align="right">
            <Button onClick={() => { setEditMode(false); model.editModelFields(makeId, modelName, modelAbrv) }} variant="outlined">
              Save
            </Button>
          </TableCell>
        </TableRow>
        :
        <TableRow>
          <TableCell>{model.id}</TableCell>
          <TableCell align="right">{model.makeId}</TableCell>
          <TableCell align="right">{model.modelName}</TableCell>
          <TableCell align="right">{model.modelAbrv}</TableCell>
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

export default CarModelComponent;