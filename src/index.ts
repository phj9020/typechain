import * as CryptoJs from 'crypto-js';


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
        this.data = data;
        this.timestamp = timestamp;
    }

    static calculateHash(index: number, previousHash: string, timestamp: number, data: string): string {
        return CryptoJs.SHA256(index + previousHash + timestamp + data).toString();
    }
    static validateStructure(aBlock: Block,): boolean {
        return typeof aBlock.index === "number" && 
        typeof aBlock.hash === "string" && 
        typeof aBlock.previousHash === "string" && 
        typeof aBlock.data === "string" && 
        typeof aBlock.timestamp === "number";
    }
}

// create Block instance 
const getCurrentHash = Block.calculateHash(0, "", 42123434, "first")
const genesisBlock: Block = new Block(0, getCurrentHash, "", "first", 42123434);

// make it array 
let blockchain: Block[] = [genesisBlock];

// fb : get array of blockchain
const getBlockchain = (): Block[] => {
    return blockchain;
};

// fn : get last index of blockchain array
const getLastestBlock = (): Block => blockchain[blockchain.length - 1];

// fn : get current timestamp
const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

// fn : creates new Block
const createNewBlock = (data: string): Block => {
    // createa new block arguments
    const previousBlock: Block = getLastestBlock();
    const newIndex: number = previousBlock.index + 1;
    const newTimeStamp: number = getNewTimeStamp();
    const newHash: string = Block.calculateHash(newIndex, previousBlock.hash, newTimeStamp, data);

    const newBlock: Block = new Block(newIndex, newHash, previousBlock.hash, data, newTimeStamp);

    addBlock(newBlock);
    return newBlock;
};


const getHashForBlock = (aBlock :Block) : string => Block.calculateHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);


// 블록들이 자신의 전 블록에 링크가 있다 
const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
    // validate structure 
    if(!Block.validateStructure(candidateBlock)) {
        return false;
    } else if(previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    } else if(previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    } else if(getHashForBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    } else {
        return true;
    }
};

const addBlock = (candidateBlock: Block) : void => {
    if(isBlockValid(candidateBlock, getLastestBlock())) {
        blockchain.push(candidateBlock);
    }
};

createNewBlock("Second");
createNewBlock("Third");
createNewBlock("Fourth");

console.log(getBlockchain());