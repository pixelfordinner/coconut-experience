import * as THREE from 'three';
import {
  MaterialManager
} from '../../materials/manager';
import Box from '../../geometry/box';
import Cylinder from '../../geometry/cylinder';
import Tile from './tile';
const defaultsDeep = require('lodash.defaultsdeep');

class Floor {
  constructor(scene, options = {}) {
    this.options = {
      name: 'Floor_',
      index: 0,
      size: {
        w: 30,
        h: 30,
      },
      scale: {
        x: 3,
        y: 1,
        z: 3,
      },
      position: {
        x: 0,
        y: 0,
        z: 0,
      },
      physics: {
        type: 'box',
        move: false,
        density: 10,
        friction: 0.0,
        restitution: 0.5,
        belongsTo: 1,
        collidesWith: 0xffffffff,
      },
    };
    this.options = defaultsDeep(options, this.options);
    let tIndex = 0;
    for (let i = 0; i < this.options.size.w; i++) {
      for (let j = 0; j < this.options.size.h; j++) {

        let px = (i * this.options.scale.x) - (this.options.scale.x * this.options.size.w / 2);
        let pz = (j * this.options.scale.z) - (this.options.scale.z * this.options.size.h / 2);

        let tile = new Tile(scene, {
          position: {
            x: px + (this.options.scale.x * 0.5),
            y: this.options.position.y - this.options.scale.y,
            z: pz + (this.options.scale.z * 0.5),
          },
          scale: {
            x: this.options.scale.x * 0.999,
            y: this.options.scale.y,
            z: this.options.scale.z * 0.999,
          },
          name: this.options.name + this.options.index + '_Tile_' + tIndex,
        });
        tIndex++;
      }
    }

    let box = new Box();
    let groundMaterial = MaterialManager.get('basic_shadows');
    let mesh = new THREE.Mesh(box, groundMaterial);

    mesh.scale.set(
      this.options.scale.x * this.options.size.w,
      this.options.scale.y,
      this.options.scale.z * this.options.size.h,
    );

    mesh.position.set(
      0,
      -this.options.position.y - this.options.scale.y * 2,
      0,
    );

    mesh.name = this.options.name + 'bis';
    mesh.receiveShadow = false;
    mesh.castShadow = false;
    scene.add(mesh, this.options.physics);

    return Floor;
  }
}

export default Floor;
