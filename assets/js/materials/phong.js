import * as THREE from 'three';
import {
  MaterialManager
} from './manager';

let Material = function (camera) {

  let material = new THREE.MeshPhongMaterial({
    light: true,
    color: new THREE.Color(0xffffff),
    specular: new THREE.Color(0x111111),
    transparent: false,
    opacity: 0,
    emissive: new THREE.Color(0x999999),
    shininess: 40,
    envMap: camera.renderTarget.texture,
    reflectivity : 0.95,
  });

  MaterialManager.set('phong', material);
  return material;
};

export default Material;
