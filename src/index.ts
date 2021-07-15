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
        this.data =data;
        this.timestamp = timestamp;
    }

    static calculateHash(index:number, previousHash:string, timestamp:number, data:string) : string {
        return CryptoJs.SHA256(index + previousHash + timestamp + data).toString();
    }
}

// create Block instance 
const genesisBlock: Block = new Block(0,"2021","2020", "first", 42123434);

// make it array 
let blockchain: Block[] = [genesisBlock];

// fb : get array of blockchain
const getBlockchain = () : Block[] => {
    return blockchain;
};

// fn : get last index of blockchain array
const getLastestBlock = () : Block => blockchain[blockchain.length - 1];

// fn : get current timestamp
const getNewTimeStamp = () : number => Math.round(new Date().getTime() / 1000);
