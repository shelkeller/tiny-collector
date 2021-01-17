import { grassColors, colorData } from './../constants/colors';
import { gameConfig } from './../config/gameConfig';
import times from 'lodash/times';


/*
A set of utilities for generating random things. 
*/

export const rollUpTo = (max) => {
  // Zero inclusive - max of 6 returns an integer 0-5
  return Math.floor(Math.random() * Math.floor(max));
}

export const generateDeadPlot = ({x=-1, y=-1, colorID, id=-1}) =>{
  if (!colorID) colorID = rollUpTo(grassColors.length);
  // returns a piece of plot data complete with a generated color.
  return {
    id: id,
    isFlower: false,
    color: grassColors[colorID],
    name: "Empty",
    content: "grass",
    row: x,
    col: y
  };
}

export const generateFlower = ({x=-1, y=-1, colorID, age = 0, id=-1}) => {
  // all parameters optional
  if (!colorID) colorID= rollUpTo(6);

  return {
    row: x,
    col: y,
    id: id,
    budColor: grassColors[rollUpTo(grassColors.length)],
    isFlower: true,
    flowerHex: colorData[colorID].colorHex,
    flowerColorName: colorData[colorID].colorName,
    flowerColorId: colorID,
    name: colorData[colorID].colorName+ " Flower",
    age: age
  }
}

//returns a 2D array "plot" objects: {id, isFlower, color, name, content, row, column}
export const generateFirstPlots = (size) => {
  let plots = [];
  let plots2D = [];
  
  // We want there to be at least one flower on the first field, so 
  // we go ahead and plant that one. 
  // pick a plot: 

  let firstFlowerId = rollUpTo(size);
  plots[firstFlowerId] = generateFlower({age: 0, id: firstFlowerId});

  times(size, id => {
    if (id !== firstFlowerId){
      let newGrowthRoll = rollUpTo(100); // roll a 100 sided die
      if (newGrowthRoll <= gameConfig.fertility) { // chance of rolling a flower
        var ageRoll = rollUpTo(2); // select age
        plots[id] = generateFlower({age: ageRoll, id: id});
      } else {
        plots[id] = generateDeadPlot({id: id})
      }
    }
  });

  //We splice it into rows, and make a 2D array of those.
  while (plots.length)
    plots2D.push(plots.splice(0, gameConfig.rowSize));

  // load up the plots with coordinate information.
  // This will be used to determine neighbors later.
  times(plots2D.length, r => {
    times(plots2D[r].length, c => {
      plots2D[r][c].row = r;
      plots2D[r][c].col = c;
    });
  });

  return plots2D;
}

export const findNeighbors = (x, y) => {
  //TODO: This is broken. There's a different formula for even and odd rows.
  /*
  neighbors will depend on whether y is even or odd
  clockwise:
  up: x-1, y
  upright: x-1, y+1
  downright: x, y+1
  down: x+1, y
  downleft: x+1, y-1
  upleft: x-1, y-1

  if x>0, get up
  if x>0 && y<gameConfig.rowSize, get upright
  if y<gameConfig.rowSize, get downRight
  if x<gameConfig.rowSize-1, get down
  if x<gameConfig.rowSize-1 && y>0, get downleft
  if x>0 and y>0, get upleft
  */

  let neighbors = [];
  if (x > 0)
    neighbors.push({
      row: x - 1,
      col: y
    });
  if (y < gameConfig.rowSize - 1)
    neighbors.push({
      row: x,
      col: y + 1
    });
  if (y < gameConfig.rowSize - 1)
    neighbors.push({
      row: x,
      col: y + 1
    });
  if (x < gameConfig.rowSize - 2)
    neighbors.push({
      row: x + 1,
      col: y
    });
  if (x < gameConfig.rowSize - 2 && y > 0)
    neighbors.push({
      row: x + 1,
      col: y - 1
    });
  if (x > 0 && y > 0)
    neighbors.push({
      row: x - 1,
      col: y
    });

  return neighbors;
}
