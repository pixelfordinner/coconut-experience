import * as THREE from 'three';


class Clock {
  constructor() {
    this.clock = new THREE.Clock(1);
    this.clock.start();
    return this.clock;
  }
}

export default Clock;
