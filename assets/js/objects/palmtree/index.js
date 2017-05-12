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
      index: 0,

    };

    this.options = defaultsDeep(options, this.options);

    let trunk = new Trunk(scene, {
      name: 'Palmtree_' + this.options.index,

      position: {
        x: this.options.position.x,
        y: this.options.position.y,
        z: this.options.position.z,
      },
    });
    let lastBody = trunk.segments[trunk.segments.length - 1];
    let lastB = lastBody.body;

    let bodyPosY = lastBody.body.position.y;

    let crown = new Crown(scene, {
      position: {
        x: this.options.position.x,
        y: bodyPosY + 1,
        z: this.options.position.z,
      },
      name: 'yCrown_' + this.options.index,
    });
    let crownB = crown.body;

    console.log(crownB);
    console.log(lastB);

    // let link = this.scene.world.add({
    //     type: 'jointHinge',
    //     name: 'TrunkLink_' + this.options.index,
    //     body1: crownB,
    //     body2: lastB,
    //     pos1: [0, -this.options.height / 2, 0],
    //     pos2: [0, this.options.height / 2, 0],
    //     min: 0,
    //     max: 1,
    //     collision: true,
    //   });

    //console.log(lastBody.body.name,' is ',bodyPosY, ' height in Coconut tree');
    return Palmtree;
  }
}

export default Palmtree;
