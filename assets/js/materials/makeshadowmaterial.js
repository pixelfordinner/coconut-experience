import * as THREE from 'three';
import shaderParse from '../shaders/shaderparse.js';

const B_S_VERTEX = shaderParse(require('../shaders/basic_shadows/vertex.glsl'));
const B_S_FRAGMENT = shaderParse(require('../shaders/basic_shadows/fragment.glsl'));

let ShadowMaterial = function (parameters) {

  THREE.ShaderMaterial.call(this, {
    uniforms: THREE.UniformsUtils.merge([
     THREE.UniformsLib.lights,
     {
      opacity: { value: 1.0 },
    },
    ]),
    vertexShader: B_S_VERTEX,
    fragmentShader: B_S_FRAGMENT,
  });

  this.lights = true;
  this.transparent = true;

  Object.defineProperties(this, {
    opacity: {
      enumerable: true,
      get: function () {
        return this.uniforms.opacity.value;
      },

      set: function (value) {
        this.uniforms.opacity.value = value;
      },
    },
  });

  this.setValues(parameters);

};

ShadowMaterial.prototype = Object.create(THREE.ShaderMaterial.prototype);
ShadowMaterial.prototype.constructor = ShadowMaterial;

ShadowMaterial.prototype.isShadowMaterial = true;

export default ShadowMaterial;
