import * as THREE from 'three';

// GEOMETRY
import Sphere from './geometry/sphere';

// OBJECTS
import Scene from './scene';
import Base from './objects/base';
import SimpleBase from './objects/simplebase';
import Terrain from './objects/terrain';
import Coco from './objects/palmtree/coco';
import Trunk from './objects/palmtree/trunk';
import Crown from './objects/palmtree/crown';
import Palmtree from './objects/palmtree';
import IceCream from './objects/icecream';
import Cristal from './objects/cristal';
import Tester from './objects/tester';
import Sky from './objects/sky';
import Wolf from './objects/wolf';

// MATERIALS
import ShaderMaterial from './materials/shadermaterial.js';
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

////////////////////// SHADERS //////////////////////
// BASIC WITH FOG
const BasicFragment = require('./shaders/basic/fragment.glsl');
const BasicVertex = require('./shaders/basic/vertex.glsl');
const F_W_FRAGMENT = shaderParse(require('./shaders/fake_water/fragment.glsl'));
const F_W_VERTEX = shaderParse(require('./shaders/fake_water/vertex.glsl'));

// STRIPES
const StripesFragment = require('./shaders/stripes/fragment.glsl');
const StripesVertex = require('./shaders/stripes/vertex.glsl');

// X axis STRIPES
const StripesHFragment = require('./shaders/stripes2/fragment.glsl');
const StripesHVertex = require('./shaders/stripes2/vertex.glsl');

// full Shader WIP

const CelFragment = require('./shaders/cel/fragment.glsl');
const CelVertex = require('./shaders/cel/vertex.glsl');

const C_V_FRAGMENT = require('./shaders/v_cstripes/fragment.glsl');
const C_V_VERTEX = require('./shaders/v_cstripes/vertex.glsl');

const C_H_FRAGMENT = require('./shaders/h_cstripes/fragment.glsl');
const C_H_VERTEX = require('./shaders/h_cstripes/vertex.glsl');

const C_FRAGMENT = require('./shaders/celbasic/fragment.glsl');
const C_VERTEX = require('./shaders/celbasic/vertex.glsl');

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
          x: 1.3,
          y: .66,
          z: .5,
        },
      },
      colors: {
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
          factor: .012,
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
    MaterialManager.set('ground', new THREE.MeshPhongMaterial({
      color: this.options.colors.ground,
      shading: THREE.FlatShading,
    }));

    MaterialManager.set('white', new THREE.MeshPhongMaterial({
      color: this.options.colors.white,
      emissive: this.options.colors.white,
      specular: this.options.colors.white,
      shading: THREE.FlatShading,
    }));

    MaterialManager.set('black', new THREE.MeshPhongMaterial({
      color: this.options.colors.black,
      emissive: this.options.colors.black,
      specular: this.options.colors.black,
      shading: THREE.FlatShading,
    }));

    // Shadow Material

    MaterialManager.set('ground_2', new THREE.ShadowMaterial());
    MaterialManager.get('ground_2').opacity = 0.1;

    // Coco Material
    MaterialManager.set('palmtree_coco', new THREE.MeshPhongMaterial({
      color: this.options.colors.coco,
      shading: THREE.FlatShading,
    }));

    // Segment Materiall
    MaterialManager.set('palmtree_trunk', new THREE.MeshPhongMaterial({
      color: this.options.colors.trunk,
      shading: THREE.FlatShading,
    }));

    // Crown Material
    MaterialManager.set('palmtree_crown', new THREE.MeshPhongMaterial({
      color: this.options.colors.crown,
      shading: THREE.FlatShading,
    }));

    // Cristal Material
    MaterialManager.set('cristal', new THREE.MeshPhongMaterial({
      color: this.options.colors.cristal,
      shading: THREE.FlatShading,
      wireframe: true,
    }));

    // Sleep Material
    MaterialManager.set('palmtree_sleeping', new THREE.MeshPhongMaterial({
      color: this.options.colors.sleep,
      shading: THREE.FlatShading,
    }));

    //Toon Material

    MaterialManager.set('toon', new THREE.MeshToonMaterial({
      bumpScale: 10,
      color: this.options.colors.cristal,
      specular: this.options.colors.light,
      reflectivity: 2,
      shininess: 1,
      shading: THREE.SmoothShading,
    }));

    // Shaders Material
    // BASIC SHADER WITH FOG INTEGRATION
    let uniforms = {
      diffuse: {
        type: 'c',
        value: new THREE.Color(0xffffff),
      },
      alpha: {
        type: 'f',
        value: 0.5,
        min: 0.0,
        max: 1.0,
      },
      fogColor: {
        type: 'c',
        value: this.scene.scene.fog.color,
      },
      fogNear: {
        type: 'f',
        value: this.scene.scene.fog.near,
      },
      fogFar: {
        type: 'f',
        value: this.scene.scene.fog.far,
      },
      fogDensity: {
        type: 'f',
        value: this.scene.scene.fog.density,
      },
      fogFactor: {
        type: 'f',
        value: 0.009,
      },
    };

    MaterialManager.set('basic',
      new ShaderMaterial(
        uniforms,
        BasicVertex,
        BasicFragment,
        false
      ));

    //STRIPES SHADER
    uniforms = {
      color1: {
        type: 'c',
        value: new THREE.Color(0x000000)
      },
      alpha1: {
        type: 'f',
        value: 1.0,
        min: 0.0,
        max: 1.0
      },
      color2: {
        type: 'c',
        value: new THREE.Color(0xffffff)
      },
      alpha2: {
        type: 'f',
        value: 0.1,
        min: 0.0,
        max: 1.0
      },
      lines: {
        type: 'f',
        value: 6,
        min: 1,
        max: 10
      },
      linewidth: {
        type: 'f',
        value: 40.0,
        min: 0.0,
        max: 100.0
      },
      fogColor: {
        type: 'c',
        value: this.scene.scene.fog.color
      },
      fogNear: {
        type: 'f',
        value: this.scene.scene.fog.near
      },
      fogFar: {
        type: 'f',
        value: this.scene.scene.fog.far
      },
      fogDensity: {
        type: 'f',
        value: this.scene.scene.fog.density
      },
      fogFactor: {
        type: 'f',
        value: 0.008
      },
      iGlobalTime: {
        type: 'f',
        value: this.scene.clock.getDelta(),
        hidden: 1
      },
    };
    MaterialManager.set('stripes',
      new ShaderMaterial(
        uniforms,
        StripesVertex,
        StripesFragment,
        true
      ));
    MaterialManager.set('stripes_H',
      new ShaderMaterial(
        uniforms,
        StripesHVertex,
        StripesHFragment,
        true
      ));

    uniforms = THREE.UniformsUtils.merge([{
        iGlobalTime: {
          type: 'f',
          value: this.scene.clock.getDelta(),
          hidden: 1
        },
      },
      THREE.UniformsLib.fog,
      THREE.UniformsLib.lights,
    ]);

    MaterialManager.set('Fake_Water',
      new ShaderMaterial(
        uniforms,
        F_W_VERTEX,
        F_W_FRAGMENT,
        true
      ));

    // CELShader

    uniforms = THREE.UniformsUtils.merge([{
        lightPos: {
          type: 'v3',
          value: this.scene.lights[1].position
        },
        iGlobalTime: {
          type: 'f',
          value: this.scene.clock.getDelta(),
          hidden: 1
        },
      },
      THREE.UniformsLib.fog,
      THREE.UniformsLib.lights,
    ]);

    MaterialManager.set('celshader',
      new MakeMaterial(
        uniforms,
        CelVertex,
        CelFragment,
        false
      ));

    uniforms = THREE.UniformsUtils.merge([{
        uDirLightPos: {
          type: 'v3',
          value: this.scene.lights[1].position
        },
        uDirLightColor: {
          type: 'c',
          value: new THREE.Color(0xf937be)
        },
        uMaterialColor: {
          type: 'c',
          value: new THREE.Color(0x106cc1)
        },
        uMaterialColor2: {
          type: 'c',
          value: new THREE.Color(0xcdcaec)
        },
        uKd: {
          type: 'f',
          value: 1.5
        },
        uBorder: {
          type: 'f',
          value: 2.0,
        },
        iGlobalTime: {
          type: 'f',
          value: this.scene.clock.getDelta(),
          hidden: 1
        },
      },
      THREE.UniformsLib.fog,
      THREE.UniformsLib.lights,
    ]);

    MaterialManager.set('cel_stripes_V',
      new MakeMaterial(
        uniforms,
        C_V_VERTEX,
        C_V_FRAGMENT,
        false
      ));

    MaterialManager.set('cel_stripes_H',
      new MakeMaterial(
        uniforms,
        C_H_VERTEX,
        C_H_FRAGMENT,
        false
      ));
    MaterialManager.get('cel_stripes_H').WrapT;

    MaterialManager.set('cel_basic',
      new MakeMaterial(
        uniforms,
        C_VERTEX,
        C_FRAGMENT,
        false
      ));

    new ShadowShaderMaterial();
    new CloudShaderMaterial();
    new SmoothCloudShaderMaterial();

    //console.log('cloud',  MaterialManager.get('cloud'));
    new DisplacementShaderMaterial(this.scene);

    //console.log('displacement',  MaterialManager.get('displacement'));

  }

  populateScene() {

    // Base plane
    //new Base(this.scene);
      new SimpleBase(this.scene);

    // test for multiples Palmtrees
    for (var i = 0; i < 10; i++) {

      let myName = 'Palmtree_';
      let index = i;
      let rd = Math.random();

      // let randDist = THREE.Math.mapLinear(rd, 0, 1, 10, 20);
      let randDist = 20.0;
      let angl = THREE.Math.mapLinear(i, 0, 10, 0, Math.PI * 2);
      let scal = THREE.Math.mapLinear(i, 0, 10, 0.1, 1);
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

    // TEST    IceCream

    for (var i = 0; i < 2; i++) {

      let rd = Math.random();
      let randX = THREE.Math.mapLinear(rd, 0, 1, -10, 10);
      rd = Math.random();
      let randY = THREE.Math.mapLinear(rd, 0, 1, 3, 5);
      rd = Math.random();
      let randZ = THREE.Math.mapLinear(rd, 0, 1, -10, 10);

      let icecream = new IceCream(this.scene, {
        index: i,
        position: {
          x: randX,
          y: randY,
          z: randZ,
        },
      });
    }

    let blob = new Tester(this.scene, {
      radius: 3,
      position: {
        x: -6,
        y: 3,
        z: 0,
      },
      physics: {
        move: true,
      },
    });

    // let sky = new Sky(this.scene, {
    //   radius: 110,
    // });

  }

}

$(document).ready(function() {
  new App();
});