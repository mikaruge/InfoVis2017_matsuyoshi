function AreaOfTriangle(v0,v1,v2)
{
    var vec1 = new Vec3(v1.x-v0.x, v1.y-v0.y, v1.z-v0.z);
    var vec2 = new Vec3(v2.x-v0.x, v2.y-v0.y, v2.z-v0.z);


    var vec1_mag = Math.pow(vec1.x,2)+Math.pow(vec1.y,2)+Math.pow(vec1.z,2);
    var vec2_mag = Math.pow(vec2.x,2)+Math.pow(vec2.y,2)+Math.pow(vec2.z,2);
    var inner_vec = vec1.x*vec2.x + vec1.y*vec2.y + vec1.z*vec2.z;

    var menseki = Math.sqrt(vec1_mag*vec2_mag-Math.pow(inner_vec,2))/2;

    return menseki;

}
