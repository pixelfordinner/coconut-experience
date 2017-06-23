import * as THREE from 'three';
import Sphere from '../../../geometry/sphere';
import { MaterialManager } from '../../../materials/manager';

const defaultsDeep = require('lodash.defaultsdeep');

class Ball {
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
      name: '_Ball_',
      index: 0,
      castShadow: true,
      receiveShadow: false,
      physics: {
        type: 'sphere',
        move: true,
        density: 0.05,
        friction: 0.01,
        restitution: 0.1,
        belongsTo: 1,
        collidesWith: 0xffffffff,
      },
    };

    this.options = defaultsDeep(options, this.options);

    let shape = new Sphere();
    let material = MaterialManager.get('cel_stripes_V');

    // MAP cylinder UVs
    let Uv = shape.attributes.uv;
    for (var i = 0; i < shape.attributes.uv.count; i++) {

      let UVx = Uv.getX(i);
      let UVy = Uv.getY(i);
      let UVw = Uv.getW(i);

      switch (this.options.index) {
        case 0:
          shape.attributes.uv.setX(i, 0.0);
          break;
        case 1:
          shape.attributes.uv.setX(i, UVy / 0.5);
          break;
        case 2:
          shape.attributes.uv.setY(i, UVx / 0.1);
          break;
        case 3:
          shape.attributes.uv.setX(i,  UVy + UVx / 2.0 );
          break;
        default:
      }
    }

    var mesh = new THREE.Mesh(shape, material);
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

export default Ball;
