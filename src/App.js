import './styles/App.css';
import times from 'lodash/times';
import PlotRow from './components/PlotGrid/PlotRow';
import Inventory from './components/Inventory';

import { useState } from 'react';
import { rollUpTo, generateFlower, generateDeadPlot } from './utils/dice';
import {flowerColors, flowerColorsAccessible } from './constants/colors';
import { gameConfig } from './config/gameConfig';
import { WiDaySunny, WiSunrise, WiNightAltPartlyCloudy } from "weather-icons-react";
import Fab from '@material-ui/core/Fab';

import {
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import UpdateIcon from '@material-ui/icons/Update';


let flowerHues = gameConfig.accessibilityMode ? flowerColorsAccessible : flowerColors;

//returns a 2D array "plot" objects: {id, isFlower, color, name, content, row, column}
const generatePlots = (size) => {
  let plots = [];
  let plots2D = [];

  times(size, id => {
      let dice = rollUpTo(100); // roll a 100 sided die
      if (dice<=gameConfig.fertility){ // chance of rolling a flower
        var ageRoll = rollUpTo(2); // select age
        plots[id] = generateFlower({age: ageRoll, id: id});
      } else {
        plots[id] = generateDeadPlot({id: id})
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
  const [inventory, setInventory] = useState([]);

  // Days are divided into 3 sections. "trueTime" will always reflect exactly
  // how many time units have passed; displayTime shows what day we are on.
  const displayTime = 1+Math.floor(trueTime/3);

  const findNeighbors = (x , y) => {
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
      let id = plotGrid[x][y].id;
      plotGrid[x][y] = generateFlower({x, y, id, age:0});
      setPlotGrid([...plotGrid]);
  }

  const killFlower = (x, y) => {
      let id = plotGrid[x][y].id;
      plotGrid[x][y] = generateDeadPlot({x, y, id})
      setPlotGrid([...plotGrid]);
  }


// This is the heaviest function in the game. It represents the procession
// of a unit of time.
  const step = () => {
    // first we increment time
    setTrueTime(trueTime + 1);

    //unmark everyone just in case
    times(plotGrid.length, row => {
      times(plotGrid[row].length, col=> {
        plotGrid[row][col].marked = false;
      });
    });

    // We don't want to kill anyone till the end, but we also don't want
    // to loop through the grid more than once, so we'll keep a
    // death list that we'll revisit once everyone gets a chance to breed.

    const deathList = [];

    //then we let our healthy adults breed
    times(plotGrid.length, row => {
      times(plotGrid[row].length, col=> {
        if (!plotGrid[row][col].marked){
          plotGrid[row][col].marked = true;

          //only age buds at the right time of day.
          if (plotGrid[row][col].age < 2 && (trueTime % 3 === 2 || trueTime % 3 === 0)) {
            plotGrid[row][col].age ++;
          };

          if (plotGrid[row][col].isFlower && plotGrid[row][col].age===2){
            let empties = findEmptyNeighbors(row, col);
            if (empties.length){
              let pick = empties[rollUpTo(empties.length)];
              if (pick) plantFlower(pick.row, pick.col);
            } else {
              //Overpopulation - roll to mark flower for death. Sorry dude
              let roll = rollUpTo(4);
              if (!roll) deathList.push({row, col});
            }
          }
        }

      });
    });

    //Everybody who is going to breed has now bred.
    //We kill at the end because if we killed in the first loop,
    //breeding adults could claim the empty slot before the next day begins.

    times(deathList.length, i => {
      //at this point we only want to kill flowers who are STILL
      //under the conditions of overpopulation;
      //the issue may have been resolve by a neighbor's death so let's check again
      let empties = findEmptyNeighbors(deathList[i].row, deathList[i].col);
      if (!empties.length) {
        killFlower(deathList[i].row, deathList[i].col);
      }
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
          return <PlotRow
            plots={plotRow}
            gridState={plotGrid} gridStateSetter={setPlotGrid}
            inventoryState={inventory} inventoryStateSetter={setInventory}
/>
        })}
      </div>
      </header>
    </div>
    </ThemeProvider>
  );
}

export default App;
