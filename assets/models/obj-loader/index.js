// let loader = new THREE.JSONLoader();
// loader.load('monster.json', function (geometry, materials) {
//   let mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
//   scene.add(mesh);
// });
import * as THREE from 'three';
const defaultsDeep = require('lodash.defaultsdeep');

class Model {
  constructor(scene, options = {}) {
    this.options = {
      name: 'loader',
      width: 1,
      height: 1,
      depth: 1,
      file: 'example.json',
    };

    this.options = defaultsDeep(options, this.options);
    this.loader = new THREE.JSONLoader();
    this.loader.load('monster.json', function (geometry, materials) {
      let mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
      scene.add(mesh);
    });

    return scene.add(mesh);
  }

}

export default Model;
