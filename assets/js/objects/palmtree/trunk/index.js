import * as THREE from 'three';
import { MaterialManager } from '../../../materials/manager';
import TrunkSegment from './segment';

const defaultsDeep = require('lodash.defaultsdeep');

class Trunk {
  constructor(scene, options = {}) {
    this.options = {
      parentName: 'Palmtree_',
      name: 'Trunk_',
      scale: {
        x: 1,
        y: 1,
        z: 1,
      },
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
      segments: {
        quantity: 11,
        radius: {
          min: 0.6,
          max: 1.5,
        },
        density: {
          min: 8,
          max: 16,
        },
        height: {
          min: 0.9,
          max: 1.6,
        },
      },
    };

    this.options = defaultsDeep(options, this.options);

    this.segments = [];

    let currentHeight = this.options.position.y + (this.options.scale.y / 2);

    let lastSegmentsHeight = 0;
    let height = this.options.scale.y;
    let lastHeight = height;

    for (var i = 0; i < this.options.segments.quantity; i++) {

      let height = THREE.Math.mapLinear(
        i,
        0,
        this.options.segments.quantity,
        this.options.segments.height.min,
        this.options.segments.height.max,
      );
      currentHeight += height;

      let radius = THREE.Math.mapLinear(
        i,
        0,
        this.options.segments.quantity,
        this.options.segments.radius.max,
        this.options.segments.radius.min
      );
      let density = THREE.Math.mapLinear(
        i,
        0,
        this.options.segments.quantity,
        this.options.segments.density.max,
        this.options.segments.density.min
      );
      let myName = this.options.name + '_TrunkSegment_' + i;
      let move = true;
      if (i === 0) move = false;

      let options = {
        scale: {
          radius: radius,
          height: height,
        },
        position: {
          x: this.options.position.x,
          y: currentHeight,
          z: this.options.position.z,
        },
        name: myName,
        physics: {
          move: move,
          density: density,
        },
      };

      let currentObject = new TrunkSegment(scene, options);

      if (i > 0) {

        let previousObject = this.segments[i - 1];
        let link = scene.world.add({
            type: 'joint',
            name: this.options.name + 'TrunkLink_' + i,
            body1: currentObject.body,
            body2: previousObject.body,
            pos1: [0, -height / 2, 0],
            pos2: [0, lastHeight / 2, 0],
            rot1: [0, 0, 0],
            rot2: [0, 0, 0],
            min: -height / 3,
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

export default Trunk;
