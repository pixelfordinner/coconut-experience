import * as THREE from 'three';
import {
  MaterialManager
} from '../../materials/manager';
import Box from '../../geometry/box';
import Sphere from '../../geometry/sphere';
const defaultsDeep = require('lodash.defaultsdeep');
import Clock from '../../scene/clock';
import shaderParse from '../../shaders/shaderparse';
const glslify = require('glslify');
const FRAGMENT = glslify(shaderParse(require('raw-loader!shaderlib/depth_frag.glsl'), true));
const VERTEX = shaderParse(require('../../shaders/displacement_box/depth_vertex.glsl'));

class Land {
  constructor(scene, options = {}) {
    this.options = {
      name: 'Land_',
      witdhSegments: 200,
      heightSegments: 200,
      size: {
        w: 1,
        z: 1,
      },
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
      receiveShadow: true,
      castShadow: true,
      physics: {
        type: 'box',
        move: false,
        density: 100,
        friction: 0.0,
        restitution: 0.0,
        belongsTo: 2,
        collidesWith: 0x000000,
      },
    };
    this.options = defaultsDeep(options, this.options);

    let plane = new THREE.BufferGeometry().fromGeometry(
      new THREE.PlaneGeometry(
        this.options.size.w,
        this.options.size.h,
        this.options.witdhSegments,
        this.options.heightSegments,
      )
    );
    plane.rotateX(-Math.PI / 2);
    plane.rotateY(Math.PI / 4);


    let material = MaterialManager.get('displacement_box');

    let mesh = new THREE.Mesh(plane, material);

    mesh.position.set(
      this.options.position.x,
      this.options.position.y,
      this.options.position.z
    );

    mesh.name = 'Montain';
    mesh.receiveShadow = this.options.receiveShadow;
    mesh.castShadow = this.options.castShadow;


    let defines = {
      DEPTH_PACKING: THREE.RGBADepthPacking,
    };

    let customDepthMaterial = new THREE.ShaderMaterial({
      defines: defines,
      uniforms: material.uniforms,
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
    });

    mesh.customDepthMaterial = customDepthMaterial;

    scene.add(mesh, this.options.physics);

    return Land;
  }
}

export default Land;
