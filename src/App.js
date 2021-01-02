import './styles/App.css';
import times from 'lodash/times';
import PlotRow from './components/PlotGrid/PlotRow';
import { useState } from 'react';
import { rollUpTo } from './utils/dice';
import { grassColors, flowerColors, flowerColorsAccessible, colorNames } from './constants/colors';
import { gameConfig } from './config/gameConfig';
import { WiDaySunny, WiSunrise, WiNightAltPartlyCloudy } from "weather-icons-react";
import LocalFlorist from "@material-ui/icons/LocalFlorist";
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import Inventory from './components/Inventory';


import {
  createMuiTheme,
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
        var ageRoll = rollUpTo(2); // select age

        var budColor = grassColors[rollUpTo(grassColors.length)];
        var flowerColorRoll = rollUpTo(flowerHues.length);
        var flowerColor = flowerHues[flowerColorRoll];
        var flowerColorName = colorNames[flowerColorRoll];

        plots[id] = {
          id: id,
          isFlower: true,
          budColor: budColor,
          flowerColor: flowerColor,
          flowerColorName: flowerColorName,
          name: flowerColorName + " Flower",
          age: ageRoll
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
  const [inventory, setInventory] = useState([
    {
      flowerColor: 0,
      colorName: colorNames[0],
      quantity: 3
    },
    {
      flowerColor: 4,
      colorName: colorNames[4],
      quantity: 1
    }
]);

  const displayTime = 1+Math.floor(trueTime/3);

  const findNeighbors = (x , y) => {

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
    if (x > 0)  neighbors.push({row: x-1, col: y});
    if (y < gameConfig.rowSize-1) neighbors.push({row: x, col: y+1});
    if (y < gameConfig.rowSize-1) neighbors.push({row: x, col: y+1});
    if (x < gameConfig.rowSize-2) neighbors.push({row: x+1, col: y});
    if (x < gameConfig.rowSize-2 && y > 0 ) neighbors.push({row: x+1, col: y-1});
    if (x > 0 && y > 0) neighbors.push({row: x-1, col: y});

    return neighbors;
  }

  const findEmptyNeighbors = (x , y) =>{
    let neighbors = findNeighbors(x, y);
    let empties = [];
    times(neighbors.length, (i) => {
      if (!plotGrid[neighbors[i].row][neighbors[i].col].isFlower){
        empties.push(plotGrid[neighbors[i].row][neighbors[i].col]);
      }
    });

    return empties;
  }

  const plantFlower = (x, y) => {
    var flowerColorRoll = rollUpTo(flowerHues.length);
    let flowerColor = flowerHues[flowerColorRoll];
    let flowerColorName = colorNames[flowerColorRoll];
    let budColor = grassColors[rollUpTo(grassColors.length)];
    plotGrid[x][y] = {
        isFlower: true,
        flowerColor: flowerColor,
        flowerColorName: flowerColorName,
        budColor: budColor,
        name: flowerColorName + " Flower",
        content: "flower",
        row: x,
        col: y,
        age: 0,
        marked: true
      };
      setPlotGrid(plotGrid);

    }

  const step = () => {
    // first we increment time
    setTrueTime(trueTime + 1);

    //unmark everyone
    times(plotGrid.length, row => {
      times(plotGrid[row].length, col=> {
        plotGrid[row][col].marked = false;
      });
    });

    //then we let our adults breed
    times(plotGrid.length, row => {
      times(plotGrid[row].length, col=> {
        if (!plotGrid[row][col].marked){
          plotGrid[row][col].marked = true;
          if (plotGrid[row][col].age < 2 && (trueTime % 3 === 2 || trueTime % 3 === 0)) {
            plotGrid[row][col].age ++;
            //ensure we don't age this spot again
          };

          if (plotGrid[row][col].isFlower && plotGrid[row][col].age===2){
            let empties = findEmptyNeighbors(row, col);
              let pick = empties[rollUpTo(empties.length)];
              if (pick) plantFlower(pick.row, pick.col);
          }
        }

      });
    });



  }

  let timeOfDay = "";

  // TODO: this is hideous. Make a component for this weather icon.
  if ( trueTime % 3 === 0) { timeOfDay = <WiSunrise size={40} style={{backgroundColor: '#d47986', padding: '3 2 0 2', borderRadius: '10px', border: '2px solid white'}}/>; }
  else if ( trueTime % 3 === 1 ) { timeOfDay = <WiDaySunny size={40} style={{backgroundColor: '#dbbd72', padding: '3 2 0 2', borderRadius: '10px', border: '2px solid white'}}/>; }
  else if ( trueTime % 3 === 2 ) { timeOfDay = <WiNightAltPartlyCloudy size={40} style={{backgroundColor: '#739cde', padding: '3 2 0 2', borderRadius: '10px', border: '2px solid white'}}/>; }


  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <header className="App-header">
      {title}
       <Fab variant="extended" color="primary" onClick={() =>{
           step();
         }} style={{
           margin: "1em"
         }}>
         <UpdateIcon />
       </Fab>
       <p>{timeOfDay}</p>
       <p> {'Day '+displayTime} </p>
      <Inventory flowerHues={flowerHues} items={inventory} setItems={setInventory}/>

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
