import * as THREE from 'three';

class Lights {
  constructor(options, camera) {
    this.lights = [];

    // creating Ambient Light
    let defaultAmbientLight = new THREE.AmbientLight(0xcdcaec, 0.1);
    this.lights.push(defaultAmbientLight);

    // Creating Directional Light
    let defaultDirectionalLight = new THREE.DirectionalLight(0xf937be, 10.);
    defaultDirectionalLight.position.set(
      options.camera.distance * 10,
      options.camera.distance * 10,
      options.camera.distance * 10
    );
    defaultDirectionalLight.castShadow = true;
    defaultDirectionalLight.shadow.mapSize.width = options.dimensions.width * 2;
    defaultDirectionalLight.shadow.mapSize.height = options.dimensions.height * 2;
    defaultDirectionalLight.shadow.camera.left = -options.camera.distance * 10;
    defaultDirectionalLight.shadow.camera.right = options.camera.distance * 10;
    defaultDirectionalLight.shadow.camera.top = 10 * options.camera.distance;
    defaultDirectionalLight.shadow.camera.bottom = -10 * options.camera.distance;
    defaultDirectionalLight.shadow.camera.far = 800;
    defaultDirectionalLight.shadow.camera.near = 1;
    defaultDirectionalLight.shadow.camera.fov = 40;
    defaultDirectionalLight.shadow.Bias = .0001;

    this.lights.push(defaultDirectionalLight);

    // Creating Point Light
    // PointLight( color, intensity, distance, decay )

    ///let defaultpointLight = new THREE.PointLight(0xf937be, 0.1);

    return this.lights;
  }
}

export default Lights;
