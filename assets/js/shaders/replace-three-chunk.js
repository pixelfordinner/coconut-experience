import * as THREE from 'three';

let replaceThreeChunk = function (a, b) {
  return THREE.ShaderChunk[b] + '\n';
};

export default replaceThreeChunk;
