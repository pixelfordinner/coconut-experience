import * as THREE from 'three';
import Sphere from '../../geometry/sphere';
import { MaterialManager } from '../../materials/manager';
import Clock from '../../scene/clock';
import shaderParse from '../../shaders/shaderparse';
const defaultsDeep = require('lodash.defaultsdeep');

class Wolf {
  constructor(scene, options = {}) {
    this.options = {
      radius: 1,
      scale: {
        x: 1,
        y: 1,
        z: 1,
      },
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
      name: 'Wolf',
      castShadow: true,
      receiveShadow: false,
    };

    this.options = defaultsDeep(options, this.options);
    let sphere = new Sphere(this.options.radius,
                            this.options.widthSegments,
                            this.options.heightSegments);

    let material = MaterialManager.get('ground');
    let mesh = new THREE.Mesh(sphere, material);
  //  let manager = new THREE.LoadingManager();

    //let OBJloader = require('three-obj-loader');

    //var THREE = require('three');
    var OBJLoader = require('three-obj-loader');
    OBJLoader(THREE);

    let loader = THREE.OBJLoader;
    console.log(loader);
    //let wolfpath = '../../../models/wolf/p4d-wolf.obj';
  //  loader.load('../../../models/wolf/p4d-wolf.obj');

    // mesh.scale.set(
    //   this.options.radius * this.options.scale.x,
    //   this.options.radius * this.options.scale.y,
    //   this.options.radius * this.options.scale.z
    // );
    // mesh.position.set(
    //   this.options.position.x,
    //   this.options.position.y,
    //   this.options.position.z
    // );
    // mesh.name = this.options.name;
    // mesh.receiveShadow = this.options.receiveShadow;
    // mesh.castShadow = this.options.castShadow;
    return loader;
  }
}

export default Wolf;

//var OBJLoader = require('three-obj-loader');
//OBJLoader(THREE);

//console.log(typeof THREE.OBJLoader);
