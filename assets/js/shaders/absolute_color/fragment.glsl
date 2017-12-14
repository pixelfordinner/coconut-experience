uniform vec3 diffuse;
//chunk(common);
//chunk(packing);
//chunk(bsdfs);
//chunk(fog_pars_fragment);

void main(void) {

  gl_FragColor = vec4(diffuse, 1.0);
  //(fog_fragment);
}
