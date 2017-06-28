import * as THREE from 'three';
import shaderParse from '../shaders/shaderparse.js';
import { MaterialManager } from './manager';
import Clock from '../scene/clock';

const DISPLACEMENT_VERTEX = shaderParse(require('../shaders/displacement/vertex.glsl'));
const DISPLACEMENT_FRAGMENT = shaderParse(require('../shaders/displacement/fragment.glsl'));

let DisplacementMaterial = function () {

  let uniforms = THREE.UniformsUtils.merge([{
    iGlobalTime: { type: 'f', value: new Clock().getDelta(), hidden: 1 },
  },
    THREE.UniformsLib.fog,
    THREE.UniformsLib.lights,
  ]);

  // let defines = {
  //   USE_DISPLACEMENTMAP: true,
  //   DEPTH_PACKING: 3200,
  // };

  let material = new THREE.ShaderMaterial({
    //defines: defines,
    uniforms: uniforms,
    vertexShader: DISPLACEMENT_VERTEX,
    fragmentShader: DISPLACEMENT_FRAGMENT,
    fog: true,
    lights: true,
    transparent: true,
  });

  MaterialManager.set('displacement', material);
  return material;
};

export default DisplacementMaterial;
