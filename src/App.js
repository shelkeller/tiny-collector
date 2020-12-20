import './styles/App.css';
import times from 'lodash/times';
import PlotRow from './components/PlotGrid/PlotRow';
import { useState } from 'react';
import { rollUpTo } from './utils/dice';
import { grassColors, flowerColors, flowerColorsAccessible, colorNames } from './constants/colors';
import { gameConfig } from './config/gameConfig';
import { WiDaySunny, WiSunrise, WiNightAltPartlyCloudy } from "weather-icons-react";


import {
  createMuiTheme,
  createStyles,
  withStyles,
  makeStyles,
  Theme,
  ThemeProvider,
} from '@material-ui/core/styles';
import { green, purple } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import UpdateIcon from '@material-ui/icons/Update';


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
          content: "grass"
        };
      }
  });

  //We splice it into rows, and make a 2D array of those.
  while(plots.length) plots2D.push(plots.splice(0, gameConfig.rowSize));

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

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#185653"
    },
  },
});


function App() {
  const rowSize = gameConfig.rowSize;
  const title = gameConfig.title;

  const [plotGrid, setPlotGrid] = useState(generatePlots(rowSize*(rowSize-1)));
  const [trueTime, setTrueTime] = useState(0);
  const displayTime = 1+Math.floor(trueTime/3);

  const findNeighbors = (x , y) => {
    /*
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
    if (x > 0)  neighbors.push({row: x-1, col: y});
    if (x > 0 && y < gameConfig.rowSize-1) neighbors.push({row: x-1, col: y+1});
    if (y < gameConfig.rowSize-1) neighbors.push({row: x, col: y+1});
    if (x < gameConfig.rowSize-2) neighbors.push({row: x+1, col: y});
    if (x < gameConfig.rowSize-2 && y > 0 ) neighbors.push({row: x+1, col: y-1});
    if (x > 0 && y > 0) neighbors.push({row: x-1, col: y-1});

    return neighbors;
  }

  let findEmptyNeighbors = (x , y) =>{
    let neighbors = findNeighbors(x, y);
    let empties = [];
    times(neighbors.length, (i) => {
      if (plotGrid[neighbors[i].row][neighbors[i].col].content==='grass'){
        empties.push(plotGrid[neighbors[i].row][neighbors[i].col]);
      }
    });

    return empties;
  }

  const plantFlower = (x, y) =>{
    let dice = rollUpTo(100); // roll a 100 sided die
    var colorRoll = rollUpTo(flowerHues.length); //Select a flower hue
    let color = flowerHues[colorRoll];
    let colorName = colorNames[colorRoll]; //Get its matching color name
    plotGrid[x][y] = {
        isFlower: true,
        color: color,
        name: colorName + " Flower",
        content: "flower",
        row: x,
        col: y
      };
      setPlotGrid(plotGrid);

}
  const step = () => {
    setTrueTime(trueTime + 1);

    times(plotGrid.length, row => {
      times(plotGrid[row].length, col=> {
        if (plotGrid[row][col].isFlower){
          let empties = findEmptyNeighbors(row, col);
          console.log(empties);
            let pick = empties[rollUpTo(empties.length)];
            console.log(!!pick);
            if (pick) plantFlower(pick.row, pick.col);
        }
      });
    });
  }

  let timeOfDay = "";

  if ( trueTime % 3 === 0) { timeOfDay = <WiSunrise size={40} style={{backgroundColor: '#d47986', padding: '3 2 0 2', borderRadius: '10px', border: '2px solid white'}}/>; }
  else if ( trueTime % 3 === 1 ) { timeOfDay = <WiDaySunny size={40} style={{backgroundColor: '#dbbd72', padding: '3 2 0 2', borderRadius: '10px', border: '2px solid white'}}/>; }
  else if ( trueTime % 3 === 2 ) { timeOfDay = <WiNightAltPartlyCloudy size={40} style={{backgroundColor: '#739cde', padding: '3 2 0 2', borderRadius: '10px', border: '2px solid white'}}/>; }

  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <header className="App-header">
      {title}
       <Button variant="contained" color="primary" onClick={() =>{
           step();
         }} style={{
           margin: "1em"
         }}>
         <UpdateIcon />
       </Button>
       <p>{timeOfDay}</p>
       <p> {'Day '+displayTime} </p>

     {/*
     I get that it would probably be a good idea to
     have another component called PlotGrid or something
     but really all it would do is wrap this set of PlotRows
     in a div with this className. and that just isn't enough
     stuff to justify a whole file or even its own variable
     I think
     */}
      <div className="honeycomb" style={{paddingTop: "2em"}}>
        {plotGrid.map((plotRow, i) => {
          return <PlotRow plots={plotRow} gridState={plotGrid} gridStateSetter={setPlotGrid} />
        })}
      </div>
      </header>
    </div>
    </ThemeProvider>
  );
}

export default App;
