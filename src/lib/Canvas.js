import * as THREE from 'three';
import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import BasicCharacterController from './CharacterController.js';
import ThirdPersonCamera from './ThirdPersonCamera.js';


export default class Canvas {
    constructor(canvasId) {
        this.canvasId = canvasId;
        this._Initialize();
    }

    _Initialize() {
        // NOTE: Specify a canvas which is already created in the HTML.
        const canvas = document.getElementById(this.canvasId);
        this.renderer = new THREE.WebGLRenderer({
            canvas,
            // NOTE: Anti-aliasing smooths out the edges.
            antialias: true,
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        // this.renderer.shadowMap.enabled = true;
        document.body.appendChild(this.renderer.domElement);

        // this._threejs.outputEncoding = THREE.sRGBEncoding;
        // this._threejs.shadowMap.enabled = true;
        // this._threejs.shadowMap.type = THREE.PCFSoftShadowMap;
        // this._threejs.setPixelRatio(window.devicePixelRatio);
        // this._threejs.setSize(window.innerWidth, window.innerHeight);

        // document.body.appendChild(this._threejs.domElement);

        window.addEventListener('resize', () => {
            this._OnWindowResize();
        }, false);

        const fov = 60;
        const aspect = 1920 / 1080;
        const near = 1.0;
        const far = 1000.0;
        this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        this._camera.position.set(25, 10, 25);

        this._scene = new THREE.Scene();

        let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
        light.position.set(-100, 100, 100);
        light.target.position.set(0, 0, 0);
        light.castShadow = true;
        light.shadow.bias = -0.001;
        light.shadow.mapSize.width = 4096;
        light.shadow.mapSize.height = 4096;
        light.shadow.camera.near = 0.1;
        light.shadow.camera.far = 500.0;
        light.shadow.camera.near = 0.5;
        light.shadow.camera.far = 500.0;
        light.shadow.camera.left = 50;
        light.shadow.camera.right = -50;
        light.shadow.camera.top = 50;
        light.shadow.camera.bottom = -50;
        this._scene.add(light);

        // Adding light to scene
        light = new THREE.AmbientLight(0xFFFFFF, 0.25);
        this._scene.add(light);

        // Point of interest
        // let ineraction = new THREE.Geometry();
        // ineraction.vertices.push(new THREE.Vector3(100, 0, 100));
        // let dotMaterial = new THREE.PointsMaterial({ size: 200, sizeAttenuation: false });
        // let dot = new THREE.Points(ineraction, dotMaterial);
        // this._scene.add(dot);

        // Adding green plane
        const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(5000, 5000, 10, 10),
            new THREE.MeshStandardMaterial({
                color: 0x7CFC00,
            }));
        plane.castShadow = false;
        plane.receiveShadow = true;
        plane.rotation.x = -Math.PI / 2;
        this._scene.add(plane);

        this._mixers = [];
        this._previousRAF = null;

        this._LoadAnimatedModel();
        this._LoadAnimatedModelAndPlay('../assets/npc/', 'npc_body.fbx', 'idleSad.fbx', new THREE.Vector3(150, 0, 100), -Math.PI / 2);
        this._LoadAnimatedModelAndPlay('../assets/npc/', 'npc_body.fbx', 'greeting.fbx', new THREE.Vector3(300, 0, 100), -Math.PI / 1);
        this._LoadAnimatedModelAndPlay('../assets/npc/', 'npc_body.fbx', 'idleSad.fbx', new THREE.Vector3(0, 0, 100), -Math.PI / 1);
        this._LoadAnimatedModelAndPlay('../assets/npc/', 'npc_body.fbx', 'idleSad.fbx', new THREE.Vector3(150, 0, 0), - Math.PI / 2);
        this._LoadAnimatedModelAndPlay('../assets/npc/', 'npc_body.fbx', 'idleSad.fbx', new THREE.Vector3(300, 0, 0), -Math.PI / 5);
        this._RAF();
        // this._LoadModel();
    }

    _LoadAnimatedModelAndPlay(path, modelFile, animFile, offset, modelRotation) {
        const loader = new FBXLoader();
        loader.setPath(path);
        loader.load(modelFile, (fbx) => {
            fbx.scale.setScalar(0.25);
            fbx.rotation.y = modelRotation;
            fbx.traverse(c => {
                c.castShadow = true;
            });
            fbx.position.copy(offset);

            const anim = new FBXLoader();
            anim.setPath(path);
            anim.load(animFile, (anim) => {
                const m = new THREE.AnimationMixer(fbx);
                this._mixers.push(m);
                const idle = m.clipAction(anim.animations[0]);
                idle.play();
            });
            this._scene.add(fbx);
        });
    }

    // _LoadModel() {
    //   const loader = new GLTFLoader();
    //   loader.load('./resources/school/stad.gltf', (gltf) => {
    //     gltf.scene.traverse(c => {
    //       c.castShadow = true;
    //     });
    //     gltf.scene.scale.setScalar(25);
    //     gltf.scene.rotation.y = -Math.PI / 1.5;
    //     this._scene.add(gltf.scene);
    //   });
    // }

    _LoadAnimatedModel() {
        const params = {
            camera: this._camera,
            scene: this._scene,
        }
        this._controls = new BasicCharacterController(params);

        this._thirdPersonCamera = new ThirdPersonCamera({
            camera: this._camera,
            target: this._controls,
        });
    }

    _OnWindowResize() {
        this._camera.aspect = window.innerWidth / window.innerHeight;
        this._camera.updateProjectionMatrix();
        this._threejs.setSize(window.innerWidth, window.innerHeight);
    }

    _Step(timeElapsed) {
        const timeElapsedS = timeElapsed * 0.001;
        if (this._mixers) {
            this._mixers.map(m => m.update(timeElapsedS));
        }

        if (this._controls) {
            this._controls.Update(timeElapsedS);
        }

        this._thirdPersonCamera.Update(timeElapsedS);
    }

    _RAF() {
        requestAnimationFrame((t) => {
            if (this._previousRAF === null) {
                this._previousRAF = t;
            }

            this._threejs.render(this._scene, this._camera);
            this._Step(t - this._previousRAF);
            this._previousRAF = t;
        });
    }
}
