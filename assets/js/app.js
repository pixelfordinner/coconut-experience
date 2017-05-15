import Scene from './scene';
import { MaterialManager } from './materials/manager';
import Base from './objects/base';
import Coco from './objects/palmtree/coco';
import Trunk from './objects/palmtree/trunk';
import Crown from './objects/palmtree/crown';
import Palmtree from './objects/palmtree';
import Cristal from './objects/cristal';
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
        cristal: 0xf937be,
        crown: 0x106cc1,
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

    // Crown Material
    MaterialManager.set('palmtree_crown', new THREE.MeshPhongMaterial(
      { color: this.options.colors.crown, shading: THREE.FlatShading }
    ));

    // Cristal Material
    MaterialManager.set('cristal', new THREE.MeshPhongMaterial(
      { color: this.options.colors.cristal, shading: THREE.FlatShading }
    ));

    // Sleep Material
    MaterialManager.set('palmtree_sleeping', new THREE.MeshPhongMaterial(
      { color: this.options.colors.sleep, shading: THREE.FlatShading }
    ));
  }

  populateScene() {

    // Base plane
    new Base(this.scene);

    //  test for multiples Palmtrees
    for (var i = 0; i < 12; i++) {

      let myName = 'PalmThree_';
      let index = i;
      let rd = Math.random();
      let randDist = THREE.Math.mapLinear(rd, -1, 1, 10, 60);
      let angl = THREE.Math.mapLinear(i, 0, 12, 0, Math.PI * 2);
      let scal = THREE.Math.mapLinear(i, 0, 12, 0.1, 1);
      let xPos = randDist * Math.cos(angl);
      let zPos = randDist * Math.sin(angl);

      new Palmtree(this.scene, {
        name: myName,
        index: i,
        position: {
          x: xPos,
          y: 0,
          z: zPos,
        },
      });
    }

    //Test Cristal
    let cristal = new Cristal(this.scene, {
      //name: 'Cristal_',
      position: {
        x: 0,
        y: -1,
        z: 0,
      },
    });



  }
}

$(document).ready(function () { new App(); });
