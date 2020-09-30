import { action, computed, observable } from 'mobx';
import RootStore from '../../root-store';
import Make from './make';

export default class MakeStore{
  @observable
  makeList: Make[] = [];

  rootStore: RootStore;

  constructor( rootStore: RootStore ) {
    this.rootStore = rootStore;
  }

  @computed
  get allMakes() {
    return this.makeList.slice();
  }

  @action
  createMake (name: string, abreviation: string) {
    this.makeList.push(new Make(name, abreviation));
  }
}