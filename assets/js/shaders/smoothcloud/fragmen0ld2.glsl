
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
	float scale = 1.;
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

  //vec2 uv = -1.0 + 2.0 * vUv;
//  uv.x *= 1.6;
  float alpha = fBm( uv - vec2(iGlobalTime * 0.05, .0));
  //alpha = clamp(pow(alpha, 3.0), 0.0, 1.0);
  vec3 color = vec3(alpha);
  //color = vec3(smoothstep(0.5, 1.0, color));
  //color = mix(color * 3.5, diffuse, 0.15);
  vec4 col = vec4(color, alpha);

  //col = vec4(1.);

  gl_FragColor = col;
  // ADD FOG
  //(fog_fragment);
}
