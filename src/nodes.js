//DRAWING GRID AND CREATING NODES
//--------------------------------

//initialising grid dimensions
let x = 56;
let y = 30;

//Constructor for node object
class node {
    constructor(y, x, id, visited, animated, shortestPath, distance, start, end, wall, previousNodeX, previousNodeY) {
        this.y = y;
        this.x = x;
        this.id = id;
        this.visited = visited;
        this.animated = animated;   //will become true if node has been animated (this is to fix bugs with cursor colouring nodes incorrectly)
        this.shortestPath = shortestPath;
        this. distance = distance;
        this.start = start;
        this.end = end;
        this.wall = wall;
        this.previousNodeX = previousNodeX;
        this.previousNodeY = previousNodeY;
    }
};

//initialising startNode and endNode

var startNode = null;
var endNode = null;

//Creating 2D array - grid that will store nodes
let grid = [];
for (i=0; i<x; i++){
    grid[i] = [];
};


//generating all nodes
for(i=0; i<y; i++){
    for(j=0; j<x; j++){
        let newNode = document.createElement('div');
        // var nodeText = document.createTextNode(i + ',' + j);
        newNode.id = 'x' + j + '-y' + i;
        newNode.className = 'node';
        grid[i][j] = new node(i, j, newNode.id, false, false, false, Infinity, false, false, false, null, null);
        // nodeItem.appendChild(nodeText);
        document.getElementById('grid').appendChild(newNode);

        //giving each node an event listener for highlighting when mouse scrolls over
        document.getElementById('x' + j + '-y' + i).addEventListener('mouseover', highlight);
        document.getElementById('x' + j + '-y' + i).addEventListener('mouseout', unHighlight);

        //giving each node event listener for setting it's start (Start, End, Wall etc...)
        document.getElementById('x' + j + '-y' + i).addEventListener('click', setState, true);
        document.getElementById('x' + j + '-y' + i).addEventListener('mousedown', wallOn, true);
        document.getElementById('x' + j + '-y' + i).addEventListener('mouseenter', wallDrag, true);
        document.getElementById('x' + j + '-y' + i).addEventListener('mouseup', wallOff, true);
    }
}