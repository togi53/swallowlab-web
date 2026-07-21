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

    // Renderer Setup
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Lighting - High-end studio lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(10, 20, 10);
    scene.add(dirLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
    backLight.position.set(-10, 10, -10);
    scene.add(backLight);

    // Material - Dark metallic (minimalist luxury)
    const material = new THREE.MeshPhysicalMaterial({
        color: 0x222222,
        metalness: 0.8,
        roughness: 0.2,
        clearcoat: 0.5,
        clearcoatRoughness: 0.1
    });

    let targetObject = null;

    // Fallback Geometri (Kullanıcı logo.stl yüklemediyse veya CORS hatası varsa)
    function createFallback() {
        const geometry = new THREE.TorusKnotGeometry(15, 4, 100, 16);
        targetObject = new THREE.Mesh(geometry, material);
        scene.add(targetObject);
    }

    // Try to load STLLoader
    if (typeof THREE.STLLoader !== 'undefined') {
        const loader = new THREE.STLLoader();
        loader.load('assets/models/logo.stl', function (geometry) {
            
            // Center geometry
            geometry.computeBoundingBox();
            const box = geometry.boundingBox;
            const center = new THREE.Vector3();
            box.getCenter(center);
            geometry.translate(-center.x, -center.y, -center.z);

            // Scale geometry to fit nicely
            const size = new THREE.Vector3();
            box.getSize(size);
            const maxDim = Math.max(size.x, size.y, size.z);
            const scale = 40 / maxDim;
            
            targetObject = new THREE.Mesh(geometry, material);
            targetObject.scale.set(scale, scale, scale);
            
            // Rotate to look correct if needed (some STLs are Z-up)
            targetObject.rotation.x = -Math.PI / 2;
            
            scene.add(targetObject);

        }, undefined, function (error) {
            console.warn("logo.stl yüklenemedi, fallback obje kullanılıyor. Lütfen assets/models/logo.stl dosyasını sunucuya ekleyin veya CORS kısıtlamalarını kontrol edin.");
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
            targetObject.rotation.y += 0.005;
            targetObject.rotation.x += 0.002;

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
