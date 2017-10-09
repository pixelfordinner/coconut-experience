import * as THREE from 'three';

//import Sphere from '../../../geometry/sphere';
import Cylinder from '../../../geometry/cylinder';
import Sphere from '../../../geometry/sphere';

import { MaterialManager } from '../../../materials/manager';

const defaultsDeep = require('lodash.defaultsdeep');

class Cone {
  constructor(scene, options = {}) {
    this.options = {
      radius: 1,
      name: 'Cone_',
      castShadow: true,
      receiveShadow: false,
      scale:
      {
        radius: 1,
        height: 1,
      },
      position:
      {
        x: 0,
        y: 0,
        z: 0,
      },
      cylinder:
      {
        radiusTop: 0.5,
        radiusBottom: 0.025,
        height: 1,
        radiusSegments: 4,
        heightSegments: 1,
        openEnded: false,
      },
      physics:
      {
        type: 'cylinder',
        move: true,
        density: 0.5,
        friction: 0.01,
        restitution: 0.1,
        belongsTo: 1,
        collidesWith: 0xffffffff,
      },
    };

    this.options = defaultsDeep(options, this.options);
    let shape = new Cylinder(this.options.cylinder);

    // REMAP cylinder UVs
    let Uv = shape.attributes.uv;
    for (var i = 0; i < shape.attributes.uv.count; i++) {
      let UVx = Uv.getX(i);
      let UVy = Uv.getY(i);
      let UVw = Uv.getW(i);

      if (UVy !== 0) {
        shape.attributes.uv.setX(i, 0.5);
      } else {
        shape.attributes.uv.setX(i, 1);
      }
    }

    let material = MaterialManager.get('cel_stripes_H');

    // CONFIGURATION
    var mesh = new THREE.Mesh(shape, material);
    mesh.scale.set(
      this.options.scale.radius,
      this.options.scale.height,
      this.options.scale.radius,
    );
    mesh.position.set(
      this.options.position.x,
      this.options.position.y,
      this.options.position.z,
    );

    mesh.name = this.options.name;
    mesh.receiveShadow = this.options.receiveShadow;
    mesh.castShadow = this.options.castShadow;

    this.options.physics.size = [
      this.options.cylinder.radiusTop * this.options.scale.radius * 2,
      this.options.cylinder.height * this.options.scale.height,
      this.options.cylinder.radiusBottom * this.options.scale.radius * 2,
    ];

    return scene.add(mesh, this.options.physics);
  }
}

export default Cone;
