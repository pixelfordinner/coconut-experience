import * as THREE from 'three';

class Lights {
  constructor(options, camera) {
    this.lights = [];

    // Default Ambient Light
    let defaultAmbientLight = new THREE.AmbientLight(0xcdcaec, 1);
    this.lights.push(defaultAmbientLight);

    // Default Directional Light
    let defaultDirectionalLight = new THREE.DirectionalLight(0xcdcaec, 1.4);

    defaultDirectionalLight.position.set(
      options.camera.distance,
      options.camera.distance,
      options.camera.distance
    );

    defaultDirectionalLight.castShadow = true;
    defaultDirectionalLight.shadow.mapSize.width = options.dimensions.width * 1;
    defaultDirectionalLight.shadow.mapSize.height = options.dimensions.height * 10;
    defaultDirectionalLight.shadow.camera.left = -options.camera.distance * 2;
    defaultDirectionalLight.shadow.camera.right = options.camera.distance * 2;
    defaultDirectionalLight.shadow.camera.top = 10 * options.camera.distance;
    defaultDirectionalLight.shadow.camera.bottom = -options.camera.distance;
    defaultDirectionalLight.shadow.camera.far = camera.far;
    defaultDirectionalLight.shadow.camera.near = camera.near;

    this.lights.push(defaultDirectionalLight);

    return this.lights;
  }
}

export default Lights;
