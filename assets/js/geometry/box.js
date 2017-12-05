import * as THREE from 'three';
const defaultsDeep = require('lodash.defaultsdeep');

class Box {
  constructor(options = {}) {
    this.options = {
      width: 1,
      height: 1,
      depth: 1,
      widthSegments: 1,
      heightSegments: 1,
      depthSegments: 1,
    };

    this.options = defaultsDeep(options, this.options);

    this.geometry = new THREE.BufferGeometry().fromGeometry(
      new THREE.BoxGeometry(
        this.options.width,
        this.options.height,
        this.options.depth,
        this.options.widthSegments,
        this.options.heightSegments,
        this.options.depthSegments,
      )
    );

    return this.geometry;
  }
}

export default Box;
