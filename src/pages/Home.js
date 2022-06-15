import * as THREE from 'three';
import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useEffect } from 'react';
import Model from './Stad';
import Markthal from './Markthal.js';
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const Home = () => {

    // useEffect(() => {
    //     let test = new SceneInit('canvas');
    //     test.initialize();
    //     test.animate();

    //     const plane = new THREE.Mesh(
    //         new THREE.PlaneGeometry(5000, 5000, 10, 10),
    //         new THREE.MeshStandardMaterial({
    //             color: 0x7CFC00,
    //         })
    //     );
    //     test.scene.add(plane);
    // }, []);
    // <canvas id="canvas" />
    return (
        <>
            <Canvas
                camera={{ position: [2, 0, 12.25], fov: 60 }}
                style={{
                    backgroundColor: '#111a21',
                    width: '100vw',
                    height: '100vh',
                }}
            >
                <ambientLight intensity={1.25} />
                <ambientLight intensity={0.1} />
                <directionalLight intensity={0.4} />
                <Suspense fallback={null}>
                    <Markthal />
                </Suspense>
                <OrbitControls />
            </Canvas>
        </>
    );
}

export default Home;