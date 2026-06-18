import { ComponentConstructor } from "../types/Constructor";

export default class ValidationHelper {

    public static checkPrefab<T extends cc.Component>(
        prefab: cc.Prefab,
        componentType: ComponentConstructor<T>
    ): boolean {
        if (!prefab) {
            cc.error("Prefab is not assigned");
            return false;
        }

        if (!prefab.data.getComponent(componentType as any)) {
            cc.warn(
                `Prefab "${prefab.name}" must contain "${componentType.name}" component`
            );
            return false;
        }

        return true;
    }
}