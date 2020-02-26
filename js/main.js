class localScene {
    constructor() {
        //necessities;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });

        //groups
        this.objects = [];
        this.lights = [];
        //var cameras;

        this.setRendererDefaults();
        this.setCameraDefaults();
        this.addResizeListener();
        this.appendRenderer();
    }

    appendRenderer() {
        document.body.appendChild(this.renderer.domElement);
    }

    addResizeListener() {
        window.addEventListener('resize', () => {
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
        })
    }

    setCameraDefaults() {
        this.camera.position.z = 5;
    }

    setRendererDefaults() {
        this.renderer.setClearColor("#e5e5e5");
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

var myScene = new localScene();
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshLambertMaterial({ color: 0xF7F7F7 });

for (var i = 0; i < 15; i++) {
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = (Math.random() - .5) * 10;
    mesh.position.y = (Math.random() - .5) * 10;
    mesh.position.z = (Math.random() - .5) * 10;
    //myScene.objects.push(mesh);
    myScene.objects.push(mesh);
}

var light = new THREE.PointLight(0xffffff, 1, 1000);
light.position.set(0, 0, 0);
myScene.lights.push(light);

var light = new THREE.PointLight(0xffffff, 2, 1000);
light.position.set(0, 0, 25);
myScene.lights.push(light);

for (var i = 0; i < myScene.objects.length; i++) {
    myScene.scene.add(myScene.objects[i]);
}

for (var i = 0; i < myScene.lights.length; i++) {
    myScene.scene.add(myScene.lights[i]);
}

var render = function () {
    requestAnimationFrame(render);
    myScene.renderer.render(myScene.scene, myScene.camera);
}

function onMouseMove(event) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, myScene.camera);

    var intersects = raycaster.intersectObjects(myScene.scene.children, true);
    for (var i = 0; i < intersects.length; i++) {
        this.tl = new TimelineMax({ paused: true });
        this.tl.to(intersects[i].object.scale, 1, { x: 2, ease: Expo.easeOut });
        this.tl.to(intersects[i].object.scale, .5, { x: .5, ease: Expo.easeOut });
        this.tl.to(intersects[i].object.position, .5, { x: 2, ease: Expo.easeOut });
        this.tl.to(intersects[i].object.rotation, .5, { y: Math.PI * .5, ease: Expo.easeOut }, "=-1.5");
        this.tl.play();
    }
}

render();

window.addEventListener('click', onMouseMove);

