import * as THREE from 'three';
import { MaterialManager } from '../../materials/manager';
import Cylinder from '../../geometry/cylinder';

const defaultsDeep = require('lodash.defaultsdeep');

class Cristal {
  constructor(scene, options = {}) {
    this.options = {

      name: 'Cristal_',
      index: 0,
      max: 6,
      radius: 0.5,
      density: 1,
      height: 4,
      castShadow: true,
      receiveShadow: false,
      cristalGeometry: new THREE.BufferGeometry(),

      scale: {
        radius: 1,
        height: 1,
      },

      position: {
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


    this.options.name = this.options.name + index;
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

    let max = this.options.max;

    for (var i = 0; i < max; i++) {

      let alfa = THREE.Math.mapLinear(i, 0, max, 0, Math.PI * 2);
      let scale = THREE.Math.mapLinear(i, 0, max, rad, rad / 3);
      let rand = Math.random();
      let theta = THREE.Math.mapLinear(rand, -1, 1, Math.PI / 10, Math.PI / 15);
      let xPos = this.options.position.x + (Math.cos(alfa) * rad * scale);
      let zPos = this.options.position.z + (Math.sin(alfa) * rad * scale);
      c.applyMatrix(new THREE.Matrix4().makeTranslation(xPos, -(0.2 * i), zPos));
      c.applyMatrix(new THREE.Matrix4().makeRotationY(alfa));
      let mtrx2 = new THREE.Matrix4().makeRotationX(theta);
      c.merge(t, mtrx2);

    }

    this.options.cristalGeometry.fromGeometry(c);
    let material = MaterialManager.get('cristal');
    var mesh = new THREE.Mesh(this.options.cristalGeometry, material);

    mesh.position.set(
      this.options.position.x,
      this.options.position.y,
      this.options.position.z,
    );
    mesh.scale.set(
      this.options.scale.radius,
      this.options.scale.height,
      this.options.scale.radius,
    );
    mesh.receiveShadow = this.options.receiveShadow;
    mesh.castShadow = this.options.castShadow;

    mesh.name = this.options.name;
    console.log(mesh);

    this.options.physics.size = [
      this.options.scale.radius * this.options.radius * 2,
      this.options.scale.height * this.options.height,
      this.options.scale.radius * this.options.radius * 2,
    ];

    return scene.add(mesh, this.options.physics);
  }
}

export default Cristal;
