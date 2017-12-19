import { MaterialManager } from '../../materials/manager';
import Sphere from '../../geometry/sphere';
import * as THREE from 'three';
const defaultsDeep = require('lodash.defaultsdeep');

class Sky {
  constructor(scene, options = {}) {
    this.options = {
      position: {
        x: 0,
        y: 15,
        z: 0,
      },
      name: 'Sky',
      radius: 60,
      widthSegments: 20,
      heightSegments: 20,
      receiveShadow: false,
      castShadow: false,
      physics: {
        type: 'sphere',
        move: false,
        density: 100,
        friction: 0.2,
        restitution: 0.2,
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
    let material = MaterialManager.get('smooth_cloud');
    material.side = THREE.BackSide;
    let mesh = new THREE.Mesh(sphere, material);
    mesh.name = this.options.name;
    mesh.position.set(
      this.options.position.x,
      this.options.position.y,
      this.options.position.z,
    );
    mesh.rotateY(-Math.PI);
    scene.add(mesh);

    return mesh;

  }
}

export default Sky;
