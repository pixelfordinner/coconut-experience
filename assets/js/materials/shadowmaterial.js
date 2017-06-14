import * as THREE from 'three';

import shaderParse from '../shaders/shaderparse.js';
import { MaterialManager } from './manager';

const B_S_VERTEX = shaderParse(require('../shaders/basic_shadows/vertex.glsl'));
const B_S_FRAGMENT = shaderParse(require('../shaders/basic_shadows/fragment.glsl'));

let ShadowMaterial = function () {

  let uniforms = THREE.UniformsUtils.merge([{
      opacity: { type: 'f', value: 0.99 },
      diffuse: { type: 'c', value: new THREE.Color(0xffffff) },
      diffshadow: { type: 'c', value: new THREE.Color(0xf937be) },
    },
        THREE.UniformsLib.fog,
        THREE.UniformsLib.lights,
    ]);

  let material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: B_S_VERTEX,
    fragmentShader: B_S_FRAGMENT,
    fog: true,
    lights: true,
    transparent: true,

  });
  MaterialManager.set('basic_shadows', material);
  return material;
};

export default ShadowMaterial;
