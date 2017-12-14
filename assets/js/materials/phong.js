import * as THREE from 'three';
import {
  MaterialManager
} from './manager';

let Material = function (camera) {

  let material = new THREE.MeshPhongMaterial({
    light: true,
    color: new THREE.Color(0xffffff),
    transparent: false,
    opacity: 0,
    shininess: 10,
    envMap: camera.renderTarget.texture,
    reflectivity : 1,
  });

  //material.envMap = camera.renderTarget.texture;
  //material.reflectivity = 0.2;

  MaterialManager.set('phong', material);
  return material;
};

export default Material;
