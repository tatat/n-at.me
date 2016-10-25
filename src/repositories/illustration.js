import _ from 'lodash';
import config from 'config';
import { Repository } from 'repository';

class IllustrationRepository extends Repository {
  findById(id) {
    return this.find(d => _.includes(_.flatten([d.id]), id));
  }

  selectByCategory(category) {
    return this.select({category});
  }
}

export default new IllustrationRepository(config.illustrations);
