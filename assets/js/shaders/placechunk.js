import * as THREE from 'three';

let replaceThreeChunkFn = function (a, b) {
  return THREE.ShaderChunk[b] + '\n';
};

export default replaceThreeChunkFn;
