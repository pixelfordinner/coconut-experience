import * as THREE from 'three';
import { MaterialManager } from '../../../materials/manager';
import TrunkSegment from './segment';

const defaultsDeep = require('lodash.defaultsdeep');

class Trunk {
  constructor(scene, options = {}) {
    this.options = {
      parentName: 'PalmTree',
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
        quantity: 12,
        radius: {
          min: 0.5,
          max: 1.5,
        },
        density: {
          min: 2,
          max: 10,
        },
        height: {
          min: 0.5,
          max: 2,
        },
      },
    };

    this.options = defaultsDeep(options, this.options);

    this.segments = [];

    let currentHeight = this.options.scale.y / 2;
    let height = this.options.scale.y;

    for (var i = 0; i < this.options.segments.quantity; i++, currentHeight += height * 2) {
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
        name: 'TrunkSegment_' + i,
        physics: {
          move: true,
          density: density,
        },
      };

      this.segments.push(new TrunkSegment(scene, options));
    }

    return this;
  }
}

export default Trunk;
