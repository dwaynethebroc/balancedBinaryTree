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
// function insert(root, value){
//     //base case
//     //if the node doesn't exist, return the new node
//     if(root === null){
//         return new Node(value);
//     }
//     //no duplicate values
//     if(root.data === value){
//         console.log(`Duplicate value exists in tree already. Value of: ${value}`)
//         return root;
//     }
//     //move to left child if value is lower
//     //move to right child if value is higher
//     //if there are no children, base case creates new node to be attached with value
//     if(value < root.data){
//         root.left = insert(root.left, value);
//     } else if(value > root.data){
//         root.right = insert(root.right, value);
//     }

//     return root;
// }

//Console.Log Function
function insert(root, value) {
    console.log(`Inserting value: ${value}`);

    // Base case: if the node doesn't exist, create a new node
    if (root === null) {
        console.log(`Node is null, creating new node with value: ${value}`);
        return new Node(value);
    }

    // If the value already exists in the tree, log and return the existing root
    if (root.data === value) {
        console.log(`Duplicate value detected. Node with value ${value} already exists.`);
        return root;
    }

    // If the value is less than the current node's value, go to the left subtree
    if (value < root.data) {
        console.log(`Value ${value} is less than current node value ${root.data}. Moving to the left subtree.`);
        if (root.left === null) {
            console.log(`Left child of node ${root.data} is null. Inserting here.`);
        }
        root.left = insert(root.left, value);
    }
    // If the value is greater than the current node's value, go to the right subtree
    else if (value > root.data) {
        console.log(`Value ${value} is greater than current node value ${root.data}. Moving to the right subtree.`);
        if (root.right === null) {
            console.log(`Right child of node ${root.data} is null. Inserting here.`);
        }
        root.right = insert(root.right, value);
    }

    // Return the (possibly updated) root node
    console.log(`Returning node with value: ${root.data}`);
    return root;
}




//helper function to locate successor node to replace in delete node function
// function getSucessor(currentNode) {
//     //Traverse one node right to higher value
//     currentNode = currentNode.right;

//     //Then traverse left all the way until there is no children nodes to the left anymore
//     //Replace root node with that value
//     while (currentNode !== null && currentNode.left !== null) {
//         currentNode = currentNode.left;
//     }
    
//     console.log(`GETSUCCESSOR FXN -> NODE TO BE REPLACED: ${currentNode.data}`);
//     return currentNode;
// }

//Console.Log Function
function getSucessor(curr) {
    console.log(`Finding successor for node: ${curr.data}`);
    curr = curr.right;

    while (curr !== null && curr.left !== null) {
        console.log(`Traversing left from node: ${curr.data}`);
        curr = curr.left;
    }

    console.log(`Successor found: ${curr.data}`);
    return curr;
}


//Delete item of specfic value and update binary tree
// function deleteItem(root, value){
//     //base case
//     //if the node doesn't exist, return
//     if(root === null){
//         return root;
//     }

//     //move to left child if value is lower
//     if(root.data > value){
//         root.left = deleteItem(root.left, value);
//     } 
//     //move to right child if value is higher
//     else if(root.data < value){
//         root.right = deleteItem(root.right, value);
//     } 
//     //If root data matches...
//     else {
//         console.log(root);
//         //CASE 1
//         //Only right child
//         if(root.left === null){
//             return root.right;
//         }
//         //Only left child
//         if(root.right === null){
//             return root.left;
//         }

        
//         //When two children nodes are present
//         //get node that node needs to be replaced with
//         let successorNode = getSucessor(root);
//         //Replace that node to root's position
//         root.data = successorNode.data;
//         console.log(`Value found and deleted. Both children nodes`);
//         //Continue on with traversing recursively the BBT
//         if (successorNode.right !== null) {
//             root.right = deleteItem(root.right, successorNode.data);
//         }
//     }
    
//     return root;
// }

//Console.Log Function
function deleteItem(root, value) {
    if (root === null) {
        console.log(`Reached a null node, nothing to delete.`);
        return root;
    }

    console.log(`Visiting node with value: ${root.data}`);

    if (root.data > value) {
        console.log(`Value ${value} is less than ${root.data}, going left.`);
        root.left = deleteItem(root.left, value);
    } else if (root.data < value) {
        console.log(`Value ${value} is greater than ${root.data}, going right.`);
        root.right = deleteItem(root.right, value);
    } else {
        console.log(`Node with value ${value} found.`);

        if (root.left === null) {
            console.log(`Node has no left child, replacing with right subtree.`);
            return root.right;
        }

        if (root.right === null) {
            console.log(`Node has no right child, replacing with left subtree.`);
            return root.left;
        } 
        
        console.log(`Node has two children. Finding in-order successor.`);
        let succ = getSucessor(root);
        console.log(`In-order successor is ${succ.data}`);
        root.data = succ.data;
        root.right = deleteItem(root.right, succ.data);
        
    }

    console.log(`Returning node with value: ${root.data}`);
    return root;
}


//find value at node function
function find(root, value) {
    
    //base case
    //if the node doesn't exist, return the new node
    if(root === null){
        return null;
    }

    //move to left child if value is lower
    //move to right child if value is higher
    //if there are no children, base case creates new node to be attached with value
    if(value < root.data){
        root.left = find(root.left, value);
    } else if(value > root.data){
        root.right = find(root.right, value);
    } else if(value === root.data){
        console.log(`Node found! Value of: ${value}`)
        console.log(root);
        return root;
    } else {
        console.log(`Value not found`);
        return false;
    }
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
console.log(myBinaryTree);
insert(myBinaryTree, 500);
console.log(myBinaryTree);
insert(myBinaryTree, 42);
console.log(myBinaryTree);

prettyPrint(myBinaryTree);
console.log(myBinaryTree);

deleteItem(myBinaryTree, 67);
console.log(myBinaryTree);
deleteItem(myBinaryTree, 3);
console.log(myBinaryTree);
deleteItem(myBinaryTree, 5);
console.log(myBinaryTree);

prettyPrint(myBinaryTree);

console.log(myBinaryTree);
insert(myBinaryTree, 79);
console.log(myBinaryTree);
insert(myBinaryTree, 999);
console.log(myBinaryTree);
insert(myBinaryTree, 2);

prettyPrint(myBinaryTree);

console.log(myBinaryTree);

find(myBinaryTree, 2);
console.log(myBinaryTree);
find(myBinaryTree, 33);
console.log(myBinaryTree);
find(myBinaryTree, 999);