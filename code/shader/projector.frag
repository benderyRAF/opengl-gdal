#version 330 
uniform sampler2D gPositionMap; 
uniform sampler2D gTextureMap; 
uniform sampler2D gNormalMap;

uniform sampler2D proj_tex; 
uniform sampler2D mask_tex;

uniform vec3 dirlight;
uniform vec3 color;

// Intensitys
uniform float ambient;
uniform float diffuse;
uniform float specular; 
uniform float specularPower; // specular power
uniform mat4 projection;
uniform mat4 view;
uniform mat4 tex;

// Cameras position in the world
uniform vec3 EyePos;

// Thank you oglvdev
uniform vec2 gScreenSize;
vec2 CalcTexCoord()
{
    return gl_FragCoord.xy / gScreenSize;
}

layout (location = 0) out vec4 TexOut;

void main()
{
  vec2 TexCoord = CalcTexCoord();

  // Just a pass through for now
  vec3 pos = texture(gPositionMap,TexCoord).xyz;
  vec4 texmap = texture(gTextureMap,TexCoord);
  vec4 test = (tex * projection * view * vec4(pos,1.0));
  vec2 uv = test.xy;

  if( test.w > 0 &&  uv.x >= 0 && uv.x <= 1 && uv.y >= 0 && uv.y <= 1 )
  {
    TexOut = vec4(texture(proj_tex,uv.xy).xyz,.7);
  }
  else
  {
    discard;
  }
}
