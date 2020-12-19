import './styles/App.css';
import times from 'lodash/times';
import PlotRow from './components/PlotGrid/PlotRow';
import { useState } from 'react';
import { rollUpTo } from './utils/dice';
import { grassColors, flowerColors, flowerColorsAccessible, colorNames } from './constants/colors';
import { gameConfig } from './config/gameConfig';

let flowerHues = gameConfig.accessibilityMode ? flowerColorsAccessible : flowerColors;


//returns a 2D array "plot" objects: {id, isFlower, color, name, content, row, column}
const generatePlots = (size) => {
  let plots = [];
  let plots2D = [];

  times(size, id => {
      let color;
      let dice = rollUpTo(100); // roll a 100 sided die
      if (dice<=gameConfig.fertility){ // chance of rolling a flower

        var colorRoll = rollUpTo(flowerHues.length); //Select a flower hue
        color = flowerHues[colorRoll];
        let colorName = colorNames[colorRoll]; //Get its matching color name
        plots[id] = {
          id: id,
          isFlower: true,
          color: color,
          name: colorName + " Flower",
          content: "flower"
        };

      } else {
        color = grassColors[rollUpTo(grassColors.length)];
        plots[id] = {
          id: id,
          isFlower: false,
          color: color,
          name: "Empty",
          content: "grass"};
      }
  });

  //We splice it into rows, and make a 2D array of those.
  while(plots.length) plots2D.push(plots.splice(0, gameConfig.rowSize));

  // load up the plots with coordinate information.
  // This will be used to determine neighbors later.
  times(plots2D.length, r => {
    times(plots2D[r].length, c => {
      plots2D[r][c].row = r;
      plots2D[r][c].column = c;
    });
  });

  return plots2D;
}

function App() {
  const rowSize = gameConfig.rowSize;
  const title = gameConfig.title;
  // generatePlots takes an int and returns a 1D array.
  let plotRows = generatePlots(rowSize*(rowSize-1));


  return (
    <>
    <div className="App">
      <header className="App-header">
      {title}
      <div className="honeycomb" style={{paddingTop: "50px"}}>
        {plotRows.map((plotRow, i) => {
          return <PlotRow plots={plotRow} />
        })}
      </div>
      </header>
    </div>
    </>
  );
}

export default App;
