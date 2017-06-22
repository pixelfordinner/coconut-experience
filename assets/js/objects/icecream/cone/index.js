import * as THREE from 'three';

//import Sphere from '../../../geometry/sphere';
import Cylinder from '../../../geometry/cylinder';
import { MaterialManager } from '../../../materials/manager';

const defaultsDeep = require('lodash.defaultsdeep');

class Cone {
  constructor(scene, options = {}) {
    this.options = {
      radius: 1,
      scale: {
        radius: 1,
        height: 1,
      },
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
      cylinder: {
        radiusTop: 0.5,
        radiusBottom: 0.025,
        height: 1,
        radiusSegments: 20,
        heightSegments: 20,
        openEnded: true,
      },
      name: 'Cone_',
      castShadow: true,
      receiveShadow: false,
      physics: {
        type: 'cylinder',
        move: true,
        density: 0.05,
        friction: 0.01,
        restitution: 0.1,
        belongsTo: 1,
        collidesWith: 0xffffffff,
      },
    };

    this.options = defaultsDeep(options, this.options);

    let shape = new Cylinder(this.options.cylinder);
    let material = MaterialManager.get('palmtree_coco');

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
      this.options.cylinder.radiusTop * this.options.scale.radius,
      this.options.cylinder.height * this.options.scale.height,
      this.options.cylinder.radiusBottom * this.options.scale.radius,
    ];

    return scene.add(mesh, this.options.physics);
  }
}

export default Cone;
