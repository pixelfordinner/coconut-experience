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

    // SKY DOME
    this.options = defaultsDeep(options, this.options);

    let sphere = new Sphere({
      radius: this.options.radius,
    });
    let material = MaterialManager.get('cloud');
    material.side = THREE.BackSide;
    var mesh = new THREE.Mesh(sphere, material);
    mesh.name = this.options.name;
    mesh.scale.set(
      1.3,
      0.6,
      1.3
    );
    mesh.rotateY(-Math.PI);
    scene.add(mesh);

    // FAKE SKY SHADOWS
    let planeGeometry = new THREE.BufferGeometry().fromGeometry(
      new THREE.PlaneGeometry(
        this.options.radius * 2,
        this.options.radius * 2,
    ));

    planeGeometry.rotateX(Math.PI / 2);

    //planeGeometry.rotateY(-Math.PI / 2);
    let material2 = MaterialManager.get('smooth_cloud');
    material2.side = THREE.BackSide;
    let mesh2 = new THREE.Mesh(planeGeometry, material2);
    mesh2.position.set(
      this.options.position.x,
      this.options.position.y + 1,
      this.options.position.z
    );

    mesh2.name = this.options.name;
    scene.add(mesh2);

  }
}

export default Sky;
