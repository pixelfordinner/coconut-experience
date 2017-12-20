import * as THREE from 'three';
import {
  MaterialManager
} from './manager';

let Material = function (camera) {


  let material = new THREE.MeshPhongMaterial({
    color: new THREE.Color(0x6331FF),
    specular: new THREE.Color(0xffffff),
    transparent: false,
    opacity: 1.0,
    emissive: new THREE.Color(0xffffff),
    shininess: 100,
    envMap: camera.renderTarget.texture,
    reflectivity: .95,
  });

  MaterialManager.set('phong', material);
  return material;
};

export default Material;
