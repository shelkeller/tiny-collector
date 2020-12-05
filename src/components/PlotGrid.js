import { makeStyles } from "@material-ui/core/styles";
import LocalFloristRounded from "@material-ui/icons/LocalFloristRounded";

function Plot(props){
  let plot = props.plot;
  let classy = "hexagon "+plot.content;
  console.log(plot);
  let grassOptions = ["#42796c",
"#3a514c",
"#185653"]

  let flowerOptions = ["#9f1f2b",
"#e88f00",
"#e0c55f",
"#7ddf84",
"#00c0cd",
"#9e7af0"]

  let color = grassOptions[Math.floor(Math.random() * Math.floor(3))]
  let content = <><p>{plot.row}</p>
  <p>{plot.column}</p></>
  if (plot.isFlower){
    color = flowerOptions[Math.floor(Math.random() * Math.floor(7))]
    content = <LocalFloristRounded />;
  }



  return (
    <div key={"key"+props.key} className={classy} style={{backgroundColor: color}} >
      <div className="hexagontent">
        {content}
      </div>
    </div>
  )

}

function PlotRow(props){

  return (
    <div className="ibws-fix">
    {
      props.plots.map((plot, i)=>{
        return <Plot key={"key"+i} plot={plot} />
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
