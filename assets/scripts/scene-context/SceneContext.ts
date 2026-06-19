import IService from "./IService";

export type ServiceToken<T> = { new(...args: any[]): T };

export default class SceneContext {

    private static services = new Map<ServiceToken<any>, any>();

    public static register<T extends IService>(instance: T): void {
        const token = instance.constructor as ServiceToken<T>;
        this.services.set(token, instance);
    }

    public static get<T>(token: ServiceToken<T>): T {
        const service = this.services.get(token);

        if (!service) {
            throw new Error(`Service not found: ${token.name}`);
        }

        return service as T;
    }

    public static clear(): void {
        this.services.clear();
    }

}