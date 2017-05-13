import Scene from './scene';
import { MaterialManager } from './materials/manager';
import Base from './objects/base';
import Coco from './objects/palmtree/coco';
import Trunk from './objects/palmtree/trunk';
import Crown from './objects/palmtree/crown';
import Palmtree from './objects/palmtree';
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
        background: 0xd5095e,
        fog: 0xd5095e,
        ground: 0x106cc1,
        sleep: 0x4d7edd,
        coco: 0x106cc1,
        trunk: 0x106cc1,
        crown: 0x106cc1
      },
      scene: {
        fog: {
          factor: .008,
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

    // Ground material
    MaterialManager.set('ground', new THREE.MeshPhongMaterial(
      { color: this.options.colors.ground, shading: THREE.FlatShading }
    ));

    // Coco Material
    MaterialManager.set('palmtree_coco', new THREE.MeshPhongMaterial(
      { color: this.options.colors.coco, shading: THREE.FlatShading }
    ));

    // Segment Materiall
    MaterialManager.set('palmtree_trunk', new THREE.MeshPhongMaterial(
      { color: this.options.colors.trunk, shading: THREE.FlatShading }
    ));

    // crown Material
    MaterialManager.set('palmtree_crown', new THREE.MeshPhongMaterial(
      { color: this.options.colors.crown, shading: THREE.FlatShading }
    ));

    MaterialManager.set('palmtree_sleeping', new THREE.MeshPhongMaterial(
      { color: this.options.colors.sleep, shading: THREE.FlatShading }
    ));
  }

  populateScene() {

    // Base plane
    new Base(this.scene);

    // Test Palmtree
    let max = 3;
    for (var i = 0; i < max; i++) {
      new Palmtree(this.scene, {
        name: 'Palmtree_',
        index: i,
        position: {
          z: (10 * i),
          y: 0,
          x: 0,
        },
      });
    }

    //
    // new Coco(this.scene, {
    //   position: {
    //     x: 4,
    //     y: 20,
    //     z: 0,
    //   },
    // });

    //test for multiples Trunks
    //
    // for (var i = 0; i < 10; i++) {
    //   let myName = 'PalmThree_';
    //   let index = i;
    //   let angl = THREE.Math.mapLinear(i, 0, 10, 0, Math.PI * 2);
    //   let scal = THREE.Math.mapLinear(i, 0, 10, 0.1, 1);
    //   let xPos = 10 * Math.cos(angl);
    //   let zPos = 10 * Math.sin(angl);
    //   let yPos = 40 * Math.random();
    //
    //   new Palmtree(this.scene, {
    //     name: myName,
    //     position: {
    //       x: xPos,
    //       y: 0,
    //       z: zPos,
    //     },
    //   });
    // }
  }
}

$(document).ready(function () { new App(); });
