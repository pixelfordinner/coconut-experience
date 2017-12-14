import * as THREE from 'three';
import shaderParse from '../shaders/shaderparse.js';
import { MaterialManager } from './manager';
import Clock from '../scene/clock';

const DISPLACEMENT_VERTEX = shaderParse(require('../shaders/displacement_box/vertex.glsl'));
const DISPLACEMENT_FRAGMENT = shaderParse(require('../shaders/displacement_box/fragment.glsl'));

let DisplacementMaterial = function (scene) {

  let uniforms = THREE.UniformsUtils.merge([{
    iGlobalTime: { type: 'f', value: new Clock().getDelta(), hidden: 1 },
    diffuse: { type: 'c', value: new THREE.Color(0x106cc1) },
    diffuse2: { type: 'c', value: new THREE.Color(0xcdcaec) },
    lightColor:	{ type: 'c', value: new THREE.Color(0xf937be) },
    lightPos:	{ type: 'v3', value: scene.lights[0].position },
  },
    THREE.UniformsLib.fog,
    THREE.UniformsLib.lights,
  ]);

  //console.log(scene);
  let material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: DISPLACEMENT_VERTEX,
    fragmentShader: DISPLACEMENT_FRAGMENT,
    fog: true,
    lights: true,
    transparent: false,
    wireframe: false,
  });

  material.side = THREE.DoubleSide;
  MaterialManager.set('displacement_box', material);
  return material;
};

export default DisplacementMaterial;
