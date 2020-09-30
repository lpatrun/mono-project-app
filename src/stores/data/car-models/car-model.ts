import { action, observable } from "mobx";

let continuousId = 0;

export default class CarModel {
  id: number;
  @observable
  makeId: string;
  @observable
  modelName: string;
  @observable
  modelAbrv: string;

  constructor(makeId: string, modelName: string, modelAbrv: string) {
    this.id = continuousId++;
    this.makeId = makeId;
    this.modelName = modelName;
    this.modelAbrv = modelAbrv;
  }

  @action
  editModelFields(makeId: string, modelName: string, modelAbrv: string) {
    this.makeId = makeId;
    this.modelName = modelName;
    this.modelAbrv = modelAbrv;
  }
}