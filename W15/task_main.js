var volume = new KVS.LobsterData();
var screen = new KVS.THREEScreen();

var isovalue = 128;
var surfaces;
var roughness = 0.5;
var reflec = "phong";
var shard = "phong";

function main()
{
   

    screen.init( volume, {
        width: window.innerWidth * 0.75,
        height: window.innerHeight,
	targetDom: document.getElementById("display"),
        enableAutoResize: false
    });

    var bounds = Bounds( volume );
    screen.scene.add( bounds );

    //var isovalue = 128;
    surfaces = Isosurfaces( volume, isovalue, roughness, reflec, shard);
    screen.scene.add( surfaces );

    document.addEventListener( 'mousemove', function() {
        screen.light.position.copy( screen.camera.position );
    });

    window.addEventListener( 'resize', function() {
        screen.resize( [ window.innerWidth * 0.75, window.innerHeight ] );
    });

    screen.loop();
}

function input_isovalue(){
    var obj = document.getElementById("value_isovalue");
    var obj_value = obj.value;
    var roughness = document.getElementById("showRoughness").textContent;
    if(obj_value >= 0 && obj_value <= 255 && Math.round(obj_value)==obj_value){
	document.getElementById("showIsovalue").textContent = obj_value;
        isovalue = obj_value;
        screen.scene.remove(surfaces);
        surfaces = Isosurfaces(volume,isovalue,roughness,reflec,shard);
	screen.scene.add(surfaces);
    }else{
	alert("input 0 ~ 255 and integer");
    }			      
}

function input_roughnessvalue(){
    var obj = document.getElementById("value_roughness");
    var obj_value = obj.value;
    if(document.getElementById("reflection").value == "cook-Torrance"){
	if(obj_value >= 0 && obj_value <= 1.0){
	    document.getElementById("showRoughness").textContent = obj_value;
            roughness = obj_value;
            screen.scene.remove(surfaces);
            surfaces = Isosurfaces(volume,isovalue,roughness,reflec,shard);
	    screen.scene.add(surfaces);
	}else{
	    alert("input 0 ~ 1.0");
	}
    }else{
	alert("please select 'cook-Torrance' as a reflecton model");
    }
}

function realtime_IsovalueChange(){
    var obj = document.getElementById("isovalue");
    var obj_value = obj.value;
    var roughness = document.getElementById("showRoughness").textContent;
    
    document.getElementById("showIsovalue").textContent = obj_value;
    isovalue = obj_value;
    screen.scene.remove(surfaces);
    surfaces = Isosurfaces(volume,isovalue,roughness,reflec,shard);
    screen.scene.add(surfaces);
}

function realtime_RoughnessChange(){
    var obj = document.getElementById("roughness");
    var obj_value = obj.value;
    if(document.getElementById("reflection").value == "cook-Torrance"){
	document.getElementById("showRoughness").textContent = obj_value;
	roughness = obj_value;
	screen.scene.remove(surfaces);
	surfaces = Isosurfaces(volume,isovalue,roughness,reflec,shard);
	screen.scene.add(surfaces);
    }
}

function input_reflectionchange(){
    var obj = document.getElementById("reflection");
    var obj_value = obj.value;
    document.getElementById("showReflection").textContent = obj_value;
    reflec = obj_value;
    screen.scene.remove(surfaces);
    surfaces = Isosurfaces(volume,isovalue,roughness,reflec,shard);
    screen.scene.add(surfaces);
}

function input_shardingchange(){
    var obj = document.getElementById("sharding");
    var obj_value = obj.value;
    document.getElementById("showSharding").textContent = obj_value;
    shard = obj_value;
    screen.scene.remove(surfaces);
    surfaces = Isosurfaces(volume,isovalue,roughness,reflec,shard);
    screen.scene.add(surfaces);
}

function init(){
    document.getElementById("showIsovalue").textContent = 128;
    isovalue=128;
    document.getElementById("showRoughness").textContent = 0.5;
    roughness=0.5;
    document.getElementById("showReflection").textContent = "phong";
    reflec="phong";
    document.getElementById("showSharding").textContent = "phong";
    shard="phong";
    screen.scene.remove(surfaces);
    surfaces = Isosurfaces(volume,128,0.5,"phong","phong");
    screen.scene.add(surfaces);

}
