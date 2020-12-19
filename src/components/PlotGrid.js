import { makeStyles } from "@material-ui/core/styles";
import LocalFloristRounded from "@material-ui/icons/LocalFloristRounded";
import { useState } from "react";
import Tooltip from '@material-ui/core/Tooltip';


function Plot(props){
  let plot = props.plot;
  let plots = props.plots;
  let setPlots = props.setPlots;
  let classy = "hexagon "+plot.content;
  let grassOptions = [
    "#42796c",
    "#3a514c",
    "#185653"
  ]

  let flowerOptions = [
    "#9f1f2b",
    "#e88f00",
    "#e0c55f",
    "#7ddf84",
    "#00c0cd",
    "#9e7af0"
  ]

  let color = grassOptions[Math.floor(Math.random() * Math.floor(3))];
  let filter = "";
  let content = <></>
  if (plot.isFlower){
    color = flowerOptions[Math.floor(Math.random() * Math.floor(7))]
    content = <LocalFloristRounded />;
  }



  let handleClick = (id) => {
    let thePlot = plots.filter((plot) => {return plot.id === id})[0];
    console.log(thePlot);
  }


  let tooltipContent = <p style={{fontSize: 14}}>{"Your ass is " + plot.content}</p>
let myStyle = { backgroundColor: color };
  return (
    <Tooltip title={tooltipContent} arrow>
    <div className={classy} style={myStyle} onClick={()=>{
      handleClick(plot.id);
    }} >
      <div className="hexagontent">
        {content}
      </div>
    </div>
    </Tooltip>
  )

}

function PlotRow(props){
  const [plots, setPlots] = useState(props.plots);

  return (
    <div className="ibws-fix">
    {
      plots.map((plot, i)=>{
        return <Plot key={"key"+i} plot={plot} plots={plots} setPlots={setPlots} />
      })
    }
    </div>
  )
}

function PlotGrid(rowSize, plots) {
  // rowSize * rowSize should equal hexagons.length
  // break hexagons into 2D grid
  const plots2D = [];
  while(plots.length) plots2D.push(plots.splice(0, rowSize));
  return (
    <div className="honeycomb">
      {plots2D.map((plots, i) => {
        <div className="ibws-fix">
          <PlotRow plots={plots} />
        </div>
      })}
    </div>
  )
}

export default PlotRow;
