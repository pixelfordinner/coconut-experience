import * as THREE from 'three';

import Ball from './ball';
import Cone from './cone';

// import Trunk from './trunk';
import { MaterialManager } from '../../materials/manager';
const defaultsDeep = require('lodash.defaultsdeep');

class IceCream {

  constructor(scene, options = {}) {
    this.options = {
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
      radius: 1,
      name: 'IceCream_',
      index: 0,
      maxHeight: 1,
      ballMax: 3,
    };
    this.options = defaultsDeep(options, this.options);

    let cone = new Cone(scene, {
      position: {
        x: this.options.position.x,
        y: this.options.position.y,
        z: this.options.position.z,
      },
      cylinder: {
        radiusTop: this.options.radius * 0.75,
        radiusBottom: 0.0,
        height: this.options.radius * 2.0,
        radiusSegments: 40,
        heightSegments: 40,
        openEnded: true,
      },
      name: this.options.name + this.options.index + '_Cone',
    });

    let lastBody = cone.body;

    for (var i = 0; i < this.options.ballMax; i++) {

      let angl = THREE.Math.mapLinear(i, 0, this.options.ballMax, 0, Math.PI * 2);
      let xPos = this.options.position.x + (0.75 * this.options.radius * Math.cos(angl));
      let zpos = this.options.position.z + (0.75 * this.options.radius * Math.sin(angl));

      let ball = new Ball(scene, {

        name: this.options.name + this.options.index + '_Ball_' + i,
        radius: this.options.radius * 0.6,
        position: {
          x: xPos,
          y: this.options.radius * 2.2,
          z: zpos,
        },
      });

      let link = scene.world.add({
          type: 'jointHinge',
          name: this.options.name + this.options.index + '_BallLink_' + i,
          body1: ball.body,
          body2: lastBody,
          pos1: [0, -this.options.radius * 0.85, 0],
          pos2: [0, this.options.radius, 0],
          axe1: [0, 1, 0],
          axe2: [0, 1, 0],
          min: -1,
          max: 0,
          collision: false,
        });
    }

    return IceCream;
  }
}

export default IceCream;
