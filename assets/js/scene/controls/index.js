import * as THREE from 'three';
const OrbitControl = require('three-orbit-controls')(THREE);

class Controls {
  constructor(options, camera) {

    this.controls = new OrbitControl(
      camera,
      options.renderer.canvas
    );

    this.controls.target.set(
      options.camera.lookAt.x,
      options.camera.lookAt.y,
      options.camera.lookAt.z
    );

    return this.controls;
  }
}

export default Controls;
