import logo from './logo.svg';
import './App.css';
import HexagonGrid from 'react-hexagon-grid';
import times from 'lodash/times';
import LocalFloristRounded from "@material-ui/icons/LocalFloristRounded";
import PlotRow from './components/PlotGrid';

// returns an integer between 0 and max
function roll(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//returns a list of "plot" objects: {id, isFlower, name}
const generatePlots = (size) => {
  let plots = [];
  times(size, id => {
      let dice = roll(100); // roll a 100 sided die
      if (dice<=10){ // around a 10 percent chance of rolling a flower
        plots[id] = { id: id, isFlower: true, content: "flower"};
      } else {
        plots[id] = {id: id, isFlower: false, content: "grass"};
      }
  });
  return plots;
}

function App() {
  const rowSize = 9;
  const plots2D = [];
  let hexagons = generatePlots(rowSize*(rowSize-1));

  while(hexagons.length) plots2D.push(hexagons.splice(0, rowSize));

  times(plots2D.length, index => {
    times(plots2D[index].length, index2 => {
      plots2D[index][index2].row = index;
      plots2D[index][index2].column = index2;
    });
  });

  return (
    <>
    <div className="App">
      <header className="App-header">
      tiny collector
      <div className="honeycomb" style={{paddingTop: "50px"}}>
        {plots2D.map((plots, i) => {
          return <PlotRow plots={plots} />
        })}
      </div>
      </header>
    </div>
    </>
  );
}

export default App;
