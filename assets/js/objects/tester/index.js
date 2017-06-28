import * as THREE from 'three';
import Sphere from '../../geometry/sphere';
import { MaterialManager } from '../../materials/manager';
import Clock from '../../scene/clock';
import shaderParse from '../../shaders/shaderparse';
const glslify = require('glslify');

const defaultsDeep = require('lodash.defaultsdeep');
const FRAGMENT = glslify(shaderParse(require('raw-loader!shaderlib/distanceRGBA_frag.glsl'), true));
const VERTEX = shaderParse(require('../../shaders/depth/vertex.glsl'));

console.log('------ FRAGMENT -----');
console.log(FRAGMENT);

// console.log('------ VERTEX -----');
// console.log(VERTEX);

class Tester {
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
      name: 'Tester',
      widthSegments: 10,
      heightSegments: 10,
      castShadow: true,
      receiveShadow: false,
      physics: {
        type: 'sphere',
        move: true,
        density: 0.015,
        friction: 2,
        restitution: 0.1,
        belongsTo: 1,
        collidesWith: 0xffffffff,
      },
    };

    this.options = defaultsDeep(options, this.options);
    let sphere = new Sphere(this.options.radius,
                            this.options.widthSegments,
                            this.options.heightSegments);

    let material = MaterialManager.get('displacement');
    var mesh = new THREE.Mesh(sphere, material);

    let uniforms = {
      opacity: { type: 'f', value: 0.5 },
      iGlobalTime: { type: 'f', value: new Clock().getDelta(), hidden: 1 },
    };

    let defines = {
      DEPTH_PACKING: 3201,
    };

    mesh.customDepthMaterial = new THREE.ShaderMaterial({
      defines: defines,
      uniforms: material.uniforms,
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
    });
    console.log(mesh.customDepthMaterial);

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
    mesh.name = this.options.name;
    mesh.receiveShadow = this.options.receiveShadow;
    mesh.castShadow = this.options.castShadow;
    return scene.add(mesh, this.options.physics);
  }
}

export default Tester;