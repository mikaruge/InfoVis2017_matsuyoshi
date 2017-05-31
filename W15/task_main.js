var volume = new KVS.LobsterData();
var screen = new KVS.THREEScreen();

var isovalue = 128;
var surfaces;

function main()
{
   

    screen.init( volume, {
        width: window.innerWidth * 0.8,
        height: window.innerHeight,
	targetDom: document.getElementById("display"),
        enableAutoResize: false
    });

    var bounds = Bounds( volume );
    screen.scene.add( bounds );

    //var isovalue = 128;
    surfaces = Isosurfaces( volume, isovalue );
    screen.scene.add( surfaces );

    document.addEventListener( 'mousemove', function() {
        screen.light.position.copy( screen.camera.position );
    });

    window.addEventListener( 'resize', function() {
        screen.resize( [ window.innerWidth * 0.8, window.innerHeight ] );
    });

    screen.loop();
}


function kattsun(){
            var obj = document.getElementById("isovalue");
            var obj_value = obj.value;
            document.getElementById("showRangeArea").textContent = obj.value;
            isovalue = obj_value;
            screen.scene.remove(surfaces);
            surfaces = Isosurfaces(volume,isovalue);
            screen.scene.add(surfaces);
}
