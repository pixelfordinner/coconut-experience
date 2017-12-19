import * as THREE from 'three';

// GEOMETRY
import Sphere from './geometry/sphere';
import Cylinder from './geometry/cylinder';
import Box from './geometry/box';

// OBJECTS
import Scene from './scene';
import Floor from './objects/floor';
import Palmtree from './objects/palmtree';
import Blob from './objects/blob';
import Landscape from './objects/landscape';
import Wolf from './objects/loader';
import Moon from './objects/moon';
import Sky from './objects/sky';

// MATERIALS
import PhongMaterial from './materials/phong.js';
import AbsoluteColorMaterial from './materials/absolutecolormaterial.js';
import ToonColorMaterial from './materials/tooncolormaterial.js';
import StripesMaterial from './materials/stripesmaterial.js';
import CelShadingMaterial from './materials/celshadingmaterial.js';
import CelShadowMaterial from './materials/celshadingshadowmaterial.js';
import TransparenceMaterial from './materials/transparence_basic.js';
import ShadowShaderMaterial from './materials/shadowmaterial.js';
import DisplacementShaderMaterial from './materials/displacementmaterial.js';
import DisplacementBoxShaderMaterial from './materials/displacementbox.js';
import SmoothCloudMaterial from './materials/smoothcloudmaterial.js';
import MoonMaterial from './materials/moonmaterial.js';
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
          y: 20,
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
        fog: 0x330c91,
        background: 0x6331FF,
        blue: 0x106cc1,
        cyan: 0x74fbff,
        pink: 0xf937be,
        mediumgrey: 0x6e6e6e,
        lightgrey: 0xc7c7c7,
        darkpurple: 0x2b1354,
        darkblue: 0x330c91,
        white: 0xffffff,
        black: 0x000000,
        light_blue: 0xcdcaec,
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
    new PhongMaterial(this.scene.cubecamera);
    new ShadowShaderMaterial();
    new SmoothCloudMaterial();
    new MoonMaterial(this.scene);
    new DisplacementShaderMaterial(this.scene);
    new StripesMaterial(this.scene);
    new DisplacementBoxShaderMaterial(this.scene);
    new TransparenceMaterial(this.scene);


    new CelShadingMaterial(this.scene, new THREE.Color(this.options.colors.darkblue), 'darkblue');
    new CelShadingMaterial(this.scene, new THREE.Color(this.options.colors.blue), 'blue');
    new CelShadingMaterial(this.scene, new THREE.Color(this.options.colors.light_blue), 'lightblue');

    new CelShadowMaterial(this.scene, new THREE.Color(0x2b2b2b), 'grey');
    new CelShadowMaterial(this.scene, new THREE.Color(0x61ffd9), 'blue');
    new CelShadowMaterial(this.scene, new THREE.Color(0xff5be0), 'pink');
    new ToonColorMaterial(this.scene, new THREE.Color(this.options.colors.darkpurple), 'darkpurple');
    new ToonColorMaterial(this.scene, new THREE.Color(this.options.colors.blue), 'blue');
    new ToonColorMaterial(this.scene, new THREE.Color(this.options.colors.cyan), 'cyan');

    new AbsoluteColorMaterial(this.scene, new THREE.Color(this.options.colors.white), 'white');
    new AbsoluteColorMaterial(this.scene, new THREE.Color(this.options.colors.black), 'black');
    new AbsoluteColorMaterial(this.scene, new THREE.Color(this.options.colors.mediumgrey), 'mediumgrey');
    new AbsoluteColorMaterial(this.scene, new THREE.Color(this.options.colors.lightgrey), 'lightgrey');

  }

  populateScene() {

    new Moon(this.scene, {
      widthSegments: 30,
      heightSegments: 30,
      radius: 1,
      scale: {
        x: 150,
        y: 150,
        z: 150,
      },
      position: {
        x: -900,
        y: 15,
        z: -200,
      },
    });
  // new Sky(this.scene);
    new Floor(this.scene, {
      size: {
        w: 7,
        h: 7,
      },
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
      scale: {
        x: 6,
        y: 16,
        z: 6,
      },
    });

    new Wolf(this.scene);

    new Palmtree(this.scene, {
      name: 'Palmtree_',
      index: 1,
      position: {
        x: 0,
        y: 10,
        z: 6,
      },
    });
    new Palmtree(this.scene, {
      name: 'Palmtree_',
      index: 2,
      position: {
        x: 6,
        y: 8,
        z: -6,
      },
    });
  }
}

$(document).ready(function () {
  new App();
});
