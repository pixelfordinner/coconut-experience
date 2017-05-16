import * as THREE from 'three';
import { MaterialManager } from '../../../materials/manager';

const defaultsDeep = require('lodash.defaultsdeep');

class CristalSegment {
  constructor(scene, options = {}) {
    this.options = {
      parentName: 'Cristal_',
      name: '_Segment_',
      index: 0,
      max: 6,
      radius: 0.5,
      density: 1,
      height: 4,
      castShadow: true,
      receiveShadow: false,
      cristalGeometry: new THREE.BufferGeometry(),

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

      rotation: {
        x: 0,
        y: 0,
        z: 0,
      },

      physics: {
        type: 'cylinder',
        move: false,
        density: 0.5,
        friction: 10,
        restitution: 0,
        collision: true,
        belongsTo: 1,
        collidesWith: 0xffffffff,
      },
    };

    this.options = defaultsDeep(options, this.options);

    // SINGLE CRISTAL GEOMETRY
    this.options.name = this.options.parentName + this.options.name + this.options.index;
    let t = new THREE.Geometry();
    let c = new THREE.Geometry();
    let rad = this.options.radius;
    let height = this.options.height;
    let yPos  = this.options.height / 2;
    let c1 = new THREE.CylinderGeometry(rad, rad / 1.2, height, 8);
    let mtrx1 = new THREE.Matrix4().makeTranslation(0, yPos, 0);
    let c2 = new THREE.CylinderGeometry(0, rad, height / 4, 8);
    let yPos2 = this.options.height + (height / 8);
    let mtrx2 = new THREE.Matrix4().makeTranslation(0, yPos2, 0);

    t.merge(c1, mtrx1);
    t.merge(c2, mtrx2);
    t.applyMatrix(new THREE.Matrix4().makeRotationX(this.options.rotation.x));


    // MESH SETTINGS
    this.options.cristalGeometry.fromGeometry(t);
    let material = MaterialManager.get('cristal');
    var mesh = new THREE.Mesh(this.options.cristalGeometry, material);

    mesh.position.set(
      this.options.position.x,
      this.options.position.y,
      this.options.position.z,
    );

    mesh.scale.set(
      this.options.scale.x,
      this.options.scale.y,
      this.options.scale.z,
    );

    mesh.receiveShadow = this.options.receiveShadow;
    mesh.castShadow = this.options.castShadow;
    mesh.name = this.options.name;

    this.options.physics.size = [
      this.options.scale.x * this.options.radius,
      this.options.scale.y * this.options.height,
      this.options.scale.z * this.options.radius,
    ];

    return scene.add(mesh, this.options.physics);
  }
}

export default CristalSegment;
