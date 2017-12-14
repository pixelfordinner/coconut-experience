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
        fog: 0x6331FF,
        background: 0x6331FF,
        blue: 0x106cc1,
        cyan: 0x74fbff,
        pink: 0xf937be,
        grey: 0x2b1354,
        white: 0xffffff,
        black: 0x000000,
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
    new DisplacementShaderMaterial(this.scene);
    new StripesMaterial(this.scene);
    new CelShadingMaterial(this.scene);
    new DisplacementBoxShaderMaterial(this.scene);
    new TransparenceMaterial(this.scene);
    new CelShadowMaterial(this.scene, new THREE.Color(0x2b2b2b), 'grey');
    new CelShadowMaterial(this.scene, new THREE.Color(0x61ffd9), 'blue');
    new CelShadowMaterial(this.scene, new THREE.Color(0xff5be0), 'pink');
    new ToonColorMaterial(this.scene, new THREE.Color(this.options.colors.grey), 'grey');
    new ToonColorMaterial(this.scene, new THREE.Color(this.options.colors.blue), 'blue');
    new ToonColorMaterial(this.scene, new THREE.Color(this.options.colors.cyan), 'cyan');
    new AbsoluteColorMaterial(this.scene, new THREE.Color(this.options.colors.white), 'white');
    new AbsoluteColorMaterial(this.scene, new THREE.Color(this.options.colors.black), 'black');
  }

  populateScene() {

    new Floor(this.scene, {
      size: {
        w: 9,
        h: 9,
      },
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
      scale: {
        x: 7,
        y: 8,
        z: 7,
      },
    });

    // new Palmtree(this.scene, {
    //   name: 'Palmtree_',
    //   index: 0,
    //   position: {
    //     x: 0.5,
    //     y: 7.45,
    //     z: 0.5,
    //   },
    // });
    //let WolfModelPath = require('./objects/models/index.json');
    new Wolf(this.scene);




    new Palmtree(this.scene, {
      name: 'Palmtree_',
      index: 1,
      position: {
        x: 7.5,
        y: 4.3,
        z: 7.5,
      },
    });
    new Palmtree(this.scene, {
      name: 'Palmtree_',
      index: 2,
      position: {
        x: 7.5,
        y: 4.3,
        z: -7.5,
      },
    });
    new Palmtree(this.scene, {
      name: 'Palmtree_',
      index: 3,
      position: {
        x: -7.5,
        y: 4.3,
        z: -7.5,
      },
    });
    new Palmtree(this.scene, {
      name: 'Palmtree_',
      index: 4,
      position: {
        x: -7.5,
        y: 4.3,
        z: 7.5,
      },
    });



    new Landscape(this.scene, {
      widthSegments: 100,
      heightSegments: 100,
      size: {
        w: 200,
        h: 200,
      },
      position: {
        x: 0,
        y: -15,
        z: 0,
      },
    });


    new Blob(this.scene, {
      name: 'Blob_',
      index: 0,
      radius: 2,
      widthSegments: 400,
      heightSegments: 400,
      position: {
        x: -20,
        y: 20,
        z: 5,
      },
      physics: {
        move: false,
      },
    });
  }
}

$(document).ready(function () {
  new App();
});
