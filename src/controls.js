//Get id of node (for choosing element during event)
//I think we could use 'event'.target method for this also
function getid(node) {
    return (node.id);
}

//ADDING CONTROLS
//----------------

//creating object for cursor properties
let cursor = {
    start: false,
    end: false,
    wall: false,
    eraseWall: false,
    mouseClickedDown: false,
};

//adding functions for buttons in control bar (find path function after setState function)

function setStart(){
    cursor.start = true;
    cursor.end = false;
    cursor.wall = false;
    cursor.eraseWall = false;
}

function setEnd(){
    cursor.start = false;
    cursor.end = true;
    cursor.wall = false;
    cursor.eraseWall = false;
}

function setWall(){
    cursor.start = false;
    cursor.end = false;
    cursor.wall = true;
    cursor.eraseWall = false;
    console.log(cursor);
}

function setErase(){
    cursor.start = false;
    cursor.end = false;
    cursor.wall = false;
    cursor.eraseWall = true;
    console.log(cursor);
}

function resetPage(){
    location.reload();
}

document.getElementById('startBtn').addEventListener('click', setStart);
document.getElementById('endBtn').addEventListener('click', setEnd);
document.getElementById('wallBtn').addEventListener('click', setWall);
document.getElementById('eraseWallBtn').addEventListener('click', setErase);
document.getElementById('findPathBtn').addEventListener('click', findPath);
document.getElementById('resetBtn').addEventListener('click', resetPage)

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
                    // console.log(grid[i][j]);
                    startNode = grid[i][j];
                } else if (grid[i][j].end != true && grid[i][j].wall != true){      //Making sure only one start node at a time
                    document.getElementById(grid[i][j].id).style = 'background-color: #f0f0f0';
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
                    // console.log(grid[i][j]);
                    endNode = grid[i][j];
                } else if (grid[i][j].start != true && grid[i][j].wall != true){        //Making sure only one end node at a time
                    document.getElementById(grid[i][j].id).style = 'background-color: #f0f0f0';
                    grid[i][j].end = false;
                }
            }
        }
    }
}

//Making seperate function for setting walls to allow for click and drag (this used to be part of set state before adding click and drag functionality)

function wallOn() {
    nodeID = getid(this);
    if(cursor.wall == true) {
        cursor.mouseClickedDown = true;
        document.getElementById(nodeID).style = 'background-color: black';
        // document.getElementById(nodeID).class = 'wall';
        for(i=0; i<y; i++){
            for(j=0; j<x; j++){
                if (grid[i][j].id === nodeID){
                    grid[i][j].start = false;
                    grid[i][j].end = false;
                    grid[i][j].wall = true;
                }
            }
        }
    }
    if(cursor.eraseWall == true) {              //Intergrating erase wall functions as well...
        cursor.mouseClickedDown = true;
        document.getElementById(nodeID).style = 'background-color: #f0f0f0';
        // document.getElementById(nodeID).class = 'wall';
        for(i=0; i<y; i++){
            for(j=0; j<x; j++){
                if (grid[i][j].id === nodeID){
                    grid[i][j].wall = false;
                }
            }
        }
    }
}

function wallDrag() { 
    nodeID = getid(this);
    if(cursor.wall == true && cursor.mouseClickedDown == true) {       //Setting node property to wall
        document.getElementById(nodeID).style = 'background-color: black';
        // document.getElementById(nodeID).class = 'wall';
        for(i=0; i<y; i++){
            for(j=0; j<x; j++){
                if (grid[i][j].id === nodeID){
                        grid[i][j].start = false;
                        grid[i][j].end = false;
                        grid[i][j].wall = true;
                }
            }
        }
    }
    if(cursor.eraseWall == true && cursor.mouseClickedDown == true) {
        document.getElementById(nodeID).style = 'background-color: #f0f0f0';
        for(i=0; i<y; i++){
            for(j=0; j<x; j++){
                if (grid[i][j].id === nodeID){
                    grid[i][j].wall = false;
                }
            }
        }
    }
}

function wallOff() {
    if(cursor.wall == true || cursor.eraseWall == true) {
        cursor.mouseClickedDown = false;
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