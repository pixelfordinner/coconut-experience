import * as THREE from 'three';
import Sphere from '../../geometry/sphere';
import {
  MaterialManager
} from '../../materials/manager';
import Clock from '../../scene/clock';
import shaderParse from '../../shaders/shaderparse';
const glslify = require('glslify');
const defaultsDeep = require('lodash.defaultsdeep');
const FRAGMENT = glslify(shaderParse(require('raw-loader!shaderlib/depth_frag.glsl'), true));
const VERTEX = shaderParse(require('../../shaders/displacement_depth/vertex.glsl'));

// console.log('------ FRAGMENT -----');
// console.log(FRAGMENT);
// console.log('------ VERTEX -----');
// console.log(VERTEX);

class Blob {
  constructor(scene, options = {}) {
    this.options = {
      radius: 1,
      index: 1,
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
      name: 'Blob_',
      widthSegments: 1000,
      heightSegments: 1000,
      castShadow: true,
      receiveShadow: true,
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

    let sphere = new Sphere(scene, {
      radius: this.options.radius,
      widthSegments: this.options.widthSegments,
      heightSegments: this.options.heightSegments,
    });

    // let geo = new THREE.IcosahedronGeometry(1, 3);

    let material = MaterialManager.get('displacement');
    let uniforms = THREE.UniformsUtils.merge([{

        opacity: {
          type: 'f',
          value: 0.5,
        },
        iGlobalTime: {
          type: 'f',
          value: new Clock().getDelta(),
          hidden: 1,
        },
        lightPos: {
          type: 'v3',
          value: scene.lights[0].position,
        },
      },
      THREE.UniformsLib.lights,
    ]);

    let defines = {
      DEPTH_PACKING: THREE.RGBADepthPacking,
    };

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

    let customDepthMaterial = new THREE.ShaderMaterial({
      defines: defines,
      uniforms: material.uniforms,
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
    });

    console.log(customDepthMaterial);
    mesh.customDepthMaterial = customDepthMaterial;

    this.options.physics.size = [
      this.options.radius * this.options.scale.x,
      this.options.radius * this.options.scale.y,
      this.options.radius * this.options.scale.z,
    ];
    return scene.add(mesh, this.options.physics);
  }
}

export default Blob;
