
varying vec3 vNormal;
//chunk(fog_pars_vertex);
//chunk(shadowmap_pars_vertex);

void main(void) {
  //chunk(begin_vertex);
  //chunk(project_vertex);

  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  vNormal = normalize( normalMatrix * normal );
  //chunk(worldpos_vertex);
  //chunk(shadowmap_vertex);
  //chunk(fog_vertex);
}
