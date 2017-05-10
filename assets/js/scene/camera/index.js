import * as THREE from 'three';

class Camera {
  constructor(options) {
    this.camera = new THREE.PerspectiveCamera(
      options.camera.fov,
      options.dimensions.width / options.dimensions.height,
      options.camera.near,
      options.camera.far
    );

    this.camera.position.set(
      options.camera.distance * options.camera.position.x,
      options.camera.distance * options.camera.position.y,
      options.camera.distance * options.camera.position.z
    );

    this.camera.lookAt(new THREE.Vector3(
      options.camera.lookAt.x,
      options.camera.lookAt.y,
      options.camera.lookAt.z
    ));

    return this.camera;
  }
}

export default Camera;
