import * as THREE from 'three';
import Sphere from '../../geometry/sphere';
import {
  MaterialManager
} from '../../materials/manager';
const defaultsDeep = require('lodash.defaultsdeep');

// import Clock from '../../scene/clock';
// import shaderParse from '../../shaders/shaderparse';
// const glslify = require('glslify');
// const FRAGMENT = glslify(shaderParse(require('raw-loader!shaderlib/depth_frag.glsl'), true));
// const VERTEX = shaderParse(require('../../shaders/displacement_depth/vertex.glsl'));

class Moon {
  constructor(scene, options = {}) {
    this.options = {
      radius: 1,
      index: 1,
      material: new THREE.MeshLambertMaterial(),
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
      name: 'Moon_',
      widthSegments: 20,
      heightSegments: 20,
      castShadow: false,
      receiveShadow: false,
      physics: {
        type: 'sphere',
        move: false,
        density: 1,
        friction: 0.0,
        restitution: 0.0,
        belongsTo: 3,
        collidesWith: 0x111111,
      },
    };

    this.options = defaultsDeep(options, this.options);

    let sphere = new Sphere(scene, {
      radius: this.options.radius,
      widthSegments: this.options.widthSegments,
      heightSegments: this.options.heightSegments,
    });

    // let geo = new THREE.IcosahedronGeometry(1, 3);

    let material = MaterialManager.get('absolute_white');


    var mesh = new THREE.Mesh(sphere, material);
    mesh.name = this.options.name + this.options.index;
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    mesh.scale.set(
      this.options.radius * this.options.scale.x,
      this.options.radius * this.options.scale.y,
      this.options.radius * this.options.scale.z
    );
    mesh.position.set(
      this.options.position.x,
      this.options.position.y,
      this.options.position.z
    );

    return scene.add(mesh, this.options.physics);
  }
}

export default Moon;
