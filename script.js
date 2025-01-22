class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(numberArray, root){
        this.numberArray = numberArray;
        this.root = root;
    }
}

//Meta function to call all related functions in order to not mess up recursion in sort and binary tree functions
function masterFunction(array){
    console.log(`Original array: ${array}`);
    console.log(`Merge sort started`);
    const sortedArray = mergeSort(array); //sorts array with mergeSort only once, instead of including in recursive function
    console.log(`Merge sort finished: ${sortedArray}`);
    console.log(`Duplicate Removal function`);
    const duplicatesremovedArray = [ ...new Set(sortedArray) ]; //ES6 removes array
    console.log(`Duplicates removed: ${duplicatesremovedArray}`);
    console.log('buildTree function starting');
    const myTree = buildTree(duplicatesremovedArray, 0, duplicatesremovedArray.length - 1); //build tree function
    console.log('buildTree function finished')
    prettyPrint(myTree); //print Binary tree
    console.log(`Return value of buildTree function: ${myTree.data}`);
    return myTree;
}

//Make the binary tree function
function buildTree(array, start, end) {
    //base case: if there is only one element, make it a node and have no children
    if (start > end) return null;

    //exact half of the array position
    const mid = start + Math.floor((end - start) / 2);
    //root node
    const root = new Node(array[mid]);
    
    //left subtree
    root.left = buildTree(array, start, mid - 1);
    //right subtree
    root.right = buildTree(array, mid + 1, end);

    return root;
}

//Insert value into tree function
//Traverse tree to correct place
//Insert value into tree and move over following values
//when node has children or not
function insert(root, value){
    //base case
    //if the node doesn't exist, return the new node
    if(root === null){
        return new Node(value);
    }
    //no duplicate values
    if(root.data === value){
        console.log(`Duplicate value exists in tree already. Value of: ${value}`)
        return root;
    }
    //move to left child if value is lower
    //move to right child if value is higher
    //if there are no children, base case creates new node to be attached with value
    if(value < root.data){
        root.left = insert(root.left, value);
    } else if(value > root.data){
        root.right = insert(root.right, value);
    }

    return root;
}

function deleteItem(root, value){
    //base case
    //if the node doesn't exist, return
    if(root === null){
        return root;
    }
    //no duplicate values
    if(root.data === value){
        console.log(`Value found and deleted`);
        return root;
    }
    //move to left child if value is lower
    //move to right child if value is higher
    //if there are no children, base case creates new node to be attached with value
    if(value < root.data){
        deleteItem(root.left, value);
    } else if(value > root.data){
        deleteItem(root.right, value);
    }

    return root;
}

//Sort functions
function mergeSort(arr){
    const mid = Math.floor(arr.length / 2);
    const leftList = arr.slice(0, mid);
    const rightList = arr.slice(mid);

    if (arr.length === 1){
        return arr;
    } else {
        const result = merge(mergeSort(leftList), (mergeSort(rightList)));
        return result;
    }
}

function merge(leftList, rightList){
    const sortedArray = [];
    let i = 0;
    let j = 0;

    while (i < leftList.length && j < rightList.length) {
        if (leftList[i] < rightList[j]) {
            sortedArray.push(leftList[i]);
            i++;
        } else {
            sortedArray.push(rightList[j]);
            j++;
        }
    }

    const leftUnfinished = leftList.slice(i);
    const rightUnfinished = rightList.slice(j);

    return sortedArray.concat(leftUnfinished).concat(rightUnfinished);
}

//Print out tree function
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

//Example function 
const myArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const myBinaryTree = masterFunction(myArray);
insert(myBinaryTree, 20);
insert(myBinaryTree, 500);
insert(myBinaryTree, 42);

