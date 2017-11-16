uniform float opacity;
uniform float iGlobalTime;
uniform vec3 diffuse;
uniform vec3 diffshadow;

//chunk(common);
//chunk(packing);
//chunk(bsdfs);
//chunk(lights_pars);
//chunk(shadowmap_pars_fragment);
//chunk(shadowmask_pars_fragment);
//chunk(fog_pars_fragment);

void main(void) {

  // SHADOWS
  float shdw = smoothstep(-1., 1.5, getShadowMask());

  // COLORIZE
  vec4 color2 = mix(vec4(diffshadow, 1.0), vec4(diffuse, opacity), shdw);
  //color2 = mix(color2, color1, 0.4);
  gl_FragColor = color2;

  // ADD FOG
  //chunk(fog_fragment);
}
////////////////////////////////////////////////////////////////////////////////
