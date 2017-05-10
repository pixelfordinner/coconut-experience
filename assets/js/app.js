import Scene from './scene';
import { MaterialManager } from './materials/manager';
import Base from './objects/base';
import Coco from './objects/palmtree/coco';
import Trunk from './objects/palmtree/trunk';

import * as THREE from 'three';

const $ = require('jquery');

class App {
  constructor() {
    this.options = {
      renderer: {
        canvas: document.getElementById('canvas'),
      },
      camera: {
        distance: 40,
        fov: 35,
        near: .5,
        far: 1000,
        lookAt: {
          x: 0,
          y: 7,
          z: 0,
        },
        position: {
          x: 1.3,
          y: .66,
          z: .5,
        },
      },
      colors: {
        background: 0xE3E3E3,
        fog: 0xE3E3E3,
        ground: 0xff0000,
        coco: 0x37b910,
        trunkSegment: 0xb46600,
      },
      scene: {
        fog: {
          factor: .003,
        },
      },
    };

    this.scene = new Scene(this.options);

    this.scene.init();

    this.registerMaterials();
    this.populateScene();

    this.scene.animate();
  }

  registerMaterials() {
    // Ground
    MaterialManager.set('ground', new THREE.MeshPhongMaterial(
      { color: this.options.colors.ground, shading: THREE.FlatShading }
    ));

    // Coco
    MaterialManager.set('palmtree.coco', new THREE.MeshPhongMaterial(
      { color: this.options.colors.coco, shading: THREE.FlatShading }
    ));

    // Segment
    MaterialManager.set('palmtree.trunk.segment', new THREE.MeshPhongMaterial(
      { color: this.options.colors.trunkSegment, shading: THREE.FlatShading }
    ));
  }

  populateScene() {
    // Base plane
    new Base(this.scene);

    // Test Coco
    new Coco(this.scene, {
      position: {
        x: 20,
        y: 10,
        z: 0,
      },
    });

    // Test Trunk
    console.log(new Trunk(this.scene));
  }
}

$(document).ready(function () { new App(); });
