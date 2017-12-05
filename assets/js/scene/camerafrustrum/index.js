import * as THREE from 'three';

class CameraFrustrum {
  constructor(options) {
    this.camera = new THREE.PerspectiveCamera(
      70, // fov
      1, // aspect ratio
      10, // near
      1000 //far
    );

    this.camera.position.set(
      -options.camera.distance * 2,
      options.camera.distance * 4,
      -options.camera.distance * 1,
    );

    this.camera.lookAt(new THREE.Vector3(
      10,
      0,
      0
    ));

    return this.camera;
  }
}

export default CameraFrustrum;
