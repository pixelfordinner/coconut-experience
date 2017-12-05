import * as THREE from 'three';
import shaderParse from '../shaders/shaderparse.js';
import {
  MaterialManager
} from './manager';

const VERTEX = shaderParse(require('../shaders/transparence_basic/vertex.glsl'));
const FRAGMENT = shaderParse(require('../shaders/transparence_basic/fragment.glsl'));

let StripeMaterial = function (scene) {

  let uniforms = THREE.UniformsUtils.merge([{
      lightPos: {
        type: 'v3',
        value: scene.lights[0].position,
      },
      lightColor: {
        type: 'c',
        value: new THREE.Color(0xf937be),
      },
      diffuse: {
        type: 'c',
        value: new THREE.Color(0x106cc1),
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

  // let mat2 = new THREE.MeshLambertMaterial({
  //   transparent: true,
  //   opacity: 0.5,
  // });
  // mat2.depthWrite = false;

  let material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
    fog: true,
    lights: true,
    transparent: true,

  });
  MaterialManager.set('transparence_basic', material);
  return material;
};

export default StripeMaterial;
