import DataStore from "./data/data-store";

export default class RootStore {
  dataStores: DataStore;

  constructor() {
    this.dataStores = new DataStore(this);
  }
}