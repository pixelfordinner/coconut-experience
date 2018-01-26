import {
  MaterialManager
} from '../../materials/manager';
import * as THREE from 'three';
const OIMO = require('oimo');
import { SoundManager } from '../../sound/manager';

const DRAG_STATUS_DISABLED = 'DRAG_STATUS_DISABLED';
const DRAG_STATUS_NONE = 'DRAG_STATUS_NONE';
const DRAG_STATUS_START = 'DRAG_STATUS_START';
const DRAG_STATUS_DRAGGING = 'DRAG_STATUS_DRAGGING';

class Gestures {
  constructor(scene, options = {}) {
    this.dragStatus = DRAG_STATUS_DISABLED;
    this.ray = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.objectDragged;
    this.scene = scene;
    this.meshes = [];

    this.dragPointView = new THREE.Mesh(
      new THREE.SphereGeometry(1, 8, 8),
      new THREE.MeshLambertMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 1,
      })
    );

    this.dragPlaneView = new THREE.Mesh(
      new THREE.PlaneGeometry(200, 200, 1, 1),
      new THREE.MeshLambertMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.3,
      })
    );

    this.dragPlaneView.material.visible = false;

    let lineGeometry = new THREE.Geometry();
    lineGeometry.vertices.push(
      new THREE.Vector3(),
      new THREE.Vector3()
    );

    this.dragLineView = new THREE.Line(
      lineGeometry,
      new THREE.LineBasicMaterial({
        color: 0xffffff,
        linewidth: 1,
      })
    );

    this.dragPointView.visible = false;
    this.dragPlaneView.visible = false;
    this.dragLineView.visible = false;

    scene.scene.add(this.dragPointView);
    scene.scene.add(this.dragPlaneView);
    scene.scene.add(this.dragLineView);
    this.dragamp = this.ismobile ?  2.75 : 1.25;
    this.dragmass = this.ismobile ? 0.2 : 0.1;

    this.dragPointBody = scene.world.add({
      type: 'sphere',
      size: [this.dragamp],
      pos: [0, 0, 0],
      move: true,
      noSleep: true,
      collision: false,
      name: 'dragPointBody',
      config: [this.dragmass, 0.0, 0.0, 1 << 2, 1 << 2],
    });

    let mouseMove = function (e) {
      this.mouseMove(e);
    }.bind(this);
    let mouseUp = function (e) {
      this.mouseUp(e);
    }.bind(this);
    let mouseDown = function (e) {
      this.mouseDown(e);
    }.bind(this);

    window.addEventListener('mousemove', mouseMove, true);
    window.addEventListener('mouseup', mouseUp, true);
    window.addEventListener('mousedown', mouseDown, true);

    window.addEventListener('touchmove', mouseMove, true);
    window.addEventListener('touchend', mouseUp, true);
    window.addEventListener('touchstart', mouseDown, true);

    return this.gestures;
  }

  enableDrag(enabled) {
    this.dragStatus = enabled ? DRAG_STATUS_NONE : DRAG_STATUS_DISABLED;
  }

  mouseMove(e) {
    if (this.dragStatus === DRAG_STATUS_DISABLED) {
        return;
    }

    let intersects;
  //  let dintersect;
    this.updateMouse(e);
    this.ray.setFromCamera(this.mouse, this.scene.camera);

    if (this.dragStatus === DRAG_STATUS_NONE) {
      intersects = this.ray.intersectObjects(this.meshes, true);
    } else {
      intersects = this.ray.intersectObjects([this.dragPlaneView], true);
    }

    if (intersects.length >= 1) {
      this.dragPoint = intersects[0].point;
    }
  }

  mouseUp(e) {
    if (this.dragStatus === DRAG_STATUS_DISABLED) {
        return;
    }

    //this.updateMouse(e);
    if (this.dragStatus !== DRAG_STATUS_NONE) {

      if (this.dragLineModel != null) {
        this.dragLineModel.remove();
        this.dragLineModel = null;
      }

      // this.scene.controls.enabled = false;
      this.dragStatus = DRAG_STATUS_NONE;
      this.dragPointView.visible = false;
      this.dragPlaneView.visible = false;
      this.dragLineView.visible = false;
    }
  }

  mouseDown(e) {
    if (this.dragStatus === DRAG_STATUS_DISABLED) {
        return;
    }

    let intersects;
    let dintersect;
    //this.updateMouse(e);
    if (this.dragStatus !== DRAG_STATUS_NONE) {
      return;
    }

    this.ray.setFromCamera(this.mouse, this.scene.camera);
    intersects = this.ray.intersectObjects(this.meshes);

    const included = ['TrunkSegment', 'Coco', 'Crown', 'Wolf'];
    const dragged = ['TrunkSegment', 'Coco', 'Crown'];

    const getRandomIntInclusive = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);

      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    let draggable = false;
    if (intersects.length > 0) {
      draggable = false;
      let name = intersects[0].object.name;
      name = intersects[0].object.name;
    //  console.log(name);
      if (name.includes('_')) {
        name = name.split('_');
        this.objectDragged = name[1];
        for (let i = 0; i < name.length; i++) {
          for (let j = 0; j < included.length; j++) {
            if (name[i] == included[j]) {
              draggable = true;
              if (name[i] == 'Wolf') {
                SoundManager.play('wolf_' + getRandomIntInclusive(0, 7));
              }
              break;
            }
          }
        }
      } else {
        for (let i = 0; i < included.length; i++) {
          if (name == included[i]) {
            draggable = true;
            if (name == 'Wolf') {
              SoundManager.play('wolf_' + getRandomIntInclusive(0, 7));
            }
          }
        }
      }
    } else {

      draggable = false;
    }

    if (draggable === false) {
      console.log(this.mouse.x);
      let c = 0;

      let mp = new THREE.Vector3(this.mouse.x * this.scene.options.dimensions.width,
         this.mouse.y * this.scene.options.dimensions.height, 0) ;

      let palm1 = this.scene.scene.getObjectByName('Palmtree_1_TrunkSegment_9');
      let palm2 = this.scene.scene.getObjectByName('Palmtree_2_TrunkSegment_9');

      let pos1 = new THREE.Vector3(palm1.position.z, palm1.position.y,  palm1.position.x);
      let pos2 = new THREE.Vector3(palm2.position.z, palm2.position.y,  palm2.position.x);

      let dist1 = mp.distanceTo(pos1);
      let dist2 = mp.distanceTo(pos2);

    //  console.log( );




      if (dist1 > dist2) {
        if (this.ismobile) {
            dintersect = this.scene.scene.getObjectByName('Palmtree_2_TrunkSegment_9');
        } else {
            dintersect = this.scene.scene.getObjectByName('Palmtree_1_TrunkSegment_9');
        }

      } else {

        if (this.ismobile) {
            dintersect = this.scene.scene.getObjectByName('Palmtree_1_TrunkSegment_9');
        } else {
            dintersect = this.scene.scene.getObjectByName('Palmtree_2_TrunkSegment_9');
        }
      }
      let parts = dintersect.name.split('_');
      this.objectDragged = parts[1];
    }

    if (draggable) {
      this.dragStatus = DRAG_STATUS_START;
      this.scene.controls.enabled = false;
      this.dragPoint = intersects[0].point;
      this.dragBlockName = intersects[0].object.name;
      //this.objectDragged = intersects[0].object.name;
      this.dragBlockLocalAnchorPoint = this.localAnchorPoint(

        this.dragBlockName,
        this.dragPoint


      );
    } else {

      this.dragStatus = DRAG_STATUS_START;
      this.scene.controls.enabled = false;
      this.dragPoint = dintersect.position;
      //this.objectDragged = dintersect.name;
      //console.log(this.objectDragged);
      this.dragBlockName = dintersect.name;
      this.dragBlockLocalAnchorPoint = this.localAnchorPoint(

        this.dragBlockName,
        this.dragPoint,

      );
    }
  }

  updateMouse(e) {
    let x = 0;
    let y = 0;

    if (e.layerX && e.layerY) {
        x = e.layerX;
        y = e.layerY;
    } else if (e.targetTouches && e.targetTouches.length > 0) {
        x = e.targetTouches[0].clientX;
        y = e.targetTouches[0].clientY;
    }

    this.mouse.x = (x / this.scene.options.dimensions.width) * 2 - 1;
    this.mouse.y = -(y / this.scene.options.dimensions.height) * 2 + 1;
  }

  localAnchorPoint(blockName, anchorPointInThree) {
    let mesh = this.scene.world.getByName(blockName);
    let anchorPoint = new OIMO.Vec3().copy(anchorPointInThree).multiplyScalar(OIMO.INV_SCALE);
    return anchorPoint;
  }

  dragLineConnect() {
    this.dragLineModel = this.scene.world.add({
      world: this.scene.world,
      type: 'jointBall',
      body1: 'dragPointBody',
      name: 'dragJoint',
      body2: this.dragBlockName,
      collision: false,

      pos1: [
        this.dragBlockLocalAnchorPoint.x,
        this.dragBlockLocalAnchorPoint.y,
        this.dragBlockLocalAnchorPoint.z,
      ],
      pos2: [0, 0, 0],
      min: -1,
      max: 1,
      spring: [3, 0.0005],
    });
  }

  updateMeshes(objects) {
    let meshes = [];

    objects.map(function (object) {
      meshes.push(object.mesh);
    });

    this.meshes = meshes;
  }

  update() {
    if (this.dragStatus == DRAG_STATUS_START) {

      this.dragLineConnect();
      this.dragStatus = DRAG_STATUS_DRAGGING;
      this.dragPointView.visible = false;
      this.dragPlaneView.visible = true;
      this.dragLineView.visible = false;
    }

    if (this.dragStatus == DRAG_STATUS_DRAGGING) {
      this.dragPointBody.setPosition(this.dragPoint);
      this.dragPointView.position.copy(this.dragPoint);
      this.dragPlaneView.position.copy(this.dragPoint);
      this.dragPlaneView.quaternion.copy(this.scene.camera.quaternion);
      this.dragLineView.geometry.vertices[0].copy(this.dragLineModel.getPosition()[0]);
      this.dragLineView.geometry.vertices[1].copy(this.dragLineModel.getPosition()[1]);
      this.dragLineView.geometry.verticesNeedUpdate = true;
    }

    // if (this.dragPoint) {
    //   this.dragPointBody.setPosition(this.dragPoint);
    // }
  }
}

export default Gestures;
