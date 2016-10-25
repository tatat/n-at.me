import _ from 'lodash';

export class Repository {
  constructor(data) {
    this.data = data;
  }

  find(...args) {
    args.unshift(this.data);
    return _.find(...args);
  }

  select(...args) {
    args.unshift(this.data);
    return _.filter(...args);
  }
}
