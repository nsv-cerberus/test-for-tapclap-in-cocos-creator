# Blast

Blast - проект на Cocos Creator с механикой удаления групп одинаковых тайлов.

Игровой цикл: уровень загружает настройки, создаёт матрицу клеток, строит визуальную сетку, заполняет её тайлами из пула, затем обрабатывает клики игрока, уничтожение элементов, падение, спавн новых тайлов и проверку условий завершения игры.

## Основные директории

`assets/scenes/Level.fire`  
Главная сцена уровня. Содержит `Canvas`, игровое поле, UI и `Scene Context Installer`.

`assets/scripts/EventBus.ts`  
Глобальный событийный слой для связи между настройками, gameplay-логикой и UI.

`assets/scripts/base`  
Базовые классы для компонентов, включая editor-only поведение.

`assets/scripts/level/gameplay-field`  
Визуальная часть игрового поля:

- `GameplayField.ts` - контейнер и resize игрового поля.
- `grid/Grid.ts` - создание визуальных клеток по размеру матрицы.
- `grid/GridEditor.ts` - editor-time пересборка сетки.
- `grid/cell/Cell.ts` - клетка поля, хранит текущий элемент и позицию в матрице.
- `grid/cell/elements/Tile.ts` - игровой тайл с типом, спавн-анимацией и destroy-анимацией.

`assets/scripts/level/scene-context-installer`  
Точка сборки уровня:

- `SceneContextInstaller.ts` - регистрирует основные компоненты в `SceneContext` и запускает инициализацию.
- `SceneContext.ts` - простой сервис-локатор для доступа к runtime-компонентам.

`assets/scripts/level/scene-context-installer/level-settings`  
Настройки уровня:

- `LevelSettings.ts` - runtime-хранилище настроек.
- `LevelSettingsEditor.ts` - editor-time настройка значений.
- `level-settings-load-service` - загрузка настроек.
- `level-settings-save-service` - сохранение настроек из редактора.

`assets/scripts/level/scene-context-installer/cells-matrix-controller`  
Основная логика поля и хода:

- `CellsMatrixController.ts` - фасад над матрицей и сервисами.
- `cells-matrix` - логическая матрица клеток.
- `chain-collector-service` - поиск цепочек одинаковых тайлов.
- `elements-destroy-service` - уничтожение элементов и возврат в пул.
- `gravity-service` - падение элементов вниз.
- `spawn-service` - заполнение пустых клеток новыми тайлами.
- `mix-elements-service` - перемешивание элементов.
- `available-moves-service` - проверка доступных ходов.

`assets/scripts/level/scene-context-installer/gameplay-controller`  
Игровое состояние:

- `GameplayController.ts` - состояние игры, старт/финиш хода, победа/поражение.
- `steps-manager` - шаги.
- `scores-manager` - очки.
- `mix-booster-manager` - количество и расход mix-бустеров.

`assets/scripts/level/scene-context-installer/object-pool-manager`  
Пул объектов:

- `ObjectPoolManager.ts` - выдача и возврат объектов.
- `prefabs-store/PrefabsStore.ts` - ссылки на префабы клеток, тайлов и других объектов.

`assets/scripts/level/ui`  
UI уровня:

- `statistics-panel` - отображение шагов и очков.
- `boosters-panel` - кнопка mix-бустера и отображение количества бустеров.

## Пайплайн запуска уровня

1. Загружается сцена `Level.fire`.
2. `SceneContextInstaller` выполняется с высоким приоритетом через `@executionOrder(-1000)`.
3. Installer находит ссылки на `ObjectPoolManager`, `LevelSettings`, `CellsMatrixControllerBase` и `GameplayControllerBase`.
4. Эти зависимости регистрируются в `SceneContext`.
5. `LevelSettings.init()` загружает настройки уровня из JSON.
6. После загрузки настроек отправляется событие `LevelSettingsReady`.
7. `CellsMatrixController` получает событие и создаёт логическую `CellsMatrix`.
8. `Grid` создаёт визуальные `Cell` и регистрирует их в матрице через `setupCellToMatrix`.
9. `GameplayController.init()` создаёт менеджеры шагов, очков и бустеров.
10. Отправляется событие `GameplayEvent.NewGame`.
11. `CellsMatrixController` заполняет пустые клетки тайлами через `SpawnService`.
12. UI получает события обновления и отображает стартовые значения.

## Пайплайн хода игрока

1. Игрок кликает по `Cell`.
2. `Cell` передаёт себя в `CellsMatrixController.cellClick`.
3. `ChainCollectorService` собирает цепочки одинаковых тайлов от выбранной клетки.
4. Если размер цепочки меньше `LevelSettings.minTiles`, ход завершается без изменений.
5. `GameplayController.startMove` списывает шаг и начисляет очки.
6. `ElementsDestroyService` проигрывает destroy-анимации и возвращает уничтоженные элементы в `ObjectPoolManager`.
7. `GravityService` перемещает элементы вниз в освободившиеся клетки.
8. `SpawnService` создаёт новые тайлы в пустых клетках.
9. `AvailableMovesService` проверяет, есть ли доступные ходы.
10. `GameplayController.finishMove` определяет итог состояния: продолжение игры, победа или поражение.

## Пайплайн mix-бустера

1. Игрок нажимает `MixBoosterButton`.
2. UI запрашивает у `GameplayController.useMixBooster()`, можно ли использовать бустер.
3. Если бустер доступен, его количество уменьшается.
4. `MixBoosterButton` вызывает `CellsMatrixController.mix()`.
5. `MixElementsService` перемешивает текущие элементы в матрице.
6. UI получает событие `MixBoostersUpdated` и обновляет счётчик.

## Пул объектов

Проект использует `ObjectPoolManager` для повторного использования объектов.

Основной поток:

1. `Grid` берёт `Cell` из пула при создании сетки.
2. `SpawnService` берёт `Tile` из пула при заполнении пустых клеток.
3. `ElementsDestroyService` возвращает уничтоженные элементы обратно в пул.
4. `Grid.removeExistingCells()` возвращает клетки и вложенные элементы в пул при пересборке поля.

Это снижает количество `instantiate/destroy` во время игры и держит создание объектов в одном месте.

## События

`LevelEvent`:

- `LevelSettingsReady` - настройки уровня загружены.
- `GridInitialized` - событие для старта новой игры после готовности сетки.

`GameplayEvent`:

- `NewGame` - старт новой игры.
- `StepsUpdated` - обновились шаги.
- `ScoresUpdated` - обновились очки.
- `MixBoostersUpdated` - обновилось количество mix-бустеров.
- `Won` - победа.
- `GameOver` - поражение.

## Editor-time логика

`GridEditor` работает только в редакторе и нужен для пересборки визуальной сетки при изменении размера поля.

В PlayMode editor-only компоненты отключаются через `EditorBase`, чтобы редакторская логика не создавала runtime-объекты поверх игровой логики.

Runtime-тайлы должны создаваться только через `SpawnService` и `ObjectPoolManager`.
