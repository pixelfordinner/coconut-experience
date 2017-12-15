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
        y: 15,
        z: 0,
      },
      name: 'Sky',
      radius: 60,
      widthSegments: 20,
      heightSegments: 20,
      receiveShadow: false,
      castShadow: false,
    };

    // SKY DOME
    this.options = defaultsDeep(options, this.options);
    // let sphereoptions = {
    //   radius: 50,
    //   widthSegments: 300,
    //   heightSegments: 300,
    //
    // };
    let sphere = new Sphere();
    let material = MaterialManager.get('smooth_cloud');
    material.side = THREE.BackSide;
    let mesh = new THREE.Mesh(sphere, material);
    mesh.name = this.options.name;
    mesh.scale.set(
      this.options.radius,
      this.options.radius,
      this.options.radius,
    );
    mesh.position.set(
      this.options.position.x,
      this.options.position.y,
      this.options.position.z,
    );
    mesh.rotateY(-Math.PI);
    scene.add(mesh);

    return mesh;

  }
}

export default Sky;
