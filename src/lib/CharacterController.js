import * as THREE from 'three';
import { FBXLoader } from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';

import BasicCharacterControllerProxy from './CharacterControllerProxy';
import BasicCharacterControllerInput from './CharacterControllerInput';
import CharacterFSM from './CharacterFSM';

export default class CharacterController {
    constructor(params) {
        this._Init(params);
    }

    _Init(params) {
        this._params = params;
        this._decceleration = new THREE.Vector3(-0.0005, -0.0001, -5.0);
        this._acceleration = new THREE.Vector3(1, 0.25, 250.0);
        this._velocity = new THREE.Vector3(0, 0, 0);
        this._position = new THREE.Vector3();

        this._animations = {};
        this._input = new BasicCharacterControllerInput();
        this._stateMachine = new CharacterFSM(
            new BasicCharacterControllerProxy(this._animations));

        this._LoadModels();
    }

    _LoadModels() {
        const loader = new FBXLoader();
        loader.setPath('../assets/character/');
        loader.load('Remy.fbx', (fbx) => {
            fbx.scale.setScalar(0.1);
            fbx.traverse(c => {
                c.castShadow = true;
            });

            this._target = fbx;
            this._params.scene.add(this._target);

            this._mixer = new THREE.AnimationMixer(this._target);

            this._manager = new THREE.LoadingManager();
            this._manager.onLoad = () => {
                this._stateMachine.SetState('idle');
            };

            const _OnLoad = (animName, anim) => {
                const clip = anim.animations[0];
                const action = this._mixer.clipAction(clip);

                this._animations[animName] = {
                    clip: clip,
                    action: action,
                };
            };

            // const loader = new FBXLoader(this._manager);
            // loader.setPath('../assets/character/');
            // loader.load('walkIP.fbx', (a) => { _OnLoad('walk', a); });
            // loader.load('run.fbx', (a) => { _OnLoad('run', a); });
            // loader.load('idle.fbx', (a) => { _OnLoad('idle', a); });
            // loader.load('dance.fbx', (a) => { _OnLoad('dance', a); });
            // loader.load('greeting.fbx', (a) => { _OnLoad('greet', a); });
        });
    }

    get Position() {
        // First npc interaction
        if (this._position.x > 130 && this._position.x < 170 && this._position.z > 80 && this._position.z < 120) {
            document.getElementById("sectionChange").style.visibility = "visible"
        }
        if (this._position.x < 130) {
            document.getElementById("sectionChange").style.visibility = "hidden";
            document.getElementById("sectionChange2").style.visibility = "hidden";
            document.getElementById("sectionChange3").style.visibility = "hidden";
            document.getElementById("sectionChangeReaction").style.visibility = "hidden";
            document.getElementById("sectionChangeReaction2").style.visibility = "hidden";
            document.getElementById("sectionChangeReaction3").style.visibility = "hidden";
        }
        if (this._position.x > 170) {
            document.getElementById("sectionChange").style.visibility = "hidden";
            document.getElementById("sectionChange2").style.visibility = "hidden";
            document.getElementById("sectionChange3").style.visibility = "hidden";
            document.getElementById("sectionChangeReaction").style.visibility = "hidden";
            document.getElementById("sectionChangeReaction2").style.visibility = "hidden";
            document.getElementById("sectionChangeReaction3").style.visibility = "hidden";
        }

        document.getElementById("answer1").onclick = function () {
            document.getElementById("sectionChange").style.display = "none";
            document.getElementById("sectionChange2").style.visibility = "visible";
        };

        document.getElementById("answer2").onclick = function () {
            document.getElementById("sectionChange2").style.display = "none";
            document.getElementById("sectionChange3").style.visibility = "visible";
        };

        document.getElementById("20").onclick = function () {
            document.getElementById("sectionChange3").style.display = "none";
            document.getElementById("sectionChangeReaction").style.visibility = "visible";
        };

        document.getElementById("60").onclick = function () {
            document.getElementById("sectionChange3").style.display = "none";
            document.getElementById("sectionChangeReaction2").style.visibility = "visible";
        };

        document.getElementById("90").onclick = function () {
            document.getElementById("sectionChange3").style.display = "none";
            document.getElementById("sectionChangeReaction3").style.visibility = "visible";
            this.UpdateState();
        };

        // NPC 2 interaction
        if (this._position.x > 280 && this._position.x < 320 && this._position.z > 80 && this._position.z < 120) {
            document.getElementById("sectionChangeNPC2").style.visibility = "visible"
        }
        if (this._position.x < 280) {
            document.getElementById("sectionChangeNPC2").style.visibility = "hidden";
            document.getElementById("sectionChange2NPC2").style.visibility = "hidden";
            document.getElementById("sectionChange3NPC2").style.visibility = "hidden";
            document.getElementById("sectionChangeReactionNPC2").style.visibility = "hidden";
            document.getElementById("sectionChangeReaction2NPC2").style.visibility = "hidden";
            document.getElementById("sectionChangeReaction3NPC2").style.visibility = "hidden";
        }
        if (this._position.x > 320) {
            document.getElementById("sectionChangeNPC2").style.visibility = "hidden";
            document.getElementById("sectionChange2NPC2").style.visibility = "hidden";
            document.getElementById("sectionChange3NPC2").style.visibility = "hidden";
            document.getElementById("sectionChangeReactionNPC2").style.visibility = "hidden";
            document.getElementById("sectionChangeReaction2NPC2").style.visibility = "hidden";
            document.getElementById("sectionChangeReaction3NPC2").style.visibility = "hidden";
        }

        document.getElementById("answer1NPC2").onclick = function () {
            document.getElementById("sectionChangeNPC2").style.display = "none";
            document.getElementById("sectionChange2NPC2").style.visibility = "visible";
        };

        document.getElementById("answer2NPC2").onclick = function () {
            document.getElementById("sectionChange2NPC2").style.display = "none";
            document.getElementById("sectionChange3NPC2").style.visibility = "visible";
        };

        document.getElementById("20NPC2").onclick = function () {
            document.getElementById("sectionChange3NPC2").style.display = "none";
            document.getElementById("sectionChangeReactionNPC2").style.visibility = "visible";
        };

        document.getElementById("60NPC2").onclick = function () {
            document.getElementById("sectionChange3NPC2").style.display = "none";
            document.getElementById("sectionChangeReaction2NPC2").style.visibility = "visible";
        };

        document.getElementById("90NPC2").onclick = function () {
            document.getElementById("sectionChange3NPC2").style.display = "none";
            document.getElementById("sectionChangeReaction3NPC2").style.visibility = "visible";
            this.UpdateState();
        };

        // NPC 3 interaction
        if (this._position.x > -20 && this._position.x < 20 && this._position.z > 80 && this._position.z < 120) {
            document.getElementById("sectionChangeNPC3").style.visibility = "visible"
        }
        if (this._position.x < -20) {
            document.getElementById("sectionChangeNPC3").style.visibility = "hidden";
            document.getElementById("sectionChange2NPC3").style.visibility = "hidden";
            document.getElementById("sectionChange3NPC3").style.visibility = "hidden";
            document.getElementById("sectionChangeReactionNPC3").style.visibility = "hidden";
            document.getElementById("sectionChangeReaction2NPC3").style.visibility = "hidden";
            document.getElementById("sectionChangeReaction3NPC3").style.visibility = "hidden";
        }
        if (this._position.x > 20) {
            document.getElementById("sectionChangeNPC3").style.visibility = "hidden";
            document.getElementById("sectionChange2NPC3").style.visibility = "hidden";
            document.getElementById("sectionChange3NPC3").style.visibility = "hidden";
            document.getElementById("sectionChangeReactionNPC3").style.visibility = "hidden";
            document.getElementById("sectionChangeReaction2NPC3").style.visibility = "hidden";
            document.getElementById("sectionChangeReaction3NPC3").style.visibility = "hidden";
        }

        document.getElementById("answer1NPC3").onclick = function () {
            document.getElementById("sectionChangeNPC3").style.display = "none";
            document.getElementById("sectionChange2NPC3").style.visibility = "visible";
        };

        document.getElementById("answer2NPC3").onclick = function () {
            document.getElementById("sectionChange2NPC3").style.display = "none";
            document.getElementById("sectionChange3NPC3").style.visibility = "visible";
        };

        document.getElementById("20NPC3").onclick = function () {
            document.getElementById("sectionChange3NPC3").style.display = "none";
            document.getElementById("sectionChangeReactionNPC3").style.visibility = "visible";
        };

        document.getElementById("60NPC3").onclick = function () {
            document.getElementById("sectionChange3NPC3").style.display = "none";
            document.getElementById("sectionChangeReaction2NPC3").style.visibility = "visible";
        };

        document.getElementById("90NPC3").onclick = function () {
            document.getElementById("sectionChange3NPC3").style.display = "none";
            document.getElementById("sectionChangeReaction3NPC3").style.visibility = "visible";
            this.UpdateState();
        };

        // NPC 4 interaction
        if (this._position.x > 130 && this._position.x < 170 && this._position.z > -20 && this._position.z < 20) {
            document.getElementById("sectionChangeNPC4").style.visibility = "visible"
        }
        if (this._position.x < 130) {
            document.getElementById("sectionChangeNPC4").style.visibility = "hidden";
            document.getElementById("sectionChange2NPC4").style.visibility = "hidden";
            document.getElementById("sectionChange3NPC4").style.visibility = "hidden";
            document.getElementById("sectionChangeReactionNPC4").style.visibility = "hidden";
            document.getElementById("sectionChangeReaction2NPC4").style.visibility = "hidden";
            document.getElementById("sectionChangeReaction3NPC4").style.visibility = "hidden";
        }
        if (this._position.x > 170) {
            document.getElementById("sectionChangeNPC4").style.visibility = "hidden";
            document.getElementById("sectionChange2NPC4").style.visibility = "hidden";
            document.getElementById("sectionChange3NPC4").style.visibility = "hidden";
            document.getElementById("sectionChangeReactionNPC4").style.visibility = "hidden";
            document.getElementById("sectionChangeReaction2NPC4").style.visibility = "hidden";
            document.getElementById("sectionChangeReaction3NPC4").style.visibility = "hidden";
        }

        document.getElementById("answer1NPC4").onclick = function () {
            document.getElementById("sectionChangeNPC4").style.display = "none";
            document.getElementById("sectionChange2NPC4").style.visibility = "visible";
        };

        document.getElementById("answer2NPC4").onclick = function () {
            document.getElementById("sectionChange2NPC4").style.display = "none";
            document.getElementById("sectionChange3NPC4").style.visibility = "visible";
        };

        document.getElementById("20NPC4").onclick = function () {
            document.getElementById("sectionChange3NPC4").style.display = "none";
            document.getElementById("sectionChangeReactionNPC4").style.visibility = "visible";
        };

        document.getElementById("60NPC4").onclick = function () {
            document.getElementById("sectionChange3NPC4").style.display = "none";
            document.getElementById("sectionChangeReaction2NPC4").style.visibility = "visible";
        };

        document.getElementById("90NPC4").onclick = function () {
            document.getElementById("sectionChange3NPC4").style.display = "none";
            document.getElementById("sectionChangeReaction3NPC4").style.visibility = "visible";
        };
        return this._position;
    }

    get Rotation() {
        if (!this._target) {
            return new THREE.Quaternion();
        }
        return this._target.quaternion;
    }

    Update(timeInSeconds) {
        if (!this._stateMachine._currentState) {
            return;
        }

        this._stateMachine.Update(timeInSeconds, this._input);

        const velocity = this._velocity;
        const frameDecceleration = new THREE.Vector3(
            velocity.x * this._decceleration.x,
            velocity.y * this._decceleration.y,
            velocity.z * this._decceleration.z
        );
        frameDecceleration.multiplyScalar(timeInSeconds);
        frameDecceleration.z = Math.sign(frameDecceleration.z) * Math.min(
            Math.abs(frameDecceleration.z), Math.abs(velocity.z));

        velocity.add(frameDecceleration);

        const controlObject = this._target;
        const _Q = new THREE.Quaternion();
        const _A = new THREE.Vector3();
        const _R = controlObject.quaternion.clone();

        const acc = this._acceleration.clone();
        if (this._input._keys.shift) {
            acc.multiplyScalar(2.0);
        }

        if (this._stateMachine._currentState.Name === 'dance') {
            acc.multiplyScalar(0.0);
        }

        if (this._input._keys.forward) {
            velocity.z += acc.z * timeInSeconds;
        }
        if (this._input._keys.backward) {
            velocity.z -= acc.z * timeInSeconds;
        }
        if (this._input._keys.left) {
            _A.set(0, 1, 0);
            _Q.setFromAxisAngle(_A, 4.0 * Math.PI * timeInSeconds * this._acceleration.y);
            _R.multiply(_Q);
        }
        if (this._input._keys.right) {
            _A.set(0, 1, 0);
            _Q.setFromAxisAngle(_A, 4.0 * -Math.PI * timeInSeconds * this._acceleration.y);
            _R.multiply(_Q);
        }
        if (this._stateMachine._currentState.Name === 'greet') {
            // Canvas._LoadAnimatedModelAndPlay('./resources/npc/', 'npc_body.fbx', 'greeting.fbx', new THREE.Vector3(150, 0, 100));
            // this._LoadAnimatedModelAndPlay('./resources/npc/', 'npc_body.fbx', 'greeting.fbx', new THREE.Vector3(150, 0, 100));
            // console.log(Canvas(_LoadAnimatedModelAndPlay('./resources/npc/', 'npc_body.fbx', 'greeting.fbx', new THREE.Vector3(150, 0, 100))));
        }

        controlObject.quaternion.copy(_R);

        const oldPosition = new THREE.Vector3();
        oldPosition.copy(controlObject.position);

        const forward = new THREE.Vector3(0, 0, 1);
        forward.applyQuaternion(controlObject.quaternion);
        forward.normalize();

        const sideways = new THREE.Vector3(1, 0, 0);
        sideways.applyQuaternion(controlObject.quaternion);
        sideways.normalize();

        sideways.multiplyScalar(velocity.x * timeInSeconds);
        forward.multiplyScalar(velocity.z * timeInSeconds);

        controlObject.position.add(forward);
        controlObject.position.add(sideways);

        this._position.copy(controlObject.position);

        if (this._mixer) {
            this._mixer.update(timeInSeconds);
        }
    }
}
