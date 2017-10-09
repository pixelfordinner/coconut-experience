import * as THREE from 'three';

class Lights {
  constructor(options, camera) {
    this.lights = [];

    // Default Ambient Light
    let defaultAmbientLight = new THREE.AmbientLight(0xcdcaec, 0.1);
    this.lights.push(defaultAmbientLight);

    // Default Directional Light
    let defaultDirectionalLight = new THREE.DirectionalLight(0xf937be, 0.1);

    defaultDirectionalLight.position.set(
      options.camera.distance * 10,
      options.camera.distance * 10,
      options.camera.distance * 10
    );
    //defaultDirectionalLight.shadowDarkness = 0.2;
    defaultDirectionalLight.castShadow = true;
    defaultDirectionalLight.shadow.mapSize.width = options.dimensions.width * 3;
    defaultDirectionalLight.shadow.mapSize.height = options.dimensions.height * 3;
    defaultDirectionalLight.shadow.camera.left = -options.camera.distance * 2;
    defaultDirectionalLight.shadow.camera.right = options.camera.distance * 2;
    defaultDirectionalLight.shadow.camera.top = 10 * options.camera.distance;
    defaultDirectionalLight.shadow.camera.bottom = -options.camera.distance;
    defaultDirectionalLight.shadow.camera.far = camera.far;
    defaultDirectionalLight.shadow.camera.near = camera.near;
    defaultDirectionalLight.shadow.camera.fov = 10.;
    defaultDirectionalLight.shadow.Bias = 0.0001;
  //  defaultDirectionalLight.shadowDarkness = 0.2;
    this.lights.push(defaultDirectionalLight);

    return this.lights;
  }
}

export default Lights;
