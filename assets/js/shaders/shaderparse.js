import replaceThreeChunk from './replace-three-chunk.js';

let shaderParse = function (glsl, isInclude = false) {
  if (isInclude === false) {
    return glsl.replace(/\/\/\s?chunk\(\s?(\w+)\s?\);/g, replaceThreeChunk);
  }

  return glsl.replace(/\#include\s+[<](\w+)*[>]/g, replaceThreeChunk);
};

export default shaderParse;
