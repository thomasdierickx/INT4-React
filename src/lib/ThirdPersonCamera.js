import * as THREE from 'three';

export default class ThirdPersonCamera {
    constructor(params) {
        this._params = params;
        this._camera = params.camera;

        this._currentPosition = new THREE.Vector3();
        this._currentLookat = new THREE.Vector3();
    }

    _CalculateIdealOffset() {
        const idealOffset = new THREE.Vector3(-100, 100, -90);
        idealOffset.add(this._params.target.Position);
        return idealOffset;
    }

    _CalculateIdealLookat() {
        const idealLookat = new THREE.Vector3(0, 5, 0);
        idealLookat.add(this._params.target.Position);
        return idealLookat;
    }

    Update(timeElapsed) {
        const idealOffset = this._CalculateIdealOffset();
        const idealLookat = this._CalculateIdealLookat();

        const t = 1.0 - Math.pow(0.001, timeElapsed);

        this._currentPosition.lerp(idealOffset, t);
        this._currentLookat.lerp(idealLookat, t);

        this._camera.position.copy(this._currentPosition);
        this._camera.lookAt(this._currentLookat);
    }
}
