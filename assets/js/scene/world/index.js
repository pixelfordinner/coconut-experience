const OIMO = require('oimo');
const defaultsDeep = require('lodash.defaultsdeep');

class World {
  constructor(options) {
    this.options = {
      timestep: 1 / 60,
      iterations: 8,
      broadphase: 2, // 1 brute force, 2 sweep and prune, 3 volume tree
      worldscale: 1, // scale full world
      random: true,  // randomize sample
      info: false,   // calculate statistic or not
      gravity: [0, -19.8, 0],
    };

    this.options = defaultsDeep(options, this.options);

    return new OIMO.World(this.options);
  }
}

export default World;
