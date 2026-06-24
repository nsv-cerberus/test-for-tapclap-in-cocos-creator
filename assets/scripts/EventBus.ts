export enum GameplayEvent {
    InitGrid = "InitGrid",
    StartGame = "StartGame",
}

export default class EventBus {
    private static readonly _target = new cc.EventTarget();

    public static on(
        event: GameplayEvent,
        callback: Function,
        target?: any
    ): void {
        this._target.on(event, callback, target);
    }

    public static off(
        event: GameplayEvent,
        callback: Function,
        target?: any
    ): void {
        this._target.off(event, callback, target);
    }

    public static emit(
        event: GameplayEvent,
        ...args: any[]
    ): void {
        this._target.emit(event, ...args);
    }

    public static targetOff(
        target: any
    ): void {
        this._target.targetOff(target);
    }
}