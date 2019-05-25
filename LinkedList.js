// const CircularJSON = require('circular-json');

class Node {
    constructor(item, prevNode, nextNode, index) {
        this.index = index;
        this.item = item;
        this.prevNode = prevNode;
        this.nextNode = nextNode;
    }
    showItem() {
        return this.item;
    }
    getPrevNode() {
        return this.prevNode;
    }
    getNextNode() {
        return this.nextNode;
    }
    getIndex() {
        return this.index;
    }
    setPrevNode(prev) {
        this.prevNode = prev;
    }
    setNextNode(node) {
        this.nextNode = node;
    }
    setIndex(i) {
        this.index = i;
    }

}

 class LinkedList {
    constructor() {

        this.firstNodeCreated = null;
        this.lastNodeCreated = null;
    }

    add(item) {
        let node;
        // let node =  (this.lastNodeCreated)? new Node(item,this.lastNodeCreated,null): new Node(item,null,null) ;
        if (this.lastNodeCreated) {
            node = new Node(item, this.lastNodeCreated, null, (this.lastNodeCreated.index + 1));
            // console.log("created and added this node "+ CircularJSON.stringify(node,null,4));

            this.lastNodeCreated.setNextNode(node);
        } else {
            node = new Node(item, null, null, 0);
            // console.log("created and added this node "+ CircularJSON.stringify(node,null,4));

        }
        // const node = new Node(item,null,null);
        (!this.lastNodeCreated) ? this.firstNodeCreated = node : null;
        this.lastNodeCreated = node;
    }
    get(index) {
        if (this.lastNodeCreated.index < index) {
            return "sorry your index is to big for your list";
        }
        else {
            let list = this.firstNodeCreated;
            for (let i = 0; i <= this.lastNodeCreated.index; i++) {
                // console.log(list.getIndex());
                if (list.getIndex() === index) {
                    // console.log("found it");
                    return list.item;
                }
                else {
                    // console.log(list.getNextNode());
                    list = list.getNextNode();
                    // console.log(list);

                }
            }
        }
    }
    find(item) {
        let list = this.firstNodeCreated;

        for (let index = 0; index < this.lastNodeCreated.getIndex(); index++) {
            if (item === list.showItem()) {
                return list.getIndex();
            } else {
                list = list.getNextNode();
            }

        }
        return "couldnt find it";

    }
    print() {
        let string = "";
        let list = this.firstNodeCreated;

        for (let index = 0; index <= this.lastNodeCreated.getIndex(); index++) {
          //console.log(list);
            
            string += (list.getIndex() !== this.lastNodeCreated.getIndex()) ? list.showItem() + ", " : list.showItem();
            list = list.getNextNode();
        }
        return string;
    }
    insert(item, index) {
        /**
         * first step create new null node 
         * find location repalce with new node
         * and shift the rest down
         */
        if (index <= this.lastNodeCreated.getIndex()) {
            let node = new Node(item, null, null, index);
            let list = this.firstNodeCreated;
            let last= this.firstNodeCreated;
            for (let i = 0; i <= this.lastNodeCreated.getIndex(); i++) {
                // console.log(list.showItem());
                if (list.getIndex() === index) {
                

                    node.setNextNode(list);
                    node.setPrevNode(last);
                    last.setNextNode(node);
                    list.setPrevNode(node);
                    // console.log(node.getNextNode());
                    // console.log(this.lastNodeCreated.showItem());
                    break;
                } 
                    last = list;
                    list = list.getNextNode();
            }

            list=this.firstNodeCreated;
            let bounds=this.lastNodeCreated.getIndex()+1;
            for (let i = 0; i <= bounds; i++) {
              //console.log(list.showItem()+" "+list.getIndex());
                
                list.setIndex(i);
                list=list.getNextNode();
            
            }


        } else if (index > this.lastNodeCreated.getIndex()) {
          console.log("sorry out of bounds of list");
        }

    }
    

}

module.exports= LinkedList;




