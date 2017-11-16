import * as THREE from 'three';
import {
  MaterialManager
} from '../../../materials/manager';
import TrunkSegment from './segment';

const defaultsDeep = require('lodash.defaultsdeep');

class Arm {
  constructor(scene, options = {}) {
    this.options = {
      parentName: 'IceCream_',
      name: 'Arm_',
      scale: {
        x: 0.1,
        y: 0.2,
        z: 0.1,
      },
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
      segments: {
        quantity: 5,
        radius: {
          min: 0.3,
          max: 1,
        },
        density: 0.2,
      },
    };

    this.options = defaultsDeep(options, this.options);

    this.segments = [];

    let currentHeight = this.options.scale.y;
    let radius = this.options.segments.radius.min;
    let lastSegmentsHeight = 0;
    let height = this.options.scale.y;
    let lastHeight = height;

    for (var i = 0; i < this.options.segments.quantity; i++, currentHeight += height) {

      let myName = this.options.name + '_ArmSegment_' + i;

      //console.log(myName);
      let move = true;
      if (i === 0) move = false;

      let options = {
        scale: {
          radius: radius,
          height: height,
        },
        position: {
          x: this.options.position.x,
          y: this.options.position.y + currentHeight,
          z: this.options.position.z,
        },
        name: myName,
        physics: {
          move: move,
          density: this.options.segments.density,
        },
      };

      let currentObject = new TrunkSegment(scene, options);

      if (i > 0) {

        let previousObject = this.segments[i - 1];
        let link = scene.world.add({
          type: 'joint',
          name: this.options.name + 'ArmLink_' + i,
          body1: currentObject.body,
          body2: previousObject.body,
          pos1: [0, -height / 2, 0],
          pos2: [0, lastHeight / 2, 0],
          rot1: [0, 0, 0],
          rot2: [0, 0, 0],
          min: -height / 2,
          max: 0,
          collision: true,
        });
      }

      lastHeight = height;
      this.segments.push(currentObject);
    }

    return this;
  }
}

export default Arm;
