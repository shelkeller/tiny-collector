import logo from './logo.svg';
import './App.css';
import HexagonGrid from 'react-hexagon-grid';
import times from 'lodash/times';
import LocalFloristRounded from "@material-ui/icons/LocalFloristRounded";


function roll(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const generatePlots = (size) => {
  let plots = [];
  times(size, id => {
      let dice = roll(100);
      if (dice<=3){
        plots[id] = { id: id, isFlower: true, name: "flower"};
      } else {
        plots[id] = {id: id, isFlower: false, name: "grass"};
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

  let hexagons = generatePlots(102);

  return (
    <HexagonGrid
    gridWidth={600}
    gridHeight={600}
    hexagons={hexagons}
    hexProps={getHexProps}
    renderHexagonContent={renderHexagonContent}
    />
  );
}

function App() {
  return (
    <>
    <div className="App">
      <header className="App-header">
      <div>
      <HexGridDemo />
      </div>
        <p>
          TINY COLLECTOR
        </p>
      </header>
    </div>
    </>
  );
}

export default App;
