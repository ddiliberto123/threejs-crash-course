# threejs-crash-course

Following along to: https://youtu.be/KM64t3pA4fs?si=OHHEeXO98qqVfVa7

Some notes:

3 Main things:
1. The scene, where all the objects live
2. The camera, the actual perspective that the user sees. Main 2 are perspective that lets you move around and orthographic which is more stationary. The orthographic also looks a little less realistic imo since all lines in the scene are parallel to one another unlike perspective.
3. Renderer process, responsible for rendering all the stuff in the scene

A mesh the rendereable object and is made of the following: 
1. A geometry which is broken down into triangles, the more triangles the higher the detail but the higher the GPU intensity. 
2. A material which includes how the geometry should look. A material can have multiple things including. Changing the parameter affects the property uniformly accross the entire mesh. This however can be changed by inserting a map into the material. This map can be loaded via a texture loader. These materials can have a lot of perameters, such as:
  1. Roughness, how rough a material looks
  2. Metalness, how metalic/shiny a material looks
  3. Normal, how light should bounce off the material.
  4. Ambient Occlusion, AO, how ambient things occlude eachother.
  5. Height, (displacement in threejs) changes the height of the mesh and therefore the actual geometry of the shape resulting more triangles to be required for more LOD.

There are 2 main types of materials:
  1. Non Environmental, these do not get affected by light and therefore do not having shading. Ex:
    1. Mesh Basic Material
    2. Mesh Depth Material
  2. Environmental, environmental use physically based rendering, PBR, allowing light to change the shading of the mesh. For this reason, they have more settings that describe the way light should bounce off them. Ex in increasing order of realism:
    1. Lambert
    2. Phong
    3. Normal
    4. Physical

In terms of the maps that u can provide for PBR texture set, the main ones are:
  1. Albedo, the base texture: what it looks like, the color represented in rgb
  2. AO, the ambient occlusion map represented in black and white
  3. Height, the height map represented in black and white brighter often means higher
  4. Metallic, the metalness map represented in black and white
  5. Normal, the normal map represented in rgb
  6. Roughness, the roughness map represented in black and white, black generally means smoother, white means rougher.