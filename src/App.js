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
      plots2D[r][c].column = c;
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
    //clockwise:
    // up, upright, downright, down, downleft, upleft


    // if x === 0,
  }
  const step = () => {
    setTrueTime(trueTime + 1);

    times(plotGrid.length, row => {
      times(plotGrid[row].length, col=> {
        let dice = rollUpTo(6);
        if (dice === 6){
          // find all empty neighbors
          // make a flower
          // decide whether to mutate color
          //
        }
      });
    });
  }
  let timeOfDay = "";
  if ( trueTime % 3 === 0) { timeOfDay = <WiSunrise size={40}/>; }
  else if ( trueTime % 3 === 1 ) { timeOfDay = <WiDaySunny size={40}/>; }
  else if ( trueTime % 3 === 2 ) { timeOfDay = <WiNightAltPartlyCloudy size={40}/>; }

  return (
    <>
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
    </>
  );
}

export default App;
