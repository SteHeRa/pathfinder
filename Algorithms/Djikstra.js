function Djikstra () {
    let unvisitedNodes = [];        //Array to hole all unvisited nodes
    let visitedNodes = [];          //Array to dump visited nodes into
    for(i = 0; i < grid[i].length; i++){
        unvisitedNodes = unvisitedNodes.concat(grid[i]);        //populating unvisited nodes array to make life easier for sorting and retrieving closest unvisited node 
    }
    startNode.distance = 0;     //setting start node distance to 0 - first step on djikstras algorithm
    currentNode = startNode;    //start node is set to current node - initialising for while loop below
    while (currentNode.end === false) {     //while loop that runs until end node is reached
        if (currentNode.y > 0 && grid[currentNode.y - 1][currentNode.x].visited == false && grid[currentNode.y - 1][currentNode.x].wall == false) {
        grid[currentNode.y - 1][currentNode.x].distance = currentNode.distance + 1;     //checking neighbouring nodes (taking care for edge cases)
        grid[currentNode.y - 1][currentNode.x].previousNodeX = currentNode.x;           //assigning all of neighbouring nodes distances to current node distance + 1
        grid[currentNode.y - 1][currentNode.x].previousNodeY = currentNode.y;           //and also tagging neighbouring nodes with co-ords of current node
        }                                                                               //this is done so we can find our shortest path
        if (currentNode.x < x-1 && grid[currentNode.y][currentNode.x + 1].visited == false && grid[currentNode.y][currentNode.x + 1].wall == false) {
        grid[currentNode.y][currentNode.x + 1].distance = currentNode.distance + 1;     
        grid[currentNode.y][currentNode.x + 1].previousNodeX = currentNode.x;           //notes above apply here
        grid[currentNode.y][currentNode.x + 1].previousNodeY = currentNode.y;
        }
        if (currentNode.y < y-1 && grid[currentNode.y + 1][currentNode.x].visited == false && grid[currentNode.y + 1][currentNode.x].wall == false) {
        grid[currentNode.y + 1][currentNode.x].distance = currentNode.distance + 1;
        grid[currentNode.y + 1][currentNode.x].previousNodeX = currentNode.x;           //notes above apply here
        grid[currentNode.y + 1][currentNode.x].previousNodeY = currentNode.y;
        }
        if (currentNode.x > 0 && grid[currentNode.y][currentNode.x - 1].visited == false && grid[currentNode.y][currentNode.x - 1].wall == false) {
        grid[currentNode.y][currentNode.x - 1].distance = currentNode.distance + 1;
        grid[currentNode.y][currentNode.x - 1].previousNodeX = currentNode.x;           //notes above apply here
        grid[currentNode.y][currentNode.x - 1].previousNodeY = currentNode.y;
        }
        grid[currentNode.y][currentNode.x].visited = true;      //after all neighbours have been checked and distances adjusted current node is marked as visited

        unvisitedNodes.sort((a, b) => (a.distance < b.distance) ? -1 : 1);      //sorting unvisited nodes everytime - inefficient...
                                                                                //would be better to use min-heap but for this case with so few nodes it shouldn't significantly affect performance
        if (unvisitedNodes[0].visited === true) {
            visitedNodes.push(unvisitedNodes.shift());      //removing visited node from unvisitedNode array and putting it into visitedNode array
            // console.log(visitedNodes);                      //using .shift because after sorting the first item in array will be our visited node (implied in if statement)
        }                                                   //using .push to add visited nodes to array in order

        if (unvisitedNodes[0].visited === false && unvisitedNodes[0].distance !== Infinity) {
            currentNode = unvisitedNodes[0];                //setting new current node to the closest unvisited node
        } else {
            alert('There is no path between the start node and the end node.')
            return visitedNodes;
        }
    }
    
    let shortestPath = [currentNode];       //following path of previous node co-ords back to start to get a shortest path
    while(shortestPath[0].previousNodeX != null && shortestPath[0].previousNodeY != null) {
        shortestPath.unshift(grid[shortestPath[0].previousNodeY][shortestPath[0].previousNodeX]);
    }

    function animateNodes(i){       //animating nodes as they are visited using setTimeout create animation
        setTimeout(() => {
            document.getElementById(`x${visitedNodes[i].x}-y${visitedNodes[i].y}`).style = 'background-color: #28A4E5';
            document.getElementById(`x${visitedNodes[i].x}-y${visitedNodes[i].y}`).className = 'visitedNode';
            visitedNodes[i].animated = true;
        }, 10 * i);
    }


    function animateShortestPath(j){        //animating shortest path nodes - NEED TO TRY AND GET THIS TO ANIMATE AFTER VISITED NODES ANIMATION IS FINISHED
        setTimeout(() => {                                                 //-----------------------------------------------------------------------------
            document.getElementById(`x${shortestPath[j].x}-y${shortestPath[j].y}`).style = 'background-color: #ffdf00';
            shortestPath[j].shortestPath = true;
        }, 100 * j);
    }

    for(i=0; i<visitedNodes.length; i++){   //calling animate function
        delay = animateNodes(i);   
    } 

    setTimeout(() => {
        for(j=0; j<shortestPath.length; j++){   //calling animate function
            animateShortestPath(j);
        }
    }, visitedNodes.length * 10);   //this '10' value needs to be the same as the timeout multiple in the animatedNodes function
}                                   //or the timings will be off for when the shortest path animation starts.