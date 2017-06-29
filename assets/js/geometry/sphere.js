import * as THREE from 'three';
const defaultsDeep = require('lodash.defaultsdeep');

class Sphere {
  constructor(options = {}) {
    this.options = {
      radius: 1,
      widthSegments: 50,
      heightSegments: 50,
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
