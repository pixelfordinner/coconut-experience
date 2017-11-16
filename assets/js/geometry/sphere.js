import * as THREE from 'three';
const defaultsDeep = require('lodash.defaultsdeep');

class Sphere {
  constructor(scene, options = {}) {
    this.options = {
      radius: 1,
      widthSegments: 10,
      heightSegments: 10,
    };

    this.options = defaultsDeep(options, this.options);
    this.geometry = new THREE.BufferGeometry().fromGeometry(
      new THREE.SphereGeometry(
        this.options.radius,
        this.options.widthSegments,
        this.options.heightSegments
      )
    );

    return this.geometry;
  }
}

export default Sphere;
