import { MaterialManager } from '../../materials/manager';
import Sphere from '../../geometry/sphere';
import * as THREE from 'three';
const defaultsDeep = require('lodash.defaultsdeep');

//const OIMO = require('oimo');

class Sky {
  constructor(scene, options = {}) {
    this.options = {
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
      name: 'Sky',
      radius: 100,
      widthSegments: 20,
      heightSegments: 20,
      receiveShadow: false,
      castShadow: true,
    };

    // SKY
    this.options = defaultsDeep(options, this.options);

    let sphere = new Sphere({
      radius: 40,
    });
    let material = MaterialManager.get('cloud');
    material.side = THREE.BackSide;
    var mesh = new THREE.Mesh(sphere, material);
    mesh.name = this.options.name;

    scene.add(mesh);
  }
}

export default Sky;
