export type ServiceToken<T> = Function & {
    prototype: T;
};

export default class SceneContext {

    private static services = new Map<any, any>();

    public static register<T>(token: ServiceToken<T>, instance: T): void {
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