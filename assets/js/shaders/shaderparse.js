import replaceThreeChunkFn from './placechunk.js';

let shaderParse = function (glsl) {
  return glsl.replace(/\/\/\s?chunk\(\s?(\w+)\s?\);/g, replaceThreeChunkFn);
};

export default shaderParse;
