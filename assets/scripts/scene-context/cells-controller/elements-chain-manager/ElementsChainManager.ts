export default class ChainElementsManager {
    private chainElements: cc.Node[] = [];

    addElement(element: cc.Node): void {
        this.chainElements.push(element);
    }

    removeElement(element: cc.Node): void {
        const index = this.chainElements.indexOf(element);
        if (index !== -1) {
            this.chainElements.splice(index, 1);
        }
    }

    getChainByElement(element: cc.Node): cc.Node[] {
        // Implement the logic to get the chain of elements based on the provided element
        // This is a placeholder implementation and should be replaced with actual logic
        return this.chainElements; // Return the chain elements as a placeholder
    }
}