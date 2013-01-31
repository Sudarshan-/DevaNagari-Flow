document.addEventListener("DOMContentLoaded", function () {
    var camera, // Core 3.js component
    scene, // Core 3.js component
    renderer, // Core 3.js component
    mouseX = 0, // Tracking Mouse Positions
        mouseY = 0, // Tracking Mouse Positions
        charCounter = 0951,
        particles = []; // Array to store all particles

    init(); //Call Initializer

    //Initializer function
    function init() {
        //Focus of View( Camera view angle), Aspect Ratio, near Clipping Frame and Far Clipping Frame
        camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 10000);

        /*The first parameter for the Camera constructor is field of view. This is an angle in degrees – the larger the angle, the wider the virtual camera lens.

  	The second parameter is the aspect ratio between the width and the height of the output. This has to match the aspect of the CanvasRenderer, which we’ll come to in a moment.

		The camera can only see objects within a certain range, defined by near and far, set here to 1 and 4000 respectively. So any object that is closer than 1 or further away than 4000 will not be rendered.

		By default the camera is at the origin of the 3D world, 0,0,0, which isn’t very useful because any 3D object you create will also be positioned at at the origin. It’s a good idea to move the camera back a bit by giving it a positive z position (z increases as it comes out of the screen towards you). In this case we’re moving it back by 1000.*/

        //Set Z-index of Camera backward to see some 3D view
        camera.position.z = 100;

        //Creating a Scene for 3D Data
        scene = new THREE.Scene();
        scene.add(camera); // Adding a camera to Scene

        renderer = new THREE.CanvasRenderer(); //Create a renderer for Canvas
        renderer.setSize(window.innerWidth, window.innerHeight); //Set to window size or your size

        document.body.appendChild(renderer.domElement); //We are adding three.js canvas element to DOM Here
        makeParticles(); // Create Particles
        //document.addEventListener("mousemove",onMove,false); // Add handler to all mouse movements
        setInterval(updateCanvas, 1000 / 14); // take 1000 (the number of mils in a second) and divide it by our frame rate.

    }

    function makeParticles() {
        var particle, //Creating Core Particles
        material; //Creating Material with which particle is to be made

        //Iterate from a zone of -1000 to 1000 and position particles at random place SO WE CREATE 100 Particles
        for (var zindex = -1000; zindex < 1000; zindex += 20) {
            //Create a Material with a color and pass reference to a rendered to draw and define its shape
            material = new THREE.ParticleCanvasMaterial({
                color: 0xffffff,
                program: particleRender
            }); //Initializing Object with Constructor Parameters
            particle = new THREE.Particle(material);

            //Place Positions of X and Y
            particle.position.x = Math.random() * 2000 - 1000;
            particle.position.y = Math.random() * 1000 - 500;

            particle.position.z = zindex; // Place it on out iterator

            particle.scale.x = particle.scale.y = 4; // Scale to our factor

            scene.add(particle); // Add to scene
            particles.push(particle); //Push to out list of particles

        }
    }

    function particleRender(context) {

        /*/ we get passed a reference to the canvas context
	context.beginPath();
	// and we just have to draw our shape at 0,0 - in this
	// case an arc from 0 to 2Pi radians or 360º - a full circle!
	context.arc( 0, 0, 1, 0,  Math.PI * 2, true );
	context.fill();*/
        var text = String.fromCharCode(charCounter);
        context.font = '20pt Calibri';
        context.fillStyle = 'cyan';
        context.fillText(text, 0, 0);
        charCounter = charCounter + 1;
        if (charCounter > 0959) {
            charCounter = 0951;
        }
    }

    function onMove() {
        // store the mouseX and mouseY position 
        mouseX = event.clientX;
        mouseY = event.clientY;
    }

    function updateParticles() {
        // iterate through every particle
        for (var i = 0; i < particles.length; i++) {

            particle = particles[i];

            // and move it forward dependent on the mouseY position. 
            particle.position.z += 20;

            // if the particle is too close move it to the back
            if (particle.position.z > 1000) particle.position.z = -1000;

        }
    }


    function updateCanvas() { // This is called for a frame rate of 30fps

        updateParticles(); // Update DOM
        // and render the scene from the perspective of the camera
        renderer.render(scene, camera);
    }

});
