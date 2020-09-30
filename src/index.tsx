import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore } from './stores/helpers/create-store';
import { StoreProvider } from './stores/helpers/store-context';

const rootStore = createStore();

const makes = [
  { name: 'Volkswagen', abreviation: 'VW' },
  { name: 'Aston Martin', abreviation: 'AM' },
  { name: 'Alfa Romeo', abreviation: 'AR' },
  { name: 'Audi', abreviation: 'Audi' },
  { name: 'Bentley', abreviation: 'Bentley' },
  { name: 'BMW', abreviation: 'BMW' },
  { name: 'Dodge', abreviation: 'Dodge' },
  { name: 'DS', abreviation: 'DS' },
  { name: 'Ferrari', abreviation: 'Ferrari' },
  { name: 'Fiat', abreviation: 'Fiat' },
  { name: 'Ford', abreviation: 'Ford' },
  { name: 'Land Rover', abreviation: 'LR' },
  { name: 'Mercedes-Benz', abreviation: 'MB' }
];

const models = [
  { makeId: '1' , modelName: 'Passat', modelAbrv: 'Passat'},
  { makeId: '1' , modelName: 'Golf', modelAbrv: 'Golf'},
  { makeId: '1' , modelName: 'Polo', modelAbrv: 'Polo'},
  { makeId: '1' , modelName: 'Sciroco', modelAbrv: 'Sciroco'},
  { makeId: '1' , modelName: 'Arteon', modelAbrv: 'Arteon'},
  { makeId: '2' , modelName: 'A4', modelAbrv: 'A4'},
  { makeId: '3' , modelName: 'Continental', modelAbrv: 'Continental'},
  { makeId: '4' , modelName: '458 Italia', modelAbrv: '458'},
  { makeId: '4' , modelName: '599 Fiorano', modelAbrv: '599'},
]

makes.forEach(element => {
  rootStore.dataStores.makeStore.createMake(element.name, element.abreviation);
})

models.forEach(element => {
  rootStore.dataStores.modelStore.createModel(element.makeId, element.modelName, element.modelAbrv);
})

//rootStore.dataStores.makeStore.createMake('Volkswagen', 'VW');
//rootStore.dataStores.makeStore.createMake('Aston Martin', 'AM');

ReactDOM.render(
  <StoreProvider value={rootStore}>
    <App />
  </StoreProvider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
