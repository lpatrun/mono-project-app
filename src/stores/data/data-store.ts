import RootStore from "../root-store";
import MakeStore from "./car-makes/make-store";
import CarModelStore from "./car-models/car-model-store";

export default class DataStore {
  makeStore: MakeStore;
  modelStore: CarModelStore;

  constructor(rootStore: RootStore) {
    this.makeStore = new MakeStore(rootStore);
    this.modelStore = new CarModelStore(rootStore);
  }
}