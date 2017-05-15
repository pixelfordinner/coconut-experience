import * as THREE from 'three';
import CristalSegment from './segment';
import { MaterialManager } from '../../materials/manager';

const defaultsDeep = require('lodash.defaultsdeep');

class Cristal {
  constructor(scene, options = {}) {
    this.options = {

      name: 'Cristal_',
      index: 0,
      max: 6,
      radius: 1,
      density: 1,
      height: 4,

      scale: {
        radius: 1,
        height: 1,
      },

      position: {
        x: 0,
        y: 0,
        z: 0,
      },
    };

    this.options = defaultsDeep(options, this.options);
    let max = this.options.max;
    let rad = this.options.radius;

    let segment = new CristalSegment(scene, {
      parentName: 'Cristal_' + 0,
      height: 5,
      radius: 0.75,
      position: {
        x: this.options.position.x,
        y: this.options.position.y,
        z: this.options.position.z,
      },
    });

    for (var i = 0; i < max; i++) {

      let alfa = THREE.Math.mapLinear(i, 0, max, 0, Math.PI * 2);
      let scale = THREE.Math.mapLinear(i, 0, max, rad, rad / 2);
      let radius = (rad + scale) / 2;
      let rand = Math.random();
      let theta = THREE.Math.mapLinear(rand, 0, 1, -Math.PI / 10, Math.PI / 10);

      let segment = new CristalSegment(scene, {
        parentName: 'Cristal_' + (i + 1),
        position: {
          x: this.options.position.x + (Math.cos(alfa) * rad * radius),
          y: this.options.position.y - (0.25 * i),
          z: this.options.position.z + (Math.sin(alfa) * rad * radius),
        },
        rotation: {
          x: theta,
          y: alfa,
          z: 0,
        },
        scale: {
          x: scale,
          y: scale,
          z: scale,
        },
      });
    }

    return Cristal;
  }
}

export default Cristal;
