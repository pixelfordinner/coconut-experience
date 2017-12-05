import * as THREE from 'three';
import {
  MaterialManager
} from '../../materials/manager';
import Box from '../../geometry/box';
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
      castShadow: false,
    };
    this.options = defaultsDeep(options, this.options);
    // Ground

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
    let plane2 = plane.clone();
    let material = MaterialManager.get('displacement_box');
    let material2 = MaterialManager.get('transparence_basic');

    let mesh = new THREE.Mesh(plane, material);

    mesh.position.set(
      this.options.position.x,
      this.options.position.y,
      this.options.position.z
    );

    mesh.name = this.options.name;
    mesh.receiveShadow = this.options.receiveShadow;
    mesh.castShadow = this.options.castShadow;

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

    let customDepthMaterial = new THREE.ShaderMaterial({
      uniforms: material.uniforms,
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
    });

    console.log(customDepthMaterial);
    mesh.customDepthMaterial = customDepthMaterial;

    scene.add(mesh, this.options.physics);

    let mesh2 = new THREE.Mesh(plane2, material2);

    mesh2.position.set(
      this.options.position.x,
      this.options.position.y + 2,
      this.options.position.z
    );

    mesh2.name = this.options.name + 'bis';
    mesh2.receiveShadow = false;
    mesh.castShadow = false;
    scene.add(mesh2, this.options.physics);

    return Land;
  }
}

export default Land;
