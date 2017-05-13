import * as THREE from 'three';
import { MaterialManager } from '../../../materials/manager';
import Cylinder from '../../../geometry/cylinder';

const defaultsDeep = require('lodash.defaultsdeep');

class TrunkSegment {
  constructor(scene, options = {}) {
    this.options = {
      cylinder: {
        radiusTop: 0.5,
        radiusBottom: 0.45,
        height: 1,
        radiusSegments: 8,
      },
      scale: {
        radius: 1,
        height: 1,
      },
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
      name: 'TrunkSegment',
      castShadow: true,
      receiveShadow: false,
      physics: {
        type: 'cylinder',
        move: true,
        density: 1,
        friction: 0.3,
        restitution: 0,
        belongsTo: 1,
        collidesWith: 0xffffffff,
      },
    };

    this.options = defaultsDeep(options, this.options);

    let cylinder = new Cylinder(this.options.cylinder);
    let material = MaterialManager.get('palmtree_trunk');

    var mesh = new THREE.Mesh(cylinder, material);
    mesh.scale.set(
      this.options.scale.radius,
      this.options.scale.height,
      this.options.scale.radius,
    );
    mesh.position.set(
      this.options.position.x,
      this.options.position.y,
      this.options.position.z
    );

    mesh.name = this.options.name;
    mesh.receiveShadow = this.options.receiveShadow;
    mesh.castShadow = this.options.castShadow;

    this.options.physics.size = [
      this.options.cylinder.radiusTop * this.options.scale.radius,
      this.options.cylinder.height * this.options.scale.height,
      this.options.cylinder.radiusBottom * this.options.scale.radius,
    ];

    return scene.add(mesh, this.options.physics);
  }
}

export default TrunkSegment;
