const { ccclass } = cc._decorator;

export type ServiceToken<T> = Function & { prototype: T };

@ccclass
export class ServiceLocator extends cc.Component {
    private static services = new Map<ServiceToken<any>, any>();

    static register<T>(token: ServiceToken<T>, instance: T): void {
        this.services.set(token, instance);
    }

    static get<T>(token: ServiceToken<T>): T {
        const service = this.services.get(token);

        if (!service) {
            throw new Error(`Service not found: ${token.name}`);
        }

        return service as T;
    }

    static clear(): void {
        this.services.clear();
    }
}

/* const {ccclass, property} = cc._decorator;

export type Constructor<T> = new (...args: any[]) => T;

@ccclass
export class ServiceLocator extends cc.Component {
    private static services = new Map<Function, any>();

    static register<T>(type: Constructor<T>, instance: T): void {
        this.services.set(type, instance);
    }

    static get<T>(type: Constructor<T>): T {
        const service = this.services.get(type);

        if (!service) {
            throw new Error(`Service not found: ${type.name}`);
        }

        return service as T;
    }
} */