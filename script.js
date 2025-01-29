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

// Meta function to call all related functions in order to not mess up recursion in sort and binary tree functions
function masterFunction(array){
    console.log(`Original array: ${array}`);
    console.log(`Merge sort started`);
    const sortedArray = mergeSort(array); // sorts array with mergeSort only once, instead of including in recursive function
    console.log(`Merge sort finished: ${sortedArray}`);
    console.log(`Duplicate Removal function`);
    const duplicatesremovedArray = [ ...new Set(sortedArray) ]; // ES6 removes array
    console.log(`Duplicates removed: ${duplicatesremovedArray}`);
    console.log('buildTree function starting');
    const myTree = buildTree(duplicatesremovedArray, 0, duplicatesremovedArray.length - 1); // build tree function
    console.log('buildTree function finished')
    prettyPrint(myTree); // print Binary tree
    console.log(`Return value of buildTree function: ${myTree.data}`);
    return myTree;
}

// Sort functions
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

// Print out tree function
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

// Make the binary tree function
function buildTree(array, start, end) {
    // base case: if there is only one element, make it a node and have no children
    if (start > end) return null;

    // exact half of the array position
    const mid = start + Math.floor((end - start) / 2);
    // root node
    const root = new Node(array[mid]);
    
    // left subtree
    root.left = buildTree(array, start, mid - 1);
    // right subtree
    root.right = buildTree(array, mid + 1, end);

    return root;
}

// Insert value into tree function
// Traverse tree to correct place
// Insert value into tree and move over following values
// when node has children or not
function insert(root, value){
    // base case
    // if the node doesn't exist, return the new node
    if(root === null){
        return new Node(value);
    }
    // no duplicate values
    if(root.data === value){
        console.log(`Duplicate value exists in tree already. Value of: ${value}`)
        return root;
    }
    // move to left child if value is lower
    // move to right child if value is higher
    // if there are no children, base case creates new node to be attached with value
    if(value < root.data){
        root.left = insert(root.left, value);
    } else if(value > root.data){
        root.right = insert(root.right, value);
    }

    return root;
}

// helper function to locate successor node to replace in delete node function
function getSucessor(currentNode) {
    // Traverse one node right to higher value
    currentNode = currentNode.right;

    // Then traverse left all the way until there is no children nodes to the left anymore
    // Replace root node with that value
    while (currentNode !== null && currentNode.left !== null) {
        currentNode = currentNode.left;
    }
    
    console.log(`GETSUCCESSOR FXN -> NODE TO BE REPLACED: ${currentNode.data}`);
    return currentNode;
}

// Delete item of specfic value and update binary tree
function deleteItem(root, value){
    // base case
    // if the node doesn't exist, return
    if(root === null){
        return root;
    }

    // move to left child if value is lower
    if(root.data > value){
        root.left = deleteItem(root.left, value);
    } 
    // move to right child if value is higher
    else if(root.data < value){
        root.right = deleteItem(root.right, value);
    } 
    // If root data matches...
    else {
        console.log(root);
        // CASE 1
        // Only right child
        if(root.left === null){
            return root.right;
        }
        // Only left child
        if(root.right === null){
            return root.left;
        }

        
        // When two children nodes are present
        // get node that node needs to be replaced with
        let successorNode = getSucessor(root);
        // Replace that node to root's position
        root.data = successorNode.data;
        console.log(`Value found and deleted. Both children nodes`);
        // Continue on with traversing recursively the BBT
        if (successorNode.right !== null) {
            root.right = deleteItem(root.right, successorNode.data);
        }
    }
    
    return root;
}

// find value at node function
function find(root, value) {
    //  Base case: if the node doesn't exist
    if (root === null) {
        console.log(`Value not found: ${value}`);
        return null; //  Standardize return value for not found
    }

    //  Move to left child if value is lower
    if (value < root.data) {
        return find(root.left, value);
    } 
    //  Move to right child if value is higher
    else if (value > root.data) {
        return find(root.right, value);
    } 
    //  Node found
    else if (value === root.data) {
        console.log(`Node found! Value of: ${value}`);
        console.log(root);
        return root;
    }
}

// Level Order callbackfunction
// Traverse the tree and call the callback on each node as it traverses passing the whole node as an argument
// breadth-first level order
function levelOrder(root, callbackFunction){
    if (typeof(callbackFunction) !== 'function') {
        throw new Error('supply a callback function!!!');
    }

    // iterative method
    //   FIFO array 
    //  const FIFOArray = [];
    //  let i = 0;

    // base case to exit out of recurison, return the root
    //  if (root === null) {
    //      console.log(`End traverse with value of: ${root.data}`);
    //      return root; 
    //  }
    //   If left child, add to array
    //  if(root.left !== null){
    //      FIFOArray.push(root.left);
    //  }

    //   If right child, add to array
    //  if(root.right !== null){
    //      FIFOArray.push(root.right) 
    //  }

    

    //  while(i < FIFOArray.length){
    //      logTheNodes(FIFOArray[i]);

    //      if(FIFOArray[i].left !== null){
    //          FIFOArray.push(FIFOArray[i].left)
    //      }
        
    //      if(FIFOArray[i].right !== null){
    //          FIFOArray.push(FIFOArray[i].right)
    //      }
    //      i++;
    //  }

    // recursive method
    // array to store levels and values
    const output = [];
    let i = 0;

    // helper function to recursively add nodes to list
    function getOutput(node, level){
        // base case - if node doesn't exist, return
        if(!node) return;

        // if array of this level exists, push data to it
        if(output[level]){
            output[level].push(node.data);
        } else {
            // if this is the first node of a new depth level, create the level and level[0] equals this node
            output[level] = [node.data];
        }
        // go to next level down of child, and add a level by making a new array index
        getOutput(node.left, level + 1);
        getOutput(node.right, level + 1);
    }

    // call the root node
    getOutput(root, 0);
    // show the array of arrays
    console.log(output);

    // print out each of the nodes in the multi-dimensional array
    output.forEach((array) => 
        array.forEach((node) => logTheNodes(node))
    );

    return output;
}
// helper function to test orderLevel
function logTheNodes(node) {
    console.log(node);
}

// Left -> Root -> Right
function inOrder(node, callbackFunction) {
    if (typeof(callbackFunction) !== 'function') {
        throw new Error('supply a callback function!!!');
    }

    if (node === null) {
        return;
    }

    inOrder(node.left, callbackFunction);
    callbackFunction(node)
    inOrder(node.right, callbackFunction);
}

// Root -> Left -> Right
function preOrder(node, callbackFunction){
    if (typeof(callbackFunction) !== 'function') {
        throw new Error('supply a callback function!!!');
    }

    if (node === null) {
        return;
    }
    callbackFunction(node);
    preOrder(node.left, callbackFunction);
    preOrder(node.right, callbackFunction);
}

// Left -> Right -> Root
function postOrder(node, callbackFunction){
    if (typeof(callbackFunction) !== 'function') {
        throw new Error('supply a callback function!!!');
    }

    if (node === null) {
        return;
    }

    postOrder(node.left, callbackFunction);
    postOrder(node.right, callbackFunction);
    callbackFunction(node);
}

// calculate the number of steps between a given node to its farthest leaf node
function height(node){
    if (node === null){
        return -1;
    }

    let countLeft = height(node.left);
    let countRight = height(node.right);

    return Math.max(countLeft, countRight) + 1;
}

// calculate the number of steps between the root node and the target node 
function depth(targetNode, root){
    //  base case: if node is null or root is null, return -1 
    if (targetNode === null || root === null){
        return -1;
    }

    if (targetNode === root) {
        return 0;
    }

    // recursively search through L + R subtrees 
    let leftDepth = depth(targetNode, root.left);
    let rightDepth = depth(targetNode, root.right);

    //  If the node is found in the left or right subtree, return the depth + 1
    if (leftDepth >= 0) {
        return leftDepth + 1;
    }
    if (rightDepth >= 0) {
        return rightDepth + 1;
    }

    //  If not found, return -1
    return -1;
}

// Check if a tree is balanced by comparing height of each subtree
function isBalanced(tree){

    function checkBalanced(node){
        //  base case: if tree node is null return null 
        if(node === null){
            return true;
        }

        let leftHeight = height(node.left);
        let rightHeight = height(node.right)

        if(Math.abs(leftHeight - rightHeight) > 1){
            return false;
        };

        // check the balance of the left and right
        return checkBalanced(node.left) && checkBalanced(node.right);
    }   

    return checkBalanced(tree);
}

//helper function to print array
function addToArray(node, arr=[]) {
    arr.push(node.data);
}

// Rebalance tree - traverse tree in preOrder, add to array, run function again with buildtree
function reBalance(tree){
    const arrayToBalance = [];

    function myLittleHelperArray(node) {
        arrayToBalance.push(node.data);
    }
    // call tree traversal function and use helper function to push to array complete tree in order
    inOrder(tree, myLittleHelperArray);
    
    // check all values are there
    console.log(arrayToBalance);

    // build new tree
    let newTree = buildTree(arrayToBalance, 0, arrayToBalance.length - 1);

    // display new tree in console
    prettyPrint(newTree);

    // return new tree(which is really the root node of 20)
    return newTree; 
}

//  Create an array of random numbers less than 99 
function randomArrayBoii(desiredArraySize) {
    const numberHolder = [];

    for(let i=0; i < desiredArraySize; i++){
        const randoNumbo = (Math.floor(Math.random() * 99))
        numberHolder.push(randoNumbo);
    }

    console.log(numberHolder);
    return numberHolder;
}

// MY EXAMPLE FUNCTION

// const myArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// const myBinaryTree = masterFunction(myArray);
// console.log(myBinaryTree);
// //  console.log(isBalanced(myBinaryTree));
// insert(myBinaryTree, 20);
// insert(myBinaryTree, 500);
// insert(myBinaryTree, 42);

// prettyPrint(myBinaryTree);
// console.log(myBinaryTree);

// deleteItem(myBinaryTree, 67);
// deleteItem(myBinaryTree, 3);
// deleteItem(myBinaryTree, 5);

// prettyPrint(myBinaryTree);
// console.log(myBinaryTree);

// insert(myBinaryTree, 79);
// insert(myBinaryTree, 999);
// insert(myBinaryTree, 2);

// prettyPrint(myBinaryTree);

//  find(myBinaryTree, 2);
//  find(myBinaryTree, 33);
//  find(myBinaryTree, 999);

//  console.log(myBinaryTree);

//  levelOrder(myBinaryTree, logTheNodes);

//  inOrder(myBinaryTree, logTheNodes);
//  preOrder(myBinaryTree, logTheNodes);
//  postOrder(myBinaryTree, logTheNodes);

//  console.log(height(myBinaryTree.right.left.right.right));
//  console.log(depth(myBinaryTree.right.left.right.right, myBinaryTree));

//  console.log(isBalanced(myBinaryTree));

// reBalance(myBinaryTree);

// Final Test 
const randoArray = randomArrayBoii(88);
const testTreeFinal = masterFunction(randoArray);
console.log(isBalanced(testTreeFinal));
prettyPrint(testTreeFinal);
inOrder(testTreeFinal, addToArray);
preOrder(testTreeFinal, addToArray);
postOrder(testTreeFinal, addToArray);

for(let i=0; i<20; i++){
    const randoNumber = Math.floor(Math.random() * (5000 - 100 + 1) + 100);
    insert(testTreeFinal, randoNumber);
}

prettyPrint(testTreeFinal);
console.log(isBalanced(testTreeFinal));

const thanosTree = reBalance(testTreeFinal);
prettyPrint(thanosTree);
console.log(isBalanced(thanosTree));

