import * as THREE from 'three';
import Renderer from './renderer';
import Camera from './camera';
import Lights from './lights';
import Clock from './clock';
import World from './world';
import Gestures from './gestures';
import Controls from './controls';
import { MaterialManager } from '../materials/manager';

const $ = require('jquery');

class Scene {
  constructor(options) {
    this.options = options;
    this.objects = [];

    this.options.dimensions = {
        width: $(this.options.renderer.canvas).width(),
        height: $(this.options.renderer.canvas).height(),
      };

    this.renderer = new Renderer(options);
    this.camera = new Camera(options);
    this.lights = new Lights(options, this.camera);
    this.world = new World();
    this.clock = new Clock();

    return this;
  }

  init() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(
      new THREE.Color(this.options.colors.fog),
      this.options.scene.fog.factor
    );

    // Lights
    this.lights.forEach((function (light) {
      this.scene.add(light);
    }).bind(this));

    // Event Listeners
    let updateSize = function () { this.updateSize(); }.bind(this);
    window.addEventListener('resize', updateSize, false);

    this.gestures = new Gestures(this);
    this.controls = new Controls(this.options, this.camera);
  }

  updateSize() {
    this.options.dimensions = {
        width: $(this.options.renderer.canvas).width(),
        height: $(this.options.renderer.canvas).height(),
      };

    this.camera.aspect =
      this.options.dimensions.width / this.options.dimensions.height;

    this.camera.updateProjectionMatrix();

    this.renderer.setSize(
      this.options.dimensions.width,
      this.options.dimensions.height,
      false
    );
  }

  updatePositions() {

    this.world.step();
    this.objects.forEach(function (object) {
      if (object.hasOwnProperty('body') === true) {
        object.mesh.position.copy(object.body.getPosition());
        object.mesh.quaternion.copy(object.body.getQuaternion());
      }
    }.bind(this));
  }

  updateGestures() {
    this.gestures.update();
  }

  updateShaders() {
    if (MaterialManager.get('cel_stripes_H') != null) {
      let material = MaterialManager.get('cel_stripes_H');
      material.uniforms.iGlobalTime.value = this.clock.getElapsedTime();

    }

    if (MaterialManager.get('cel_stripes_V') != null) {
      let material = MaterialManager.get('cel_stripes_V');
      material.uniforms.iGlobalTime.value = this.clock.getElapsedTime();

    }

  }

  updateMaterials() {

    this.objects.forEach(function (object) {
      if (object.hasOwnProperty('body') === true) {

        let name = object.mesh.name;

        if (name.search('Trunk') != -1) {
          name = 'Trunk';
        } else if (name.search('Crown') != -1) {
          name = 'Crown';
        } else if (name.search('Coco') != -1) {
          name = 'Coco';
        } else if (name.search('Ground') != -1) {
          name = 'Ground';
        } else if (name.search('Cristal') != -1) {
          name = 'Cristal';
        }

        if (object.body.sleeping) {

          switch (name) {
            case 'Ground':
              object.mesh.material = MaterialManager.get('ground');
              break;
            default:
              object.mesh.material = MaterialManager.get('palmtree_sleeping');
          }

        } else {

          switch (name) {
            case 'Trunk':
              object.mesh.material = MaterialManager.get('cel_stripes_V');
              break;
            case 'Crown':
              object.mesh.material = MaterialManager.get('cel_basic');
              break;
            case 'Coco':
              object.mesh.material = MaterialManager.get('cel_stripes_H');
              break;
            case 'Cristal':
              object.mesh.material = MaterialManager.get('cristal');
              break;
            default:
              object.mesh.material = MaterialManager.get('basic_shadows');
          }
        }
      }
    }.bind(this));
  }

  render() {

    this.renderer.render(this.scene, this.camera);
  }

  animate() {
    this.updatePositions();
    this.updateGestures();
    this.updateMaterials();
    this.updateShaders();
    this.render();
    let animate = function () { this.animate(); }.bind(this);
    requestAnimationFrame(animate);
  }

  add(mesh, physics = {}) {
    this.scene.add(mesh);

    let object = {};

    // If there's physics, let's add the object to OIMO
    if (typeof physics === 'object' && Object.keys(physics).length > 0) {

      if (physics.hasOwnProperty('size') === false) {
        physics.size = [mesh.scale.x, mesh.scale.y, mesh.scale.z];
      }

      if (physics.hasOwnProperty('position') === false) {
        physics.pos = [mesh.position.x, mesh.position.y, mesh.position.z];
      }

      if (physics.hasOwnProperty('rotation') === false) {
        physics.rot = [mesh.rotation.x, mesh.rotation.y, mesh.rotation.z];
      }

      physics.name = mesh.name;

      let body = this.world.add(physics);

      //console.log(physics);
      object =  { mesh: mesh, body: body };
    } else {
      // If not, we only push the mesh
      object = { mesh: mesh };
    }

    this.objects.push(object);
    this.gestures.updateMeshes(this.objects);
    return object;
  }

  addTerrain(mesh, position, radius) {
    this.scene.add(mesh);

    for (var i = 0; i < position.length; i++) {
      let pos = position[i];
      let myName = 'terrainSection_' + i;
      let rad = radius;

      //console.log('index ', i, 'position ', pos);
      console.log([pos[0], pos[1], pos[2]]);
      let body = this.world.add({ type: 'sphere', position:
      [pos[0], pos[1], pos[2]], size: [rad], });
    }
  }
}

export default Scene;
