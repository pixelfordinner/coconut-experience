import * as THREE from 'three';
import shaderParse from '../shaders/shaderparse.js';
import { MaterialManager } from './manager';
//import Clock from '../scene/clock';

const VERTEX = shaderParse(require('../shaders/celshading_stripes/vertex.glsl'));
const FRAGMENT = shaderParse(require('../shaders/celshading_stripes/fragment.glsl'));

let StripeMaterial = function (scene) {

  let uniforms = THREE.UniformsUtils.merge([{
      uDirLightPos: {
        type: 'v3',
        value: scene.lights[1].position,
      },
      uDirLightColor: {
        type: 'c',
        value: new THREE.Color(0xf937be),
      },
      uMaterialColor: {
        type: 'c',
        value: new THREE.Color(0x106cc1),
      },
      uMaterialColor2: {
        type: 'c',
        value: new THREE.Color(0xcdcaec),
      },
      uKd: {
        type: 'f',
        value: 1.5,
      },
      uBorder: {
        type: 'f',
        value: 2.0,
      },
      iGlobalTime: {
        type: 'f',
        value: scene.clock.getDelta(),
        hidden: 1,
      },
    },
    THREE.UniformsLib.fog,
    THREE.UniformsLib.lights,
  ]);

  let material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
    fog: true,
    lights: true,
    transparent: true,

  });
  MaterialManager.set('celshading_stripes_material', material);
  return material;
};

export default StripeMaterial;
