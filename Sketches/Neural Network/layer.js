class Layer {
    
    constructor(index, numOfNodes) {
        this.index = index;
        this.numOfNodes = numOfNodes;
        this.nodes = new Array(this.numOfNodes);
        for(let i = 0; i < this.numOfNodes; ++i)
            this.nodes[i] = new MyNode(this.index, i);
    }

    show()
    {
        for(let node of this.nodes)
            node.connectAndShow();
    }
}