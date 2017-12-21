uniform sampler2D tDiffuse;
uniform sampler2D tAdd;
varying vec2 vUv;
#define ITERATIONS 2
#define HASHSCALE .1031

float hash( float n )
{
    float h =  fract(sin(n) * 4121.15393);
    return  h + .444;
}

void main() {
  vec4 color = texture2D( tDiffuse, vUv );
  vec4 add = texture2D( tAdd, vUv );

  float grain = 0.0;
    for (int t = 0; t < ITERATIONS; t++)
    {
        float p = vUv.x * 1435.345 + vUv.y * 3456.321;
        grain += hash(p);
    }
    grain = 0.25 * (grain - 0.5);

  vec4 shade = clamp(add, .0, .9) + pow(color, vec4(1.0)) ;
  shade = mix(shade, 0.2 - vec4(grain), 0.1);
  // vigneting
  vec2 px  = 1. - 2. * vUv ;
  float vign  = 1.0 - (0.5 * smoothstep(.7, 1.4, length(px * px)));

  shade *= vec4(vign);


  gl_FragColor = shade;
  //gl_FragColor = add;

}
