import * as THREE from 'three';
import {
  MaterialManager
} from '../../materials/manager';
import Box from '../../geometry/box';
import Cylinder from '../../geometry/cylinder';

class Base {
  constructor(scene, options = {}) {
    this.options = {
      ground: {
        name: 'Ground',
        scale: {
          x: 400,
          y: 20,
          z: 400,
        },
        position: {
          x: 0,
          y: -10,
          z: 0,
        },
        receiveShadow: true,
        castShadow: false,
        physics: {
          type: 'box',
          move: false,
          density: 100,
          friction: 0.2,
          restitution: 0.2,
          belongsTo: 1,
          collidesWith: 0xffffffff,
        },
      },
    };

    // Ground
    let box = new Box();
    let groundMaterial = MaterialManager.get('basic_shadows');
    let mesh = new THREE.Mesh(box, groundMaterial);

    mesh.scale.set(
      this.options.ground.scale.x,
      this.options.ground.scale.y,
      this.options.ground.scale.z
    );

    mesh.position.set(
      this.options.ground.position.x,
      this.options.ground.position.y,
      this.options.ground.position.z
    );

    mesh.name = this.options.ground.name;
    mesh.receiveShadow = this.options.ground.receiveShadow;
    mesh.castShadow = this.options.ground.castShadow;
    scene.add(mesh, this.options.ground.physics);
    return Base;
  }
}

export default Base;
