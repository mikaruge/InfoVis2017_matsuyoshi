function Isosurfaces( volume, isovalue )
{
    var geometry = new THREE.Geometry();
    var material = new THREE.MeshLambertMaterial();

    var smin = volume.min_value;
    var smax = volume.max_value;
    isovalue = KVS.Clamp( isovalue, smin, smax );

    /*
    var scalars = [
	0.1,   // S0
	0.2, // S1
	0.8  // S2
    ];*/

    // Create color map
    var RESOLUTION = 256;//resolution
    var cmap = [];
    for ( var i = 0; i < RESOLUTION; i++ )
    {
      var S = i / (RESOLUTION-1); // [0,1]
      var R = Math.max( Math.cos( ( S - 1.0 ) * Math.PI ), 0.0 );
      var G = Math.max( Math.cos( ( S - 0.5 )* Math.PI ), 0.0 );
      var B = Math.max( Math.cos(  S * Math.PI ), 0.0 );
      var color = new THREE.Color( R, G, B );
      cmap.push( [ S, '0x' + color.getHexString() ] );
    }

    var lut = new KVS.MarchingCubesTable();
    var cell_index = 0;
    var counter = 0;
    for ( var z = 0; z < volume.resolution.z - 1; z++ )
    {
        for ( var y = 0; y < volume.resolution.y - 1; y++ )
        {
            for ( var x = 0; x < volume.resolution.x - 1; x++ )
            {
                var indices = cell_node_indices( cell_index++ );
                var index = table_index( indices );
                if ( index == 0 ) { continue; }
                if ( index == 255 ) { continue; }

                for ( var j = 0; lut.edgeID[index][j] != -1; j += 3 )
                {
                    var eid0 = lut.edgeID[index][j];
                    var eid1 = lut.edgeID[index][j+2];
                    var eid2 = lut.edgeID[index][j+1];

                    var vid0 = lut.vertexID[eid0][0];
                    var vid1 = lut.vertexID[eid0][1];
                    var vid2 = lut.vertexID[eid1][0];
                    var vid3 = lut.vertexID[eid1][1];
                    var vid4 = lut.vertexID[eid2][0];
                    var vid5 = lut.vertexID[eid2][1];

                    var v0 = new THREE.Vector3( x + vid0[0], y + vid0[1], z + vid0[2] );
                    var v1 = new THREE.Vector3( x + vid1[0], y + vid1[1], z + vid1[2] );
                    var v2 = new THREE.Vector3( x + vid2[0], y + vid2[1], z + vid2[2] );
                    var v3 = new THREE.Vector3( x + vid3[0], y + vid3[1], z + vid3[2] );
                    var v4 = new THREE.Vector3( x + vid4[0], y + vid4[1], z + vid4[2] );
                    var v5 = new THREE.Vector3( x + vid5[0], y + vid5[1], z + vid5[2] );

                    var v01 = interpolated_vertex( v0, v1, isovalue );
                    var v23 = interpolated_vertex( v2, v3, isovalue );
                    var v45 = interpolated_vertex( v4, v5, isovalue );

                    geometry.vertices.push( v01 );
                    geometry.vertices.push( v23 );
                    geometry.vertices.push( v45 );

                    var id0 = counter++;
                    var id1 = counter++;
                    var id2 = counter++;
                    geometry.faces.push( new THREE.Face3( id0, id1, id2 ) );
                }
            }
            cell_index++;
        }
        cell_index += volume.resolution.x;
    }

    geometry.computeVertexNormals();


    

    // Assign colors for each vertex(各頂点に色をつける場合）
    /*
    material.vertexColors = THREE.VertexColors;
    var S_max = Math.max.apply(null,scalars);
    var S_min = Math.min.apply(null,scalars);
    for ( var i = 0; i < geometry.faces.length; i++ )
    {
	var S0 = scalars[ 0 ];
	var S1 = scalars[ 1 ];
	var S2 = scalars[ 2 ];
	var C0 = GetColor(S0,S_min,S_max,cmap); 
	var C1 = GetColor(S1,S_min,S_max,cmap); 
	var C2 = GetColor(S2,S_min,S_max,cmap); 
	geometry.faces[i].vertexColors.push( C0 );
	geometry.faces[i].vertexColors.push( C1 );
	geometry.faces[i].vertexColors.push( C2 );
    }*/
    
    //cmapの第一引数で、カラーマップ中の色を指定する.
    var Color = new THREE.Color().setHex( cmap[128][1] );
    material.color = new THREE.Color( Color );

    return new THREE.Mesh( geometry, material );


    function cell_node_indices( cell_index )
    {
        var lines = volume.resolution.x;
        var slices = volume.resolution.x * volume.resolution.y;

        var id0 = cell_index;
        var id1 = id0 + 1;
        var id2 = id1 + lines;
        var id3 = id0 + lines;
        var id4 = id0 + slices;
        var id5 = id1 + slices;
        var id6 = id2 + slices;
        var id7 = id3 + slices;

        return [ id0, id1, id2, id3, id4, id5, id6, id7 ];
    }

    function table_index( indices )
    {
        var s0 = volume.values[ indices[0] ][0];
        var s1 = volume.values[ indices[1] ][0];
        var s2 = volume.values[ indices[2] ][0];
        var s3 = volume.values[ indices[3] ][0];
        var s4 = volume.values[ indices[4] ][0];
        var s5 = volume.values[ indices[5] ][0];
        var s6 = volume.values[ indices[6] ][0];
        var s7 = volume.values[ indices[7] ][0];

        var index = 0;
        if ( s0 > isovalue ) { index |=   1; }
        if ( s1 > isovalue ) { index |=   2; }
        if ( s2 > isovalue ) { index |=   4; }
        if ( s3 > isovalue ) { index |=   8; }
        if ( s4 > isovalue ) { index |=  16; }
        if ( s5 > isovalue ) { index |=  32; }
        if ( s6 > isovalue ) { index |=  64; }
        if ( s7 > isovalue ) { index |= 128; }

        return index;
    }

    //線形補間する部分
    function interpolated_vertex( v0, v1, s )
    {
	var xit = volume.resolution.x;
	var yit = volume.resolution.y;
	var id0 = v0.x + v0.y*xit + v0.z*xit*yit;   //座標v0のインデックスを求める
	var id1 = v1.x + v1.y*xit + v1.z*xit*yit;   //座標v1のインデックスを求める
	var s0 = volume.values[ id0 ][0];         //id0からv0の値(?)を求める
	var s1 = volume.values[ id1 ][0];         //id1からv1の値(?)を求める
	var t = (s - s0)/(s1 - s0);               //v0とv1の間で線形補完を行う
	var x = v0.x + t*(v1.x-v0.x);
	var y = v0.y + t*(v1.y-v0.y);
	var z = v0.z + t*(v1.z-v0.z);
        return new THREE.Vector3(x,y,z);
    }

    /*
    function GetColor(S,S_min,S_max,cmap){
	var resolution = cmap.length
	var index = Normalize(S,S_min,S_max)*(resolution-1);
	var index0 = Math.floor(index);
	var index1 = Math.min(index0+1,resolution-1);
	var t = index - index0; // t = (index-index0)/(index1-index0)
	var C0 = new THREE.Color().setHex( cmap[ index0 ][1] );
	var C1 = new THREE.Color().setHex( cmap[ index1 ][1] );
	var R = Interpolate(C0.r,C1.r,t);
	var G = Interpolate(C0.g,C1.g,t);
	var B = Interpolate(C0.b,C1.b,t);
	return new THREE.Color(R,G,B);
    }
    
    function Normalize(S,S_min,S_max){ // e.g. S:0.1~0.8 -> S:0~1
	return (S-S_min)/(S_max-S_min);
    }

    function Interpolate(S0,S1,t){ 
	return (1-t)*S0+t*S1;
    }*/
}
