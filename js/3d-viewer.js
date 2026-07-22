document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('3d-canvas-container');
    if (!container) return;

    // Set up Scene, Camera, Renderer
    const scene = new THREE.Scene();
    
    // Add subtle fog to blend with the background
    scene.fog = new THREE.FogExp2(0x050507, 0.002);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 1, 1000);
    camera.position.set(100, 100, 100);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    // Orbit Controls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2.0;

    // Lighting (Neon Blue / White corporate theme)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight1.position.set(1, 1, 1);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x2563eb, 1); // Neon blue accent
    dirLight2.position.set(-1, -0.5, -1);
    scene.add(dirLight2);
    
    const spotLight = new THREE.SpotLight(0x8b5cf6, 2); // Purple accent
    spotLight.position.set(0, 150, 0);
    spotLight.angle = Math.PI / 4;
    spotLight.penumbra = 0.1;
    scene.add(spotLight);

    // Loader
    const loader = new THREE.STLLoader();
    
    // Add a loading text
    const loadingText = document.createElement('div');
    loadingText.style.position = 'absolute';
    loadingText.style.color = '#fff';
    loadingText.style.top = '50%';
    loadingText.style.left = '50%';
    loadingText.style.transform = 'translate(-50%, -50%)';
    loadingText.style.fontFamily = 'var(--font-heading)';
    loadingText.innerText = 'Yükleniyor... (Loading...)';
    container.appendChild(loadingText);

    loader.load(modelDataUrl, function (geometry) {
        
        // Remove loading text
        if (container.contains(loadingText)) {
            container.removeChild(loadingText);
        }

        // Apply a premium material to the mesh
        const material = new THREE.MeshPhysicalMaterial({
            color: 0xcccccc,
            metalness: 0.7,
            roughness: 0.2,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
            side: THREE.DoubleSide
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        // Center and scale the model
        geometry.computeBoundingBox();
        const box = geometry.boundingBox;
        const center = new THREE.Vector3();
        box.getCenter(center);
        const size = new THREE.Vector3();
        box.getSize(size);
        
        const maxDim = Math.max(size.x, size.y, size.z);
        const targetSize = 100;
        const scale = targetSize / maxDim;
        mesh.scale.set(scale, scale, scale);

        // Center the mesh relative to scene origin
        mesh.position.x = -center.x * scale;
        mesh.position.y = -center.y * scale;
        mesh.position.z = -center.z * scale;

        // If the STL was exported with Z as up, rotate to Y up
        // mesh.rotation.x = -Math.PI / 2;
        
        scene.add(mesh);

        // Adjust camera to fit
        camera.position.z = targetSize * 1.5;
        camera.position.y = targetSize * 0.8;
        controls.update();

    }, undefined, function (error) {
        console.error(error);
        loadingText.innerText = 'Yükleme Hatası (Error loading model)';
    });

    // Handle Window Resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    }
    
    animate();
});
