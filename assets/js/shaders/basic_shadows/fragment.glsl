
uniform float opacity;
//chunk(common);
//chunk(packing);
//chunk(bsdfs);
//chunk(lights_pars);
//chunk(shadowmap_pars_fragment);
//chunk(shadowmask_pars_fragment);

void main(void) {

    gl_FragColor = vec4( 0.0, 0.0, 0.0, opacity * (  1.0 - getShadowMask() ) );
}
