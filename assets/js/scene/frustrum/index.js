import * as THREE from 'three';

class Frustrum {
  constructor(camera) {

  this.helper = new THREE.CameraHelper( camera );
  //scene.add( helper );


    return this.helper;
  }
}

export default Frustrum;
