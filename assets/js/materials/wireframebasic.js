import * as THREE from 'three';
import shaderParse from '../shaders/shaderparse.js';
import { MaterialManager } from './manager';

let Material = function (scene) {

  let material = new THREE.MeshPhongMaterial({
    color: new THREE.Color(0xffffff),
    emissive: new THREE.Color(scene.options.colors.bluishgrey),
    specular: new THREE.Color(scene.options.colors.lightcyan),
    opacity: 0.4,
    shininess: 100,
    reflectivity: 1.0,
    flatShading: true,
    transparent: true,
    wireframe: true,
  });
  material.side = THREE.FrontSide;
  MaterialManager.set('wireframe_basic', material);
  return material;
};

export default Material;
