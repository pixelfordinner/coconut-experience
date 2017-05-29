import { MaterialManager } from '../../materials/manager';
import ImprovedNoise from '../../helpers/improved-noise';

import * as THREE from 'three';

const OIMO = require('oimo');

class Terrain {
  constructor(scene, options = {}) {
    this.options = {

        name: 'Terrain',
        size: {
          x: 600,
          y: 10,
          z: 600,
        },
        vertices: {
          w: 32,
          h: 32,
        },
        position: {
          x: 0,
          y: 0,
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

      };

    // Ground
    let w = this.options.vertices.w;
    let h = this.options.vertices.h;
    let amp = 10;
    let g = new THREE.PlaneBufferGeometry(
      this.options.size.x,
      this.options.size.z,
      this.options.vertices.w - 1,
      this.options.vertices.h - 1
     );
    g.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI * 0.5));

    let size = this.options.vertices.w * this.options.vertices.h;
    let data = new Float32Array(size);
    let perlin = new ImprovedNoise();
    let quality = 1;
    let z = Math.random() * amp;

    for (let j = 0; j < 4; j++) {
      for (let i = 0; i < size; i++) {
        let x = i % w;
        let y = ~~(i / w);
        data[i] += (Math.abs(perlin.noise(x / quality, y / quality, z) * quality *  0.5));
      }

      quality *= 5;
    }

    let b;
    let v;
    let m;
    let r = 20;
    let types = [];
    let sizes = [];
    let positions = [];
    let n = 0;
    let xPos;
    let yPos;
    let zPos;
    let vertices = g.attributes.position.array;
    let groundBodiesPosition = [];
    let groundBodiesName = [];

    for (let i = 0, j = 0, l = vertices.length; i < l; i++, j += 3) {

      vertices[j + 1] = (data[i] * amp) - 100;
      xPos = vertices[j];
      yPos = vertices[j + 1] - r;
      zPos = vertices[j + 2];

      //ADD PHISICS SHERE IMPOSTOR AT EACH VERTEX OF THE TERRAIN
      //let b = scene.world.add({ type: 'sphere', size: [r], pos: [xPos, yPos, zPos] });
      //b.name = 'terrainSegment' + i;

      let position = [xPos, yPos, zPos];
      if (position[0] != null) {
        groundBodiesPosition.push(position);
      }
    }

    g.computeFaceNormals();
    g.computeVertexNormals();

    let terrain = new THREE.Mesh(g, new THREE.MeshPhongMaterial({
      color: 0x3D4143,
      shininess: 60,
      shading: THREE.FlatShading,
    }));
    terrain.castShadow = this.options.castShadow;
    terrain.receiveShadow = this.options.receiveShadow;
    terrain.name = 'Terrain_';
    scene.add(terrain);
  }
}

export default Terrain;
