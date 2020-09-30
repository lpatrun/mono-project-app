import { action, computed, observable } from 'mobx';
import RootStore from '../../root-store';
import CarModel from './car-model';

export default class CarModelStore {
  @observable
  carModels: CarModel[] = [];

  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @computed
  get allMakes() {
    return this.carModels.slice();
  }

  @action
  createModel (makeId: string, modelName: string, modelAbrv: string) {
    this.carModels.push(new CarModel(makeId, modelName, modelAbrv));
  }

}