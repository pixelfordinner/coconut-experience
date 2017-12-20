import * as THREE from 'three';
import {
  MaterialManager
} from './manager';

let Material = function (scene, camera) {


  let material = new THREE.MeshPhongMaterial({
    color: new THREE.Color(scene.options.colors.bluishgrey),
    specular: new THREE.Color(scene.options.colors.cyan),
    transparent: false,
    opacity: 1.0,
    emissive: new THREE.Color(scene.options.colors.purple),
    shininess: 100,
    envMap: camera.renderTarget.texture,
    reflectivity: .95,
  });

  MaterialManager.set('phong', material);
  return material;
};

export default Material;
