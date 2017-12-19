import * as THREE from 'three';
import {
  MaterialManager
} from './manager';

let Material = function (camera) {


  let material = new THREE.MeshPhongMaterial({
    color: new THREE.Color(0xffffff),
    specular: new THREE.Color(0x555555),
    transparent: false,
    opacity: 1.0,
    emissive: new THREE.Color(0x6331FF),
    shininess: 300,
    envMap: camera.renderTarget.texture,
    reflectivity: 1,
  });

  MaterialManager.set('phong', material);
  return material;
};

export default Material;
