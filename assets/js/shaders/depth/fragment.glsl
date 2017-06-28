uniform vec3 lightPos;
varying vec4 vWorldPosition;

//chunk(common);
//(packing);
//(uv_pars_fragment)
//(map_pars_fragment);
//(alphamap_pars_fragment);
//(lipping_planes_pars_fragment);

void main () {

	//chunkclipping_planes_fragment);

	vec4 diffuseColor = vec4( 1.0 );

	//(map_fragment);
	//(alphamap_fragment);
	//(alphatest_fragment);

	gl_FragColor = packDepthToRGBA( length( vWorldPosition.xyz - lightPos.xyz ) / 1000.0 );

}
