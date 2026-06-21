const { ccclass, property, executionOrder } = cc._decorator;

import SceneContext from "./SceneContext";

/* ELEMENTS STORE */
import ElementsStore from "./elements-store/ElementsStore";

/* GAMEPLAY CONTROLLER */
import LevelSettings from "./level-settings/LevelSettings";
import CellsMatrix from "./gameplay-controller/cells-matrix/CellsMatrix";

import GameplayController from "./gameplay-controller/GameplayController";

@ccclass
@executionOrder(-1000)
export class SceneContextInstaller extends cc.Component {
    @property(ElementsStore)
    elementsStore: ElementsStore = null;
    
    @property(LevelSettings)
    levelSettings: LevelSettings = null;

    @property(GameplayController)
    gameplayController: GameplayController = null;
    
    onLoad() {
        
        SceneContext.register(this.elementsStore);
        SceneContext.register(this.levelSettings);
        SceneContext.register(this.gameplayController);
        
        this.gameplayController.init(
            new CellsMatrix(
                SceneContext.get(LevelSettings).getRowsValue(), 
                SceneContext.get(LevelSettings).getColsValue()
            )
        );
    }

    onDestroy() {
        SceneContext.clear();
    }
}