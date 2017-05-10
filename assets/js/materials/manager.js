import * as THREE from 'three';

class Manager {
  constructor() {
    this.materials = {};

    return this;
  }

  get(key) {
    return this.exists(key) ? this.materials[key] : undefined;
  }

  set(key, value) {
    return this.materials[key] = value;
  }

  exists(key) {
    return this.materials.hasOwnProperty(key);
  }
}

export let MaterialManager = new Manager();
