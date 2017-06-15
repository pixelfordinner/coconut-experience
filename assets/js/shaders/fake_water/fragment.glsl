//FakeWater
varying vec2 vUv;
uniform float iGlobalTime;

//chunk(common);
//chunk(packing);
//chunk(bsdfs);
//chunk(lights_pars);
//chunk(shadowmap_pars_fragment);
//chunk(shadowmask_pars_fragment);
//chunk(fog_pars_fragment);

float randomVal (float inVal){
  return fract(sin(dot(vec2(inVal, 2523.2361) ,vec2(12.9898,78.233))) * 43758.5453)-0.5;
}

void main(){

  vec2 uv = vUv * 80.;

  float timeSpeed = 0.2;
  vec2 newuv = uv;
  float waves = 0.0;
  float result = 0.0;

  for(int a = 0; a < 2; a++){

    int aa = int(randomVal(float(a * 12)) * 32.);
    for(int k = 0; k < 3; k++){
			int kk = k * 124;
      for(int i = 0; i < 6; i++){
        waves += sin(newuv.x*randomVal(float(i+kk+aa+1565))+newuv.y*randomVal(float(i+kk+aa+2354))+iGlobalTime*timeSpeed+randomVal(float(i+kk+aa+6431)));
      }
      newuv = uv * 1.5 + 1.0 * randomVal(float(kk + aa * 1524));
      result += sin(waves)/float(2.);
    }
  }
  // gl_FragColor = vec4(pow(cos((result)),6.0));
  gl_FragColor = vec4(1.0 - ceil(pow(cos((result)),60.0)));

  //chunk(fog_fragment);
}
