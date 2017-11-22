import * as THREE from 'three';

class Lights {
  constructor(options, camera, shadowcamera) {
    this.lights = [];

    let defaultDirectionalLight = new THREE.DirectionalLight(0xf937be, 1.);
    defaultDirectionalLight.position.set(
      shadowcamera.position.x,
      shadowcamera.position.y,
      shadowcamera.position.z
    );
    defaultDirectionalLight.castShadow = true;

    let aspectRatio = options.dimensions.width / options.dimensions.height;
    defaultDirectionalLight.shadow = new THREE.LightShadow(shadowcamera);
    defaultDirectionalLight.shadow.mapSize.width = 1024;
    defaultDirectionalLight.shadow.mapSize.height = 1024;

    this.lights.push(defaultDirectionalLight);

    return this.lights;
  }
}

export default Lights;
