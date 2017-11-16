import * as THREE from 'three';

import Ball from './ball';
import Cone from './cone';
import Eye from './eye';
import Arm from './arm';

// import Trunk from './trunk';
import {
  MaterialManager
} from '../../materials/manager';

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
      ballMax: 4,
    };
    this.options = defaultsDeep(options, this.options);

    // let arm = new Arm(scene, {
    //   position: {
    //     x: this.options.position.x + 1,
    //     y: this.options.position.y,
    //     z: this.options.position.z,
    //   },
    // });

    // Cone section ////////////////////////////////////////////////////////////////////////////////
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
        radiusSegments: 22,
        heightSegments: 1,
        openEnded: true,
      },
      name: this.options.name + this.options.index + '_Cone',
    });

    let lastBody = cone.body;

    // Eyes section ////////////////////////////////////////////////////////////////////////////////
    for (var i = 0; i < 2; i++) {

      let eye = new Eye(scene, {
        position: {
          x: this.options.position.x,
          y: this.options.position.y,
          z: this.options.position.z,
        },
        scale: {
          x: 0.25,
          y: 0.25,
          z: 0.25,
        },
        radius: this.options.radius,
        name: this.options.name + this.options.index + '_Eye_' + i,
      });

      let hole = new Eye(scene, {
        position: {
          x: this.options.position.x,
          y: this.options.position.y,
          z: this.options.position.z,
        },
        scale: {
          x: 0.1,
          y: 0.1,
          z: 0.1,
        },
        radius: this.options.radius,
        name: this.options.name + this.options.index + '_Hole_' + i,
      });

      let angl = 0;
      if (i < 1) {
        angl = Math.PI / 10.;
      } else {
        angl = -Math.PI / 10.;
      };

      let link = scene.world.add({
        type: 'jointHinge',
        name: this.options.name + this.options.index + '_EyeLink_' + i,
        body1: eye.body,
        body2: lastBody,
        pos1: [.7 * Math.cos(angl), 1, .7 * Math.sin(angl)],
        pos2: [0, 1.6, 0],
        axe1: [0, 1, 0],
        axe2: [0, 1, 0],
        min: -1,
        max: 0,
        collision: false,
      });

      let link2 = scene.world.add({
        type: 'jointHinge',
        name: this.options.name + this.options.index + '_HoleLink_' + i,
        body1: hole.body,
        body2: eye.body,
        pos1: [.2 * Math.cos(angl), 0, .2 * Math.sin(angl)],
        pos2: [0, 0, 0],
        axe1: [0, 1, 0],
        axe2: [0, 1, 0],
        min: -50,
        max: 50,
        collision: false,
      });
    };

    // Balls section ///////////////////////////////////////////////////////////////////////////////
    for (var i = 0; i < this.options.ballMax; i++) {

      let angl = THREE.Math.mapLinear(i, 0, this.options.ballMax - 1, 0, Math.PI * 2);
      let xPos = this.options.position.x + (0.8 * this.options.radius * Math.cos(angl));
      let zPos = this.options.position.z + (0.8 * this.options.radius * Math.sin(angl));
      let yPos = this.options.position.y;
      let hfac = 0.6;
      let dens = 1;
      if (i == this.options.ballMax - 1) {
        hfac = 1.60;
        xPos = this.options.position.x;
        zPos = this.options.position.z;
        dens = 2;
      }

      let ball = new Ball(scene, {

        name: this.options.name + this.options.index + '_Ball_' + i,
        index: i,
        radius: this.options.radius * 0.6,
        position: {
          x: xPos,
          y: yPos + this.options.radius * hfac,
          z: zPos,
        },
        physics: {
          density: dens,
        },
      });

      let link = scene.world.add({
        type: 'jointHinge',
        name: this.options.name + this.options.index + '_BallLink_' + i,
        body1: ball.body,
        body2: lastBody,
        pos1: [0, yPos - this.options.radius * hfac, 0],
        pos2: [0, yPos + this.options.radius, 0],
        axe1: [0, 1, 0],
        axe2: [0, 1, 0],
        min: -1,
        max: 0,
        collision: true,
      });
    }

    return IceCream;
  }
}

export default IceCream;
