(function() {
	var SEPARATION = 120;
	var AMOUNTX = 50;
	var AMOUNTY = 50;

	var container;
	var camera, scene, renderer;
	var particles, particle, count = 0;
	var mouseX = 0;
	var mouseY = 0;
	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;

	var windowWidth = $('.who-we-are').width();
	var windowHeight = $('.who-we-are').height() * 0.48;

	setTimeout(function() {
		initCanvas();
		$('.down-arrows-container').show();
		$('.loading-circle').hide();
	}, 1100)

	function initCanvas() {
		init();
		animate();
	}

	function init() {
		container = document.createElement('div');
		container.className = 'particle-container';
		document.body.appendChild(container);
		//		camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
		camera = new THREE.PerspectiveCamera(75, windowWidth / windowHeight, 1, 10000);
		camera.position.x = 1000;
		camera.position.y = 500;
		camera.position.z = 1000;
		scene = new THREE.Scene();
		particles = new Array();
		var PI2 = Math.PI * 2;
		var material = new THREE.ParticleCanvasMaterial({
			color: 0xffffff,
			program: function(context) {
				context.beginPath();
				context.arc(0, 0, 1, 0, PI2, true);
				context.fill();
			}
		});
		var i = 0;
		for(var ix = 0; ix < AMOUNTX; ix++) {
			for(var iy = 0; iy < AMOUNTY; iy++) {
				particle = particles[i++] = new THREE.Particle(material);
				particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2);
				particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2);
				scene.add(particle);
			}
		}
		renderer = new THREE.CanvasRenderer();
		//		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setSize(windowWidth, windowHeight);

		container.appendChild(renderer.domElement);
		document.addEventListener('mousemove', onDocumentMouseMove, false);
		document.addEventListener('touchstart', onDocumentTouchStart, false);
		document.addEventListener('touchmove', onDocumentTouchMove, false);
		window.addEventListener('resize', onWindowResize, false);
	}

	function onWindowResize() {
		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	}

	function onDocumentMouseMove(event) {
		mouseX = event.clientX - windowHalfX;
		mouseY = event.clientY - windowHalfY;
	}

	function onDocumentTouchStart(event) {
		if(event.touches.length === 1) {
			event.preventDefault();
			mouseX = event.touches[0].pageX - windowHalfX;
			mouseY = event.touches[0].pageY - windowHalfY;
		}
	}

	function onDocumentTouchMove(event) {
		if(event.touches.length === 1) {
			event.preventDefault();
			mouseX = event.touches[0].pageX - windowHalfX;
			mouseY = event.touches[0].pageY - windowHalfY;
		}
	}

	function animate() {
		requestAnimationFrame(animate);
		render();
	}

	function render() {
		camera.position.x += (mouseX - camera.position.x) * .02;
		camera.lookAt(scene.position);
		var i = 0;
		for(var ix = 0; ix < AMOUNTX; ix++) {
			for(var iy = 0; iy < AMOUNTY; iy++) {
				particle = particles[i++];
				particle.position.y = 2 * (Math.sin((ix + count) * 0.3) * 50) + 2 * (Math.sin((iy + count) * 0.5) * 50);
				particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.3) + 1) * 2 + (Math.sin((iy + count) * 0.5) + 1) * 2;
			}
		}
		renderer.render(scene, camera);
		count += 0.1;
	}

	$('.cooperate-tab').on('click', 'span', function() {
		var $this = $(this);
		var $index = $this.index();
		$this.addClass('active').siblings().removeClass('active');
		$('.tab-content').find('.content').eq($index).show().siblings().hide();
	})


})()