uniform vec3 uMaterialColor;
uniform vec3 uMaterialColor2;
uniform vec3 uDirLightPos;
uniform vec3 uDirLightColor;
uniform float uKd;
uniform float uBorder;
varying vec3 vNormal;
varying vec2 vUv;
//const float LOG2 = 1.442695;
uniform float iGlobalTime;

//chunk(common);
//chunk(packing);
//chunk(bsdfs);
//chunk(fog_pars_fragment);

void main(void) {

  // compute direction to light
  vec4 lDirection = viewMatrix * vec4( uDirLightPos, 0.0 );
  vec3 lVector = normalize( lDirection.xyz );
  vec3 normal = normalize( vNormal );
  vec3 color;
  float f = floor(cos( vUv.x * 6.3 * 2.0 - (iGlobalTime * 4.0))) + 1.0;
  if( f > 0.0 ){
    color = uMaterialColor;
  } else {
    color = uMaterialColor2;
  }

  float diffuse = dot( normal, lVector );
  if ( diffuse > 0.7 ) { diffuse = 1.0; }
  else if ( diffuse > 0.4 ) { diffuse = 0.7; }
  else if ( diffuse > -0.1 ) { diffuse = 0.5; }
  else { diffuse = 0.3; }
  gl_FragColor = vec4( uKd * color * (uDirLightColor * 4.0) * diffuse , 1.0 );

  //chunk(fog_fragment);

}
