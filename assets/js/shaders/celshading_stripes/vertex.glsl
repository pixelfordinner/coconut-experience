
varying vec3 vNormal;
varying vec2 vUv;
//chunk(fog_pars_vertex);

void main(void) {
  //chunk(begin_vertex);
  //chunk(project_vertex);
  //chunk(worldpos_vertex);
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  vNormal = normalize( normalMatrix * normal );
  //vNormal = normal(modelViewMatrix * normal);
  //chunk(fog_vertex);
}
