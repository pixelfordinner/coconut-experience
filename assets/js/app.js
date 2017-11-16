import * as THREE from 'three';

// GEOMETRY
import Sphere from './geometry/sphere';
import Cylinder from './geometry/cylinder';
import Box from './geometry/box';

// OBJECTS
import Scene from './scene';
import SimpleBase from './objects/simplebase';
import Archi from './objects/architecture';
import Palmtree from './objects/palmtree';
import IceCream from './objects/icecream';
import Blob from './objects/blob';

// MATERIALS
import ShaderMaterial from './materials/shadermaterial.js';
import StripesMaterial from './materials/stripesmaterial.js';
import CelShadingMaterial from './materials/celshadingmaterial.js';
import ShadowShaderMaterial from './materials/shadowmaterial.js';
import DisplacementShaderMaterial from './materials/displacementmaterial.js';
import CloudShaderMaterial from './materials/cloudmaterial.js';
import SmoothCloudShaderMaterial from './materials/smoothcloudmaterial.js';
import MakeMaterial from './materials/makematerial.js';
import shaderParse from './shaders/shaderparse.js';

// MATERIAL MANAGER
import {
  MaterialManager
} from './materials/manager';

// JQUERY
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
          x: 0,
          y: 3,
          z: -1,
        },
      },
      colors: {
        purple: 0x6331FF,
        background: 0x6331FF,
        fog: 0x6331FF,
        ground: 0xcdcaec,
        white: 0xffffff,
        black: 0x000000,
        sleep: 0x4d7edd,
        coco: 0x106cc1,
        trunk: 0x106cc1,
        cristal: 0xf937be,
        crown: 0x106cc1,
        light: 0xcdcaec,
      },
      scene: {
        fog: {
          factor: .010,
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

    MaterialManager.set('basic_material', new THREE.MeshPhongMaterial({
      color: this.options.colors.ground,
      shading: THREE.FlatShading,
    }));

    new ShadowShaderMaterial();
    new CloudShaderMaterial();
    new SmoothCloudShaderMaterial();
    new DisplacementShaderMaterial(this.scene);
    new StripesMaterial(this.scene);
    new CelShadingMaterial(this.scene);

  }

  populateScene() {

    new SimpleBase(this.scene);
    new Sphere(this.base);
    new Palmtree(this.scene, {
      name: 'Tree',
      index: 1,
      position: {
        x: 10,
        y: 0,
        z: 5,
      },
    });
    new Blob(this.scene, {
      name: 'Blob',
      radius: 2,
      widthSegments: 10,
      heightSegments: 10,
      position: {
        x: -6,
        y: 2,
        z: -8,
      },
      physics: {
        move: true,
      },
    });
  }
}

$(document).ready(function () {
  new App();
});
