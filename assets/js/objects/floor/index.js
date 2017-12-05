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
        w: 13,
        h: 13,
      },
      scale: {
        x: 4,
        y: 1,
        z: 4,
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
    let up = 0;
    for (let i = 0; i < this.options.size.w; i++) {
      for (let j = 0; j < this.options.size.h; j++) {

        let px = (0.5 + i * this.options.scale.x) - (this.options.scale.x * this.options.size.w / 2);
        let pz = (0.5 + j * this.options.scale.z) - (this.options.scale.z * this.options.size.h / 2);
        //let py = this.options.position.y - this.options.scale.y;

        let  x = (0.5 + i - this.options.size.w / 2);
        let  z = (0.5 + j - this.options.size.h / 2);
        //console.log(`X : ` + x + ` Z : ` + z + ` TT ` + Math.abs(this.options.size.w * i));
        let py = this.options.scale.y * (1 / Math.sqrt(1 + (x * x) + (z * z)));
        let height = py * 2;

        //py += Math.
        //console.log(`PPPP : ` + py);
        let tile = new Tile(scene, {
          position: {
            x: px + (this.options.scale.x * 0.5),
            y: py,
            z: pz + (this.options.scale.z * 0.5),
          },
          scale: {
            x: this.options.scale.x * 0.999,
            y: height,
            z: this.options.scale.z * 0.999,
          },
          name: this.options.name + this.options.index + '_Tile_' + tIndex,
        });
        tIndex++;
      }
    }

    let box = new Box();
    let material = MaterialManager.get('basic_shadows');
    let mesh = new THREE.Mesh(box, material);

    mesh.scale.set(
      this.options.scale.x * this.options.size.w,
      this.options.scale.y,
      this.options.scale.z * this.options.size.h,
    );

    mesh.position.set(
      0.5,
      this.options.position.y - (this.options.scale.y / 2),
      0.5,
    );

    mesh.name = this.options.name + 'base';
    mesh.receiveShadow = false;
    mesh.castShadow = false;
    scene.add(mesh, this.options.physics);

    return Floor;
  }
}

export default Floor;
