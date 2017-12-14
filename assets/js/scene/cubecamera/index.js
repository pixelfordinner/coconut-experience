import * as THREE from 'three';

class Camera {
  constructor(options) {
    this.camera = new THREE.CubeCamera(1, 1000, 1024);

    this.camera.position.set(
      0,
      15,
      0,
    );

    this.camera.renderTarget.mapping = THREE.CubeRefractionMapping;

    return this.camera;
  }
}

export default Camera;
