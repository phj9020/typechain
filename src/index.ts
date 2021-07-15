class Block {
    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;
    
    constructor(index: number, hash: string, previousHash: string, data: string, timestamp: number) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data =data;
        this.timestamp = timestamp;
    }
}

const genesisBlock: Block = new Block(0,"2021","2020", "first", 42123434);

let blockchain: Block[] = [genesisBlock];

blockchain.push(new Block(0,"2021","2020", "second", 3213213))


console.log(blockchain)