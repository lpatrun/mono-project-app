import { action, observable} from 'mobx';

let continuousId = 0;

export default class Make {
  id: number;
  @observable
  name: string;
  @observable
  abreviation: string;

  constructor( name: string, abreviation: string) {
    this.id = continuousId++;
    this.name = name;
    this.abreviation = abreviation;
  }

  @action
  editFields(name: string, abreviation: string) {
    this.name = name;
    this.abreviation = abreviation;
  }

}