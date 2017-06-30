import * as THREE from 'three';

import shaderParse from '../shaders/shaderparse.js';
import { MaterialManager } from './manager';

const VERTEX = shaderParse(require('../shaders/cloud/vertex.glsl'));
const FRAGMENT = shaderParse(require('../shaders/cloud/fragment.glsl'));

let CloudMaterial = function () {

  let uniforms = THREE.UniformsUtils.merge([{
      opacity: { type: 'f', value: 0.75 },
      diffuse: { type: 'c', value: new THREE.Color(0xcdcaec) },
      diffshadow: { type: 'c', value: new THREE.Color(0x106cc1) },
      iGlobalTime: { type: 'f', value: 0.0 },
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
  MaterialManager.set('cloud', material);
  return material;
};

export default CloudMaterial;
