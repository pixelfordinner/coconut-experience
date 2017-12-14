import * as THREE from 'three';
import shaderParse from '../shaders/shaderparse.js';
import {
  MaterialManager
} from './manager';

const VERTEX = shaderParse(require('../shaders/absolute_color/vertex.glsl'));
const FRAGMENT = shaderParse(require('../shaders/absolute_color/fragment.glsl'));

let CelShadingMaterial = function (scene, color, name) {

  let uniforms = THREE.UniformsUtils.merge([{

      diffuse: {
        type: 'c',
        value: color,
      },
      iGlobalTime: {
        type: 'f',
        value: scene.clock.getDelta(),
        hidden: 1,
      },
    },
    THREE.UniformsLib.fog,
  ]);

  let material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
    fog: true,
    lights: false,
    transparent: false,

  });
  //material.depthWrite = false;
  //material.side = THREE.DoubleSide;
  MaterialManager.set('absolute_' + name, material);

  return material;
};

export default CelShadingMaterial;
