varying vec3 vViewPosition;
//chunk(shadowmap_pars_vertex);

void main() {

	//chunk(begin_vertex);
	//chunk(project_vertex);

  vViewPosition = - mvPosition.xyz;

	//chunk(worldpos_vertex);
	//chunk(shadowmap_vertex);

}
