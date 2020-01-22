//Highlight node that mouse is over
function highlight() {
    nodeID = getid(this);
    for(i=0; i<y; i++){
        for(j=0; j<x; j++){
            if (grid[i][j].id === nodeID){
                if(grid[i][j].start == false && grid[i][j].end == false && grid[i][j].wall == false) {           //node won't highlight if it has been set as start/end/wall node
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
                if(grid[i][j].animated == true) {
                    document.getElementById(nodeID).style = 'background-color: green';
                }
            }
        }
    }
}