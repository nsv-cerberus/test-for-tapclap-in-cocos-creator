const { ccclass, property, executionOrder } = cc._decorator;

import SceneContext from "./SceneContext";

/* ELEMENTS STORE */
import ElementsStore from "./elements-store/ElementsStore";

/* GRID CONTROLLER */
import LevelSettings from "./level-settings/LevelSettings";
import GridController from "./grid-controller/GridController";
import CellsMatrix from "./grid-controller/cells-matrix/CellsMatrix";

@ccclass
@executionOrder(-1000)
export class SceneContextInstaller extends cc.Component {
    @property(LevelSettings)
    levelSettings: LevelSettings = null;

    @property(ElementsStore)
    elementsStore: ElementsStore = null;

    @property(GridController)
    gridController: GridController = null;
    
    onLoad() {
        this.gridController.init(new CellsMatrix());

        SceneContext.register(this.levelSettings);
        SceneContext.register(this.elementsStore);
        SceneContext.register(this.gridController);
    }

    onDestroy() {
        SceneContext.clear();
    }
}