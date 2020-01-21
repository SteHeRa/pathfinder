//DRAWING GRID AND CREATING NODES
//--------------------------------

//initialising grid dimensions
let x = 56;
let y = 30;

//Constructor for node object
class node {
    constructor(y, x, id, visited, distance, start, end, wall, previousNodeX, previousNodeY) {
        this.y = y;
        this.x = x;
        this.id = id;
        this.visited = visited;
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
        newNode.class = 'node';
        grid[i][j] = new node(i, j, newNode.id, false, Infinity, false, false, false, null, null);
        // nodeItem.appendChild(nodeText);
        document.getElementById('grid').appendChild(newNode);

        //giving each node an event listener for highlighting when mouse scrolls over
        document.getElementById('x' + j + '-y' + i).addEventListener('mouseover', highlight);
        document.getElementById('x' + j + '-y' + i).addEventListener('mouseout', unHighlight);

        //giving each node event listener for setting it's start (Start, End, Wall etc...)
        document.getElementById('x' + j + '-y' + i).addEventListener('click', setState, true);
    }
}

//Get id of node (for choosing element during event)
//I think we could use 'event'.target method for this also
function getid(node) {
    return (node.id);
}

//Highlight node that mouse is over
function highlight() {
    nodeID = getid(this);
    for(i=0; i<y; i++){
        for(j=0; j<x; j++){
            if (grid[i][j].id === nodeID){
                if(grid[i][j].start == false && grid[i][j].end == false && grid[i][j].wall == false) {           //node won't un-highlight if it has been set as start/end/wall node
                    document.getElementById(nodeID).style = 'background-color: yellow';
                }
            }
        }
    }
}

//Return to original colour when mouse leaves
function unHighlight() {
    nodeID = getid(this);
    for(i=0; i<y; i++){
        for(j=0; j<x; j++){
            if (grid[i][j].id === nodeID){
                if(grid[i][j].start == false && grid[i][j].end == false && grid[i][j].wall == false) {           //node won't un-highlight if it has been set as start/end/wall node
                    document.getElementById(nodeID).style = 'background-color: lightgrey';
                }
                if(grid[i][j].visited == true) {
                    document.getElementById(nodeID).style = 'background-color: green';
                }
            }
        }
    }
}

//ADDING CONTROLS
//----------------

//creating object for cursor properties
let cursor = {
    start: false,
    end: false,
    wall: false,
};

//adding functions for buttons in control bar (find path function after setState function)

function setStart(){
    cursor.start = true;
    cursor.end = false;
    cursor.wall = false;
}

function setEnd(){
    cursor.start = false;
    cursor.end = true;
    cursor.wall = false;
}

function setWall(){
    cursor.start = false;
    cursor.end = false;
    cursor.wall = true;
}

document.getElementById('startBtn').addEventListener('click', setStart);
document.getElementById('endBtn').addEventListener('click', setEnd);
document.getElementById('wallBtn').addEventListener('click', setWall);
document.getElementById('findPathBtn').addEventListener('click', findPath);

//Set state of node, when clicked, depending on properties of cursor object

function setState() {
    nodeID = getid(this);
    if(cursor.start == true) {      //Setting node property to start
        document.getElementById(nodeID).style = 'background-color: green';
        for(i=0; i<y; i++){
            for(j=0; j<x; j++){
                if (grid[i][j].id === nodeID){
                    grid[i][j].start = true;
                    grid[i][j].end = false;
                    grid[i][j].wall = false;
                    console.log(grid[i][j]);
                    startNode = grid[i][j];
                } else if (grid[i][j].end != true && grid[i][j].wall != true){      //Making sure only one start node at a time
                    document.getElementById(grid[i][j].id).style = 'background-color: lightgrey';
                    grid[i][j].start = false;
                }
            }
        }
    } 
    if(cursor.end == true) {        //Setting node property to end
        document.getElementById(nodeID).style = 'background-color: red';
        for(i=0; i<y; i++){
            for(j=0; j<x; j++){
                if (grid[i][j].id === nodeID){
                    grid[i][j].start = false;
                    grid[i][j].end = true;
                    grid[i][j].wall = false;
                    console.log(grid[i][j]);
                    endNode = grid[i][j];
                } else if (grid[i][j].start != true && grid[i][j].wall != true){        //Making sure only one end node at a time
                    document.getElementById(grid[i][j].id).style = 'background-color: lightgrey';
                    grid[i][j].end = false;
                }
            }
        }
    }
    if(cursor.wall == true) {       //Setting node property to wall
        document.getElementById(nodeID).style = 'background-color: black';
        for(i=0; i<y; i++){
            for(j=0; j<x; j++){
                if (grid[i][j].id === nodeID){
                    if (grid[i][j].wall == true) {      //If node is already a wall, when clicked wall property removed
                        grid[i][j].wall = false;
                        document.getElementById(grid[i][j].id).style = 'background-color: lightgrey';
                        console.log(grid[i][j]);
                    } else {
                        grid[i][j].start = false;
                        grid[i][j].end = false;
                        grid[i][j].wall = true;
                        console.log(grid[i][j]);
                    }
                }
            }
        }
    }
}



function findPath(){
    //How to target the nearest nodes to the start node?
    if (startNode == null || endNode == null || startNode == endNode) {
        alert('Please select a start node and an end node before trying to find path');
    } else {
        Djikstra();
    }
}