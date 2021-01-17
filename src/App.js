import './styles/App.css';
import times from 'lodash/times';
import PlotRow from './components/PlotGrid/PlotRow';
import Inventory from './components/Inventory';
import TopBar from './components/TopBar';
import MenuDrawer from './components/MenuDrawer';
import {useState} from 'react';
import {rollUpTo, generateFlower, generateDeadPlot, generateFirstPlots, findNeighbors } from './utils/dice';
import {flowerColors, flowerColorsAccessible} from './constants/colors';
import {gameConfig} from './config/gameConfig';
import {WiDaySunny, WiSunrise, WiNightAltPartlyCloudy} from "weather-icons-react";
import Fab from '@material-ui/core/Fab';
import Card from '@material-ui/core/Card';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import UpdateIcon from '@material-ui/icons/Update';

import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

let flowerHues = gameConfig.accessibilityMode
  ? flowerColorsAccessible
  : flowerColors;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#185653"
    }
  }
});

function App() {
  const rowSize = gameConfig.rowSize;
  const title = gameConfig.title;

  const [plotGrid, setPlotGrid] = useState(generateFirstPlots(rowSize * (rowSize - 1)));
  const [trueTime, setTrueTime] = useState(0);
  const [inventory, setInventory] = useState([]);

  // Days are divided into 3 sections. "trueTime" will always reflect exactly
  // how many time units have passed; displayTime shows what day we are on.
  const displayTime = 1 + Math.floor(trueTime / 3);

  const findEmptyNeighbors = (x, y) => {
    let neighbors = findNeighbors(x, y);
    let empties = [];
    times(neighbors.length, (i) => {
      if (!plotGrid[neighbors[i].row][neighbors[i].col].isFlower) {
        empties.push(plotGrid[neighbors[i].row][neighbors[i].col]);
      }
    });
    return empties;
  }

  const plantFlower = (x, y) => {
    let id = plotGrid[x][y].id;
    plotGrid[x][y] = generateFlower({x, y, id, age: 0});
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
      times(plotGrid[row].length, col => {
        plotGrid[row][col].marked = false;
      });
    });

    // We don't want to kill anyone till the end, but we also don't want
    // to loop through the grid more than once, so we'll keep a
    // death list that we'll revisit once everyone gets a chance to breed.

    const deathList = [];

    //then we let our healthy adults breed
    times(plotGrid.length, row => {
      times(plotGrid[row].length, col => {
        if (!plotGrid[row][col].marked) {
          plotGrid[row][col].marked = true;

          //only age buds at the right time of day.
          if (plotGrid[row][col].age < 2 && (trueTime % 3 === 2 || trueTime % 3 === 0)) {
            plotGrid[row][col].age++;
          };

          if (plotGrid[row][col].isFlower && plotGrid[row][col].age === 2) {
            let empties = findEmptyNeighbors(row, col);
            if (empties.length) {
              let pick = empties[rollUpTo(empties.length)];
              if (pick)
                plantFlower(pick.row, pick.col);
              plotGrid[pick.row][pick.col].marked = true;
            } else {
              //Overpopulation - roll to mark flower for death. Sorry dude
              let roll = rollUpTo(gameConfig.resilience);
              // resilience is probably set to something like 4
              // which means roll will be an integer between 0 and 3
              // the flower gets pushed onto the death list if the roll is 0.
              if (!roll)
                deathList.push({row, col});
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
      //the issue may have been resolved by a neighbor's death so let's check again
      let empties = findEmptyNeighbors(deathList[i].row, deathList[i].col);
      if (!empties.length) {
        killFlower(deathList[i].row, deathList[i].col);
      }
    });
  }

  let timeOfDay = "";

  // TODO: this is hideous. Make a component for this weather icon.
  // Make the colors consts also. 

  if (trueTime % 3 === 0) {
    timeOfDay = <WiSunrise size={40} style={{
        backgroundColor: '#d47986',
        padding: '3 2 0 2',
        borderRadius: '10px',
        border: '2px solid white'
      }}/>;
  } else if (trueTime % 3 === 1) {
    timeOfDay = <WiDaySunny size={40} style={{
        backgroundColor: '#dbbd72',
        padding: '3 2 0 2',
        borderRadius: '10px',
        border: '2px solid white'
      }}/>;
  } else if (trueTime % 3 === 2) {
    timeOfDay = <WiNightAltPartlyCloudy size={40} style={{
        backgroundColor: '#739cde',
        padding: '3 2 0 2',
        borderRadius: '10px',
        border: '2px solid white'
      }}/>;
  }

  let infoTextStyle = {
    fontSize: '14px',
    margin: '2em'
    };

  const [drawerOpen, setDrawerOpen] = useState(false);

  const goals = [
    {
      name: "React Hooks",
      description: "This game is made up of entirely functional components. Becoming fluent with Hooks was my priority in creating it.",
      checked: true
    },
    {
      name: "Material UI",
      description: "I was raised on Bootstrap and I'm excited to graduate to a more professional looking interface starter. I have opinions about Material, but I'm mostly a fan!",
      checked: true
    },
    {
      name: "React Router",
      description: false,
      checked: true
    },
    {
      name: "Jest",
      description: "I understand that testing the front end can save you big money in the long run but I am rusty! Looking forward to hanging onto this extremely valuable habit.",
      checked: false
    },
    {
      name: "React Context",
      description: "I have some experience with Redux but I'm under the impression that Context can offer a lot of the same benefits with less developing time.",
      checked: false
    }
  ]

  return (<ThemeProvider theme={theme}>
    <Router>
      <TopBar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}/>
      <Switch>
        <Route path="/about">
          <Card style={{margin: "2em", padding: "4em"}}>
          <h1>About</h1>
            <p>{'This toy-game-thing was born out of an appreciation for hexagons, cellular automata, and Animal Crossing.'}</p>
            <p>{'I wanted to implement a few technologies I had not gotten the chance to play with yet, including:' }</p>
            <List>
            {goals.map( (goal, i) => {
              return (
              <ListItem key={'goal'+i}>
              <ListItemIcon>
                { goal.checked &&
                  <CheckBoxIcon />}
                  { !goal.checked &&
                  <CheckBoxOutlineBlankIcon />
                  }
              </ListItemIcon>
              <ListItemText
                primary={goal.name}
                secondary={goal.description}
              />
           </ListItem>
           )
              
            })}
            </List>
            <br /><p>{'- Shel, Front End Developer'}</p>
            <a href="https://www.linkedin.com/in/shel-keller/">(My LinkedIn profile)</a>
            </Card>
        </Route>
          <Route path={["/", "/tiny-collector"]}>
          <div className="App" style={{paddingTop: "4em"}}>
            <header className="App-header">
              <Fab variant="extended" color="primary" onClick={() => {
                  step();
                }} style={{
                  margin: "1em"
                }}>
                <UpdateIcon/>
              </Fab>
              <div style={infoTextStyle}>
                <p>{'Refresh the page if you see no flowers.'}</p>
                <p>{'Proceed time with the button above. Click flowers to collect them.'}</p>
                <p>{'Overcrowded flowers might die.'}</p>
                <p>{'Coming soon: color breeding!'}</p>
              </div>

              <p>{timeOfDay}</p>
              <p>
                {'Day ' + displayTime}
              </p>
              <Inventory flowerHues={flowerHues} items={inventory} setItems={setInventory}/> 
              {
              /*
              I get that it would probably be a good idea to
              have another component called PlotGrid or something
              but really all it would do is wrap this set of PlotRows
              in a div with this className. and that just isn't enough
              stuff to justify a whole file or even its own variable
              I think
              */
              }
              <div className="honeycomb" style={{
                  paddingTop: "2em"
                }}>
                {
                  plotGrid.map((plotRow, i) => {
                    return <PlotRow plots={plotRow} gridState={plotGrid} gridStateSetter={setPlotGrid} inventoryState={inventory} inventoryStateSetter={setInventory}/>
                  })
                }
              </div>
            </header>

          </div>
        </Route>
      </Switch>
      <MenuDrawer open={drawerOpen} setOpen={setDrawerOpen}/>
    </Router>
  </ThemeProvider>);
}

export default App;
