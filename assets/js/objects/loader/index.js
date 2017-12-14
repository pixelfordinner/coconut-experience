import * as THREE from 'three';
import {
  MaterialManager
} from '../../materials/manager';
const $ = require('jquery');

class Loader {
  constructor(scene) {
    let loadedGeometry = false;
    this.manager = new THREE.LoadingManager();
    this.manager.onStart = function (url, itemsLoaded, itemsTotal) {
      console.log('Started loading file: ' + url);
    };

    this.manager.onLoad = function () {
      console.log('success');
      loadedGeometry = true;
    };

    this.manager.onProgress = function (url, itemsLoaded, itemsTotal) {
      console.log('.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
    };

    this.manager.onError = function (url) {
      console.log('There was an error loading ' + url);
    };

    let model;
    let material = MaterialManager.get('toon_blue');
    this.loader = new THREE.JSONLoader(this.manager);
    this.loader.load('assets/js/objects/models/wolf.json', addShape);

    function addShape(geometry) {
      console.log(geometry);
      model = new THREE.Mesh(geometry, material);
      model.scale.set(2, 2, 2);
      model.position.set(0, 15, 0);
      model.name = 'Wolf';
      model.traverse(function (node) {
        if (node instanceof THREE.Mesh) {
          node.castShadow = true;
          node.receiveShadow = true;
        }
      });

      scene.add(model);
    }

    return this.loader;

  }
}

export default Loader;
