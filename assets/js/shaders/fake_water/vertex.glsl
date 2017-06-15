varying vec2 vUv;
//chunk(shadowmap_pars_vertex);
//chunk(fog_pars_vertex);

void main() {

  vUv = uv;

  //chunk(begin_vertex);
	//chunk(project_vertex);
	//chunk(worldpos_vertex);
  //chunk(shadowmap_vertex);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);

  //chunk(fog_vertex);
}
