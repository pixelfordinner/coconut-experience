import * as THREE from 'three';
const defaultsDeep = require('lodash.defaultsdeep');

class Cylinder {
  constructor(options = {}) {
    this.options = {
      radiusTop: 0.5,
      radiusBottom: 0.5,
      height: 1,
      radiusSegments: 8,
    };

    this.options = defaultsDeep(options, this.options);

    this.geometry = new THREE.BufferGeometry().fromGeometry(
      new THREE.CylinderGeometry(
        this.options.radiusTop,
        this.options.radiusBottom,
        this.options.height,
        this.options.radiusSegments
      )
    );

    return this.geometry;
  }
}

export default Cylinder;
