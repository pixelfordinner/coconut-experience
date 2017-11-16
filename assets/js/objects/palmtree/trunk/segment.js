import * as THREE from 'three';
import { MaterialManager } from '../../../materials/manager';
import Cylinder from '../../../geometry/cylinder';

const defaultsDeep = require('lodash.defaultsdeep');

class TrunkSegment {
  constructor(scene, options = {}) {
    this.options = {
      cylinder: {
        radiusTop: 0.5,
        radiusBottom: 0.48,
        height: 1,
        radiusSegments: 22,
        heightSegments: 1,
        openEnded: true,
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
        friction: 2,
        restitution: 0.1,
        belongsTo: 1,
        collidesWith: 0xffffffff,
      },
    };

    this.options = defaultsDeep(options, this.options);

    let cylinder = new Cylinder(this.options.cylinder);
    let material = MaterialManager.get('palmtree_trunk');
    let Uv = cylinder.attributes.uv;

    for (var i = 0; i < cylinder.attributes.uv.count; i++) {

      let UVx = Uv.getX(i);
      let UVy = Uv.getY(i);
      //let UVw = Uv.getW(i);
      //console.log('x ', UVx, 'y ', UVy, 'w ', UVw);

      if (UVy !== 0) {
        cylinder.attributes.uv.setX(i, 0.5);
      } else {
        cylinder.attributes.uv.setX(i, 1);
      }
    }

    var mesh = new THREE.Mesh(cylinder, material);
    mesh.scale.set(
      this.options.scale.radius / 1.333,
      this.options.scale.height,
      this.options.scale.radius / 1.333,
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
