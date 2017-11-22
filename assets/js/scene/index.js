import * as THREE from 'three';
import Renderer from './renderer';

//import Postprod from './postprocess';
import Camera from './camera';
import Frustrum from './frustrum';
import CameraFrustrum from './camerafrustrum';
import Lights from './lights';
import Clock from './clock';
import World from './world';
import Gestures from './gestures';
import Controls from './controls';
import {
  MaterialManager
} from '../materials/manager';

const $ = require('jquery');

class Scene {
  constructor(options) {
    this.options = options;
    this.objects = [];

    this.options.dimensions = {
      width: $(this.options.renderer.canvas).width(),
      height: $(this.options.renderer.canvas).height(),
    };
    this.options.camera.distance = 10;
    this.options.camera.position = {
      x: 0,
      y: 3,
      z: -3,
    };

    // this.aspectRatio = $(this.options.renderer.canvas).width()
    //                  / $(this.options.renderer.canvas).height();
    // this.options.shadowCamera = new THREE.PerspectiveCamera(70, this.aspectRatio, 10, 1000));

    this.renderer = new Renderer(options);
    this.camera = new Camera(options);
    this.lightfrustrum = new CameraFrustrum(options);
    this.lights = new Lights(options, this.camera, this.lightfrustrum);
    this.world = new World();
    this.clock = new Clock();
    this.frustrum = new Frustrum(this.lightfrustrum);
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
    // Frustrum
    this.scene.add(this.frustrum);
    // Event Listeners
    let updateSize = function () {
      this.updateSize();
    }.bind(this);
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

    if (MaterialManager.get('celshading_stripes_material') != null) {
      let material = MaterialManager.get('celshading_stripes_material');
      material.uniforms.iGlobalTime.value = this.clock.getElapsedTime();
    }

    if (MaterialManager.get('displacement') != null) {
      let material = MaterialManager.get('displacement');
      material.uniforms.iGlobalTime.value = this.clock.getElapsedTime();
    }

    if (MaterialManager.get('cloud') != null) {
      let material = MaterialManager.get('cloud');
      material.uniforms.iGlobalTime.value = this.clock.getElapsedTime();
    }

    if (MaterialManager.get('smooth_cloud') != null) {
      let material = MaterialManager.get('smooth_cloud');
      material.uniforms.iGlobalTime.value = this.clock.getElapsedTime();
    }

  }

  updateMaterials() {

    this.objects.forEach(function (object) {
      if (object.hasOwnProperty('body') === true) {

        const updatables = [
          'TrunkSegment',
          'Crown',
          'Cocos',
          'Blob',
        ];

        const parts = object.mesh.name.split('_');
        const matches = parts.filter(part => updatables.indexOf(part) > -1 ? true : false);
        const name = parts.length > 0 && matches.length > 0 ?
          matches[0] :
          object.mesh.name;

        //console.log(parts);

        if (object.body.sleeping) {
          const sleepingMaterials = {
            Ground: 'basic_shadows',
            Blob: 'displacement',
          };

          object.mesh.material = sleepingMaterials.hasOwnProperty(name) ?
            MaterialManager.get(sleepingMaterials[name]) :
            MaterialManager.get('basic_celshading_material');
        } else {
          const materials = {
            TrunkSegment: 'celshading_stripes_material',
            Crown: 'basic_celshading_material',
            Cocos: 'celshading_stripes_material',
            Blob: 'displacement',
          };

          object.mesh.material = materials.hasOwnProperty(name) ?
            MaterialManager.get(materials[name]) :
            MaterialManager.get('basic_shadows');

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

    let animate = function () {
      this.animate();
    }.bind(this);
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

      object = {
        mesh: mesh,
        body: body,
      };
    } else {
      // If not, we only push the mesh
      object = {
        mesh: mesh,
      };
    }

    this.objects.push(object);
    this.gestures.updateMeshes(this.objects);
    return object;
  }

}

export default Scene;
