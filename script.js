//DRAWING GRID AND CREATING NODES
//--------------------------------

//initialising grid dimensions
let x = 56;
let y = 30;

//Constructor for node object
class node {
    constructor(y, x, id, start, end, wall) {
        this.y = y;
        this.x = x;
        this.id = id;
        this.start = start;
        this.end = end;
        this.wall = wall;
    }
};

//Creating 2D array - grid that will store nodes
let grid = [];
for (i=0; i<x; i++){
    grid[i] = [];
};


//generating all nodes
for(i=0; i<y; i++){
    for(j=0; j<x; j++){
        var newNode = document.createElement('div');
        // var nodeText = document.createTextNode(i + ',' + j);
        newNode.id = 'x' + j + '-y' + i;
        newNode.class = 'node';
        grid[i][j] = new node(i, j, newNode.id, false, false, false);
        // nodeItem.appendChild(nodeText);
        document.getElementById('grid').appendChild(newNode);
        console.log(grid[i][j])

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
    if(this.start != true && this.end != true && this.wall != true) {           //node won't highlight if it has been set as start/end/wall node
        document.getElementById(nodeID).style = 'background-color: yellow';
    }
}

//Return to original colour when mouse leaves
function unHighlight() {
    nodeID = getid(this);
    if(this.start != true && this.end != true && this.wall != true) {           //node won't un-highlight if it has been set as start/end/wall node
        document.getElementById(nodeID).style = 'background-color: lightgrey';
    }
}

//ADDING CONTROLS
//----------------

//creating object for cursor properties
var cursor = {
    start: false,
    end: false,
    wall: false,
};

//adding functions for buttons in control bar

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

//Set state of node, when clicked, depending on properties of cursor object

function setState() {
    nodeID = getid(this);
    if(cursor.start == true) {
        document.getElementById(nodeID).style = 'background-color: green';
        this.start = true; // this isn't working because we're targeting the html element and not the node object
        // this.end = false;
        // this.wall - false;
        // for(i=0; i<y; i++){
        //     for(j=0; j<x; j++){
        //         if(grid[i][j].id != nodeID){        //looping through each node and setting .start to false if it isn't the node we just clicked
        //             grid[i][j].start = false;       //so that only one node can be the start node at a time
        //             document.getElementById(grid[i][j].id).style = "background-color: lightgrey";     
        //         }
        //     }
        // }
        console.log(grid[0][0]);   
    }
    if(cursor.end == true) {
        document.getElementById(nodeID).style = 'background-color: red';
        this.start = false;
        this.end = true;
        this.wall = false;
    }
    if(cursor.wall == true) {
        document.getElementById(nodeID).style = 'background-color: black';
        this.start = false;
        this.end = false;
        this.wall =true;
    }
}