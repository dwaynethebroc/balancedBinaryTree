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

function masterFunction(array){
    console.log(`Original array: ${array}`);
    console.log(`Merge sort started`);
    const sortedArray = mergeSort(array); //sorts array with mergeSort only once, instead of including in recursive function
    console.log(`Merge sort finished: ${sortedArray}`);
    console.log(`Duplicate Removal function`);
    const duplicatesremovedArray = [ ...new Set(sortedArray) ]; //ES6 removes array
    console.log(`Duplicates removed: ${duplicatesremovedArray}`);
    console.log('buildTree function starting');
    const myTree = buildTree(duplicatesremovedArray, 0, duplicatesremovedArray.length - 1);
    console.log('buildTree function finished')
    prettyPrint(myTree);
    console.log(`Return value of buildTree function: ${myTree}`);

}

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
 
const myArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
masterFunction(myArray);