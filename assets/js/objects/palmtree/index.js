import Coco from './coco';
import Crown from './crown';
import Trunk from './trunk';
import { MaterialManager } from '../../materials/manager';

const defaultsDeep = require('lodash.defaultsdeep');

class Palmtree {

  constructor(scene, options = {}) {
    this.options = {
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
      name: 'Palmtree_',


    };


    this.options = defaultsDeep(options, this.options);
    console.log(scene);

    new Trunk ( scene, {
      name: "Palmtree_" + this.options.index,

      position: {
        x: this.options.position.x,
        y: this.options.position.y,
        z: this.options.position.z,
      },
    });




    return Palmtree;
  }
}

export default Palmtree;
