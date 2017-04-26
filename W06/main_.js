function main_task1()
{
    var width = 500;
    var height = 500;

    var scene = new THREE.Scene();

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 5 );
    scene.add( camera );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );

    var light = new THREE.PointLight( 0xf111ff );
    light.position.set(1,1,1);
    scene.add(light);

    var controls = new THREE.OrbitControls(camera);

    var vertices = [
	[-1,1,0],
	[-1,-1,0],
	[1,-1,0],
	[1,1,0],
	[1,-1,2],
	[1,1,2],
	[-1,1,2],
	[-1,-1,2]
    ];

    var faces = [
	[0,2,1],
	[0,3,2],
	[2,3,4],
	[3,5,4],
	[5,7,4],
	[5,6,7],
	[6,1,7],
	[6,0,1],
	[0,6,3],
	[6,5,3],
	[4,1,2],
	[4,7,1]
    ];

    
    var geometry = new THREE.Geometry();
    for(var i=0; i<8; i++){
	geometry.vertices.push(new THREE.Vector3().fromArray(vertices[i]));
    }

    for(var i=0; i<12; i++){
        geometry.faces.push(new THREE.Face3(faces[i][0],faces[i][1],faces[i][2]));
    }
    

    var material = new THREE.MeshBasicMaterial();
    material.vertexColors = THREE.FaceColors;
    geometry.faces[0].color = new THREE.Color(1,0,0);
    geometry.faces[1].color = new THREE.Color(0,1,0);
    geometry.faces[2].color = new THREE.Color(0,0,1);
    geometry.faces[3].color = new THREE.Color(1,1,0);
    geometry.faces[4].color = new THREE.Color(0,1,1);
    geometry.faces[5].color = new THREE.Color(1,0,1);
    geometry.faces[6].color = new THREE.Color(0,0,0.5);
    geometry.faces[7].color = new THREE.Color(0,0.5,0);
    geometry.faces[8].color = new THREE.Color(0.5,0,0);
    geometry.faces[9].color = new THREE.Color(0,0.5,0.5);
    geometry.faces[10].color = new THREE.Color(0.5,0,0.5);
    geometry.faces[11].color = new THREE.Color(0.5,0.5,0);

    var material = new THREE.MeshBasicMaterial();
    material.vertexColors = THREE.VertexColors;
    geometry.faces[0].vertexColors.push(new THREE.Color(1,0,0));
    geometry.faces[1].vertexColors.push(new THREE.Color(0,1,0));
    geometry.faces[2].vertexColors.push(new THREE.Color(0,0,1));
    geometry.faces[3].vertexColors.push(new THREE.Color(1,1,0));
    geometry.faces[4].vertexColors.push(new THREE.Color(0,1,1));
    geometry.faces[5].vertexColors.push(new THREE.Color(1,0,1));
    geometry.faces[6].vertexColors.push(new THREE.Color(0,0,0.5));
    geometry.faces[7].vertexColors.push(new THREE.Color(0,0.5,0));
    geometry.faces[8].vertexColors.push(new THREE.Color(0.5,0,0));
    geometry.faces[9].vertexColors.push(new THREE.Color(0,0.5,0.5));
    geometry.faces[10].vertexColors.push(new THREE.Color(0.5,0,0.5));
    geometry.faces[11].vertexColors.push(new THREE.Color(0.5,0.5,0));

    var Triangle = new THREE.Mesh(geometry, material);
    scene.add(Triangle);
    
    
    loop();

    function loop()
    {
        requestAnimationFrame( loop );
        Triangle.rotation.x += 0.001;
        Triangle.rotation.y += 0.001;
	controls.update();
        renderer.render( scene, camera );
    }
}



function main_task2()
{
    var width = 500;
    var height = 500;

    var scene = new THREE.Scene();

    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
    camera.position.set( 0, 0, 5 );
    scene.add( camera );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );
    //マウスイベント
    document.addEventListener('mousedown', mouse_down_event);

    var light = new THREE.PointLight( 0xf111ff );
    light.position.set(1,1,1);
    scene.add(light);

    var controls = new THREE.OrbitControls(camera);

    var vertices = [
	[-1,1,0],
	[-1,-1,0],
	[1,-1,0],
	[1,1,0],
	[1,-1,2],
	[1,1,2],
	[-1,1,2],
	[-1,-1,2]
    ];

    var faces = [
	[0,2,1],
	[0,3,2],
	[2,3,4],
	[3,5,4],
	[5,7,4],
	[5,6,7],
	[6,1,7],
	[6,0,1],
	[0,6,3],
	[6,5,3],
	[4,1,2],
	[4,7,1]
    ];

    
    var geometry = new THREE.Geometry();
    for(var i=0; i<8; i++){
	geometry.vertices.push(new THREE.Vector3().fromArray(vertices[i]));
    }

    for(var i=0; i<12; i++){
        geometry.faces.push(new THREE.Face3(faces[i][0],faces[i][1],faces[i][2]));
    }
    

    var material = new THREE.MeshBasicMaterial();
    material.vertexColors = THREE.FaceColors;
    geometry.faces[0].color = new THREE.Color(1,0,0);
    geometry.faces[1].color = new THREE.Color(0,1,0);
    geometry.faces[2].color = new THREE.Color(0,0,1);
    geometry.faces[3].color = new THREE.Color(1,1,0);
    geometry.faces[4].color = new THREE.Color(0,1,1);
    geometry.faces[5].color = new THREE.Color(1,0,1);
    geometry.faces[6].color = new THREE.Color(0,0,0.5);
    geometry.faces[7].color = new THREE.Color(0,0.5,0);
    geometry.faces[8].color = new THREE.Color(0.5,0,0);
    geometry.faces[9].color = new THREE.Color(0,0.5,0.5);
    geometry.faces[10].color = new THREE.Color(0.5,0,0.5);
    geometry.faces[11].color = new THREE.Color(0.5,0.5,0);

    var material = new THREE.MeshBasicMaterial();
    material.vertexColors = THREE.VertexColors;
    geometry.faces[0].vertexColors.push(new THREE.Color(1,0,0));
    geometry.faces[1].vertexColors.push(new THREE.Color(0,1,0));
    geometry.faces[2].vertexColors.push(new THREE.Color(0,0,1));
    geometry.faces[3].vertexColors.push(new THREE.Color(1,1,0));
    geometry.faces[4].vertexColors.push(new THREE.Color(0,1,1));
    geometry.faces[5].vertexColors.push(new THREE.Color(1,0,1));
    geometry.faces[6].vertexColors.push(new THREE.Color(0,0,0.5));
    geometry.faces[7].vertexColors.push(new THREE.Color(0,0.5,0));
    geometry.faces[8].vertexColors.push(new THREE.Color(0.5,0,0));
    geometry.faces[9].vertexColors.push(new THREE.Color(0,0.5,0.5));
    geometry.faces[10].vertexColors.push(new THREE.Color(0.5,0,0.5));
    geometry.faces[11].vertexColors.push(new THREE.Color(0.5,0.5,0));

    var Triangle = new THREE.Mesh(geometry, material);
    scene.add(Triangle);
    
    
    loop();

    function mouse_down_event(event){
	var x_win = event.clientX;
	var y_win = event.clientY;

	
	var vx = renderer.domElement.offsetLeft;
	var vy = renderer.domElement.offsetTop;
	var vw = renderer.domElement.width;
	var vh = renderer.domElement.height;

	var x_NDC = 2*(x_win - vx)/vw - 1;
	var y_NDC = -(2*(y_win - vy)/vh - 1);

	var p_NDC = new THREE.Vector3( x_NDC, y_NDC, 1);
	var p_wld = p_NDC.unproject( camera );

	var origin = camera.position;
	var direction = p_wld.sub(origin).normalize();

	var raycaster = new THREE.Raycaster( origin, direction );
	var intersects = raycaster.intersectObject( Triangle );
	if (intersects.length > 0)
	{
	    intersects[0].face.color.setRGB(1,1,1);
	    intersects[0].object.geometry.colorsNeedUpdate = true;
	}

    }

    function loop()
    {
        requestAnimationFrame( loop );
        Triangle.rotation.x += 0.001;
        Triangle.rotation.y += 0.001;
	controls.update();
        renderer.render( scene, camera );
    }
}



