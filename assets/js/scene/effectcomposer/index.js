import * as THREE from 'three';
const EffectComposer = require('three-effectcomposer')(THREE);

class Composer {
  constructor(renderer, target) {
    this.composer = new EffectComposer(renderer, target);
    return this.composer;
  }
}

export default Composer;
