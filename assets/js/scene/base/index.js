import * as THREE from 'three';
import { MaterialManager } from '../../materials/manager';
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
          y: -17,
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
      island: {
        radius: 60,
        height: 10,
        name: 'Ground',
        receiveShadow: true,
        castShadow: false,
        position: {
          x:  0,
          y: -5,
          z:  0,
        },
        physics: {
          type: 'cylinder',
          move: false,
          density: 10,
          friction: 0.2,
          restitution: 0.2,
          belongsTo: 1,
          collidesWith: 0xffffffff,
        },
      },
      ocean: {
        name: 'Fake_Water',
        active: true,
        receiveShadow: false,
        castShadow: true,
        position: {
          x:  0,
          y: -6.9,
          z:  0,
        },
        scale: {
          x: 200,
          y: 200,
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

    // ISLAND
    let cylinder = new Cylinder({
      radiusTop: this.options.island.radius * 0.4,
      radiusBottom: this.options.island.radius * 0.6,
      height: this.options.island.height,
      radiusSegments: 6,
    });
    let island = new THREE.Mesh(cylinder, groundMaterial);
    island.position.set(
      this.options.island.position.x,
      this.options.island.position.y,
      this.options.island.position.z
    );
    island.name = this.options.island.name;
    island.receiveShadow = this.options.island.receiveShadow;
    island.castShadow = this.options.island.castShadow;
    this.options.island.physics.size = [
      this.options.island.radius * 0.4,
      this.options.island.height,
      this.options.island.radius * 0.4,
    ];
    scene.add(island, this.options.island.physics);

    // WATER PLANE
    if (this.options.ocean.active == true) {

      let planeGeometry = new THREE.BufferGeometry().fromGeometry(
        new THREE.PlaneGeometry(
          this.options.ocean.scale.x,
          this.options.ocean.scale.y,
      ));

      planeGeometry.rotateX(-Math.PI / 2);
      planeGeometry.rotateY(-Math.PI / 4);
      let mesh2 = new THREE.Mesh(planeGeometry, MaterialManager.get('Fake_Water'));
      mesh2.position.set(
        this.options.ocean.position.x,
        this.options.ocean.position.y,
        this.options.ocean.position.z
      );

      mesh2.name = this.options.ocean.name;
      mesh2.receiveShadow = this.options.ocean.receiveShadow;
      mesh2.castShadow = this.options.ocean.castShadow;
      scene.add(mesh2);
    }

    return Base;
  }
}

export default Base;
