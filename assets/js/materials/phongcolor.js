import * as THREE from 'three';
import { MaterialManager } from './manager';

let Material = function (camera, color, emissive, specular, name) {

  let material = new THREE.MeshPhongMaterial({
    color: new THREE.Color(color),
    emissive: new THREE.Color(emissive),
    specular: new THREE.Color(specular),
    opacity: 1.0,
    shininess: 100,
    reflectivity: .75,
    flatShading: true,
    transparent: false,
  });

  MaterialManager.set('phong_' + name, material);
  return material;
};

export default Material;
