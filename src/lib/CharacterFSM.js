import FiniteStateMachine from './FiniteStateMachine';
import IdleState from './IdleState';
import WalkState from './WalkState';
import RunState from './RunState';
import DanceState from './DanceState';

export default class CharacterFSM extends FiniteStateMachine {
    constructor(proxy) {
        super();
        this._proxy = proxy;
        this._Init();
    }

    _Init() {
        this._AddState('idle', IdleState);
        this._AddState('walk', WalkState);
        this._AddState('run', RunState);
        this._AddState('dance', DanceState);
    }
}
