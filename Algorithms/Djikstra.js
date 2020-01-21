function Djikstra () {
    let unvisitedNodes = [];
    let visitedNodes = [];
    for(i = 0; i < grid[i].length; i++){
        unvisitedNodes = unvisitedNodes.concat(grid[i]);
    }
    startNode.distance = 0;
    currentNode = startNode;
    while (currentNode.end === false) {
        if (currentNode.y > 0 && grid[currentNode.y - 1][currentNode.x].visited == false && grid[currentNode.y - 1][currentNode.x].wall == false) {
        grid[currentNode.y - 1][currentNode.x].distance = currentNode.distance + 1;
        grid[currentNode.y - 1][currentNode.x].previousNodeX = currentNode.x;
        grid[currentNode.y - 1][currentNode.x].previousNodeY = currentNode.y;
        // console.log(currentNode);
        }
        if (currentNode.x < x-1 && grid[currentNode.y][currentNode.x + 1].visited == false && grid[currentNode.y][currentNode.x + 1].wall == false) {
        grid[currentNode.y][currentNode.x + 1].distance = currentNode.distance + 1;
        grid[currentNode.y][currentNode.x + 1].previousNodeX = currentNode.x;
        grid[currentNode.y][currentNode.x + 1].previousNodeY = currentNode.y;
        // console.log(currentNode);
        }
        if (currentNode.y < y-1 && grid[currentNode.y + 1][currentNode.x].visited == false && grid[currentNode.y + 1][currentNode.x].wall == false) {
        grid[currentNode.y + 1][currentNode.x].distance = currentNode.distance + 1;
        grid[currentNode.y + 1][currentNode.x].previousNodeX = currentNode.x;
        grid[currentNode.y + 1][currentNode.x].previousNodeY = currentNode.y;
        // console.log(currentNode);
        }
        if (currentNode.x > 0 && grid[currentNode.y][currentNode.x - 1].visited == false && grid[currentNode.y][currentNode.x - 1].wall == false) {
        grid[currentNode.y][currentNode.x - 1].distance = currentNode.distance + 1;
        grid[currentNode.y][currentNode.x - 1].previousNodeX = currentNode.x;
        grid[currentNode.y][currentNode.x - 1].previousNodeY = currentNode.y;
        // console.log(currentNode);
        }
        grid[currentNode.y][currentNode.x].visited = true;
        // document.getElementById(`x${currentNode.x}-y${currentNode.y}`).style = 'background-color: green';

        unvisitedNodes.sort((a, b) => (a.distance < b.distance) ? -1 : 1);

        if (unvisitedNodes[0].visited === true) {
            visitedNodes.push(unvisitedNodes.shift());
            console.log(visitedNodes);
        }

        if (unvisitedNodes[0].visited === false) {
            // unvisitedNodes[0].previousNodeX = currentNode.x;
            // unvisitedNodes[0].previousNodeY = currentNode.y;
            currentNode = unvisitedNodes[0];
        }
        // console.log(currentNode.previousNodeX, currentNode.previousNodeY);
    }

    function animateNodes(i){
        setTimeout(() => {
            document.getElementById(`x${visitedNodes[i].x}-y${visitedNodes[i].y}`).style = 'background-color: green';
        }, 25 * i);
    }

    for(i=0; i<visitedNodes.length; i++){
            animateNodes(i);
    }

    // console.log(unvisitedNodes);
    // console.log(currentNode.end, currentNode.previousNodeX, currentNode.previousNodeY);

    let shortestPath = [currentNode];
    while(shortestPath[0].previousNodeX != null && shortestPath[0].previousNodeY != null) {
        shortestPath.unshift(grid[shortestPath[0].previousNodeY][shortestPath[0].previousNodeX]);
        console.log(shortestPath);
    }

    function animateShortestPath(j){
        setInterval(() => {
            document.getElementById(`x${shortestPath[j].x}-y${shortestPath[j].y}`).style = 'background-colour: yellow';
        }, 100 * j);
    }

    for(j=0; j<shortestPath.length; j++){
        animateShortestPath(j);
    }
}