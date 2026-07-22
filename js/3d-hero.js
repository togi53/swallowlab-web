document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    // Scene Setup
    const scene = new THREE.Scene();

    // Use a very light fog to fade into the white background
    scene.fog = new THREE.FogExp2(0xffffff, 0.002);

    // Camera Setup
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 100;
    
    // Kamerayı sola kaydırarak 3D objenin ekranda sağ tarafa yerleşmesini sağlıyoruz
    camera.position.x = -45;

    // Renderer Setup
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    
    // Lighting - High-end studio lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(10, 20, 10);
    scene.add(dirLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.8);
    backLight.position.set(-10, 10, -10);
    scene.add(backLight);

    let targetObject = null;

    // Fallback Geometri
    function createFallback() {
        const material = new THREE.MeshPhysicalMaterial({
            color: 0x222222,
            metalness: 0.8,
            roughness: 0.2,
            clearcoat: 0.5,
            clearcoatRoughness: 0.1
        });
        const geometry = new THREE.TorusKnotGeometry(15, 4, 100, 16);
        targetObject = new THREE.Mesh(geometry, material);
        scene.add(targetObject);
    }

    // Try to load GLTFLoader
    if (typeof THREE.GLTFLoader !== 'undefined') {
        const loader = new THREE.GLTFLoader();
        loader.load('models/vazotolga.glb', function (gltf) {
            
            targetObject = gltf.scene;

            // Center geometry
            const box = new THREE.Box3().setFromObject(targetObject);
            const center = new THREE.Vector3();
            box.getCenter(center);
            
            // Adjust position to center
            targetObject.position.x += (targetObject.position.x - center.x);
            targetObject.position.y += (targetObject.position.y - center.y);
            targetObject.position.z += (targetObject.position.z - center.z);

            // Scale geometry to fit nicely
            const size = new THREE.Vector3();
            box.getSize(size);
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 50 / maxDim; // Adjusted scale for a vase
            
            targetObject.scale.set(scale, scale, scale);
            
            scene.add(targetObject);

        }, undefined, function (error) {
            console.warn("vazotolga.glb yüklenemedi, fallback obje kullanılıyor. Lütfen models/vazotolga.glb dosyasının yolunu kontrol edin.", error);
            createFallback();
        });
    } else {
        createFallback();
    }

    // Mouse Interaction (Lerp)
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX) * 0.001;
        mouseY = (event.clientY - windowHalfY) * 0.001;
    });

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);

        if (targetObject) {
            // Auto rotation slowly
            targetObject.rotation.y += 0.003;

            // Lerp towards mouse direction
            targetX = mouseX;
            targetY = mouseY;
            
            // Apply slight tilt based on mouse
            targetObject.rotation.y += (targetX - targetObject.rotation.y) * 0.05;
            targetObject.rotation.x += (targetY - targetObject.rotation.x) * 0.05;
        }

        renderer.render(scene, camera);
    }

    animate();

    // Resize handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
});
