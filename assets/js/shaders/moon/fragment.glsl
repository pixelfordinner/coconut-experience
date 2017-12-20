
uniform float opacity;
uniform float iGlobalTime;
uniform vec3 diffuse;
varying vec2 vUv;
//chunk(common);
//chunk(fog_pars_fragment);

// Tiling 2D noise by Dave Hoskin https://www.shadertoy.com/view/4dlGW2
//----------------------------------------------------------------------------------------
float Hash(in vec2 p, in float scale)
{
	// This is tiling part, adjusts with the scale...
	p = mod(p, scale);
	return fract(sin(dot(p, vec2(27.16898, 38.90563))) * 5151.5473453);
}

//----------------------------------------------------------------------------------------
float Noise(in vec2 p, in float scale )
{
	vec2 f;

	p *= scale;


	f = fract(p);		// Separate integer from fractional
    p = floor(p);

    f = f*f*(3.0-2.0*f);	// Cosine interpolation approximation

    float res = mix(mix(Hash(p, 				 scale),
						Hash(p + vec2(1.0, 0.0), scale), f.x),
					mix(Hash(p + vec2(0.0, 1.0), scale),
						Hash(p + vec2(1.0, 1.0), scale), f.x), f.y);
    return res;
}

//----------------------------------------------------------------------------------------
float fBm(in vec2 p)
{
  //  p += vec2(iGlobalTime * 0.1, iGlobalTime * 0.01) * vec2(0.01)  ;
	float f = 0.0;
	// Change starting scale to any integer value...
	float scale = 15.;
    p = mod(p, scale);
	float amp   = 0.6;

	for (int i = 0; i < 4; i++)
	{
		f += Noise(p, scale) * amp;
		amp *= 0.5;
		// Scale must be multiplied by an integer value...
		scale *= 2.0;
	}
	// Clamp it just in case....
	return min(f, 1.0);
}

void main(void) {

  float alpha = fBm(vec2(vUv  ) + vec2(iGlobalTime * 0.005, 0.0));
  alpha = clamp(alpha, 0.5, 0.7);
  float noise = fBm(vec2(vUv ) + vec2(iGlobalTime * 0.005, 0.0));
	//noise = clamp(noise, 0.5, 0.8);
  //noise = vec3(smoothstep(0.0, 1.0, noise));
//  color = mix(color, diffuse, 0.8);

  //vec3 col = smoothstep(vec3(0.0), diffuse, vec3(noise));
	noise =  clamp(noise, 0.6, 0.7);
	vec3 col = vec3(1.0);
	if(noise >= 0.4){
		col = smoothstep(vec3(1.0), diffuse, vec3(length(vUv) * noise));;
	}
  gl_FragColor = vec4(col, 1.0);


}
