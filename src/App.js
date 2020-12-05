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
      if (dice<=5){ // around a 3 percent chance of rolling a flower
        plots[id] = { id: id, isFlower: true, content: "flower"};
      } else {
        plots[id] = {id: id, isFlower: false, content: "grass"};
      }
  });
  return plots;
}


const HexGridDemo = () =>  {
  const getHexProps = (hexagon) => {
    let fillOptions = ["#86d9b2", "#79c98c", "#a4dec6", "#abd69c"]
    let fill = fillOptions[roll(fillOptions.length)];
    if (hexagon.isFlower){
      fill = "#bf5e69";
    }
    return {
      style: {
        fill: fill,
        stroke: 'none'
      },
      onClick: () => alert(`Hexagon n.${hexagon.id} has been clicked`)
    };
  }

  const renderHexagonContent = (hexagon) => {
    return (
      <>
      {hexagon.isFlower &&
        <LocalFloristRounded/>
      }
      </>
    );
  }

  return (
    <HexagonGrid
    gridWidth={600}
    gridHeight={600}
    hexagons={generatePlots(64)}
    hexProps={getHexProps}
    renderHexagonContent={renderHexagonContent}
    />
  );
}

function App() {
  const rowSize = 8;
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
      <div style={{justifyContent: "center"}}>
      <HexGridDemo />
      </div>
        <p>
          TINY COLLECTOR
        </p>
      </header>
      <div className="honeycomb">
        {plots2D.map((plots, i) => {
          return (
              <PlotRow plots={plots} />
          )
        })}
      </div>
    </div>
    </>
  );
}

export default App;
