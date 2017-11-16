import * as THREE from 'three';
import Sphere from '../../geometry/sphere';
import {
  MaterialManager
} from '../../materials/manager';
import Clock from '../../scene/clock';
import shaderParse from '../../shaders/shaderparse';
const glslify = require('glslify');

const defaultsDeep = require('lodash.defaultsdeep');
const FRAGMENT = glslify(shaderParse(require('raw-loader!shaderlib/distanceRGBA_frag.glsl'), true));
const VERTEX = shaderParse(require('../../shaders/depth/vertex.glsl'));

// console.log('------ FRAGMENT -----');
// console.log(FRAGMENT);
// console.log('------ VERTEX -----');
// console.log(VERTEX);

class Blob {
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
      name: 'Blob',
      widthSegments: 10,
      heightSegments: 10,
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

    //console.log('blob_segments :' + this.options.widthSegments);
    let sphere = new Sphere(scene, {
      radius: this.options.radius,
      widthSegments: this.options.widthSegments,
      heightSegments: this.options.heightSegments,
    });

    //let geo = new THREE.IcosahedronGeometry(1, 3);
    let material = MaterialManager.get('displacement');



    let uniforms = THREE.UniformsUtils.merge([{

        opacity: {
          type: 'f',
          value: 1.0,
        },
        iGlobalTime: {
          type: 'f',
          value: new Clock().getDelta(),
          hidden: 1,
        },
        lightPos: {
          type: 'v3',
          value: scene.lights[1].position,
        },
      },
      THREE.UniformsLib.lights,
    ]);

    let defines = {
      DEPTH_PACKING: 3200,
    };

    material.customDepthMaterial = new THREE.ShaderMaterial({
      defines: defines,
      uniforms: material.uniforms,
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
    });

    var mesh = new THREE.Mesh(sphere, material);
    mesh.receiveShadow = this.options.receiveShadow;
    mesh.castShadow = this.options.castShadow;

    // material.customDepthMaterial = new THREE.ShaderMaterial({
    //   //defines: defines,
    //   uniforms: material.uniforms,
    //   vertexShader: VERTEX,
    //   fragmentShader: FRAGMENT,
    // });
    // mesh.customDepthMaterial = new THREE.ShaderMaterial({
    //   //defines: defines,
    //   uniforms: material.uniforms,
    //   vertexShader: VERTEX,
    //   fragmentShader: FRAGMENT,
    // });

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

export default Blob;
