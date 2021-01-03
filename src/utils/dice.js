import { grassColors, colorData } from './../constants/colors';
import { gameConfig } from './../config/gameConfig';


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
