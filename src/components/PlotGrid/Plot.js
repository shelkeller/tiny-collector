import LocalFloristRounded from "@material-ui/icons/LocalFloristRounded";
import Tooltip from '@material-ui/core/Tooltip';

const Plot = (props) => {
  let plot = props.plot;
  let plots = props.plots;
  let setPlots = props.setPlots;
  let classy = "hexagon "+plot.content;


  let color = plot.color;
  let content = "";

  if (plot.isFlower) content = <LocalFloristRounded />;


  let handleClick = (id) => {
    let thePlot = plots.filter((plot) => {return plot.id === id})[0];
    console.log(thePlot);
  }


  let tooltipContent = <p style={{fontSize: 14}}>{plot.name}</p>
  let plotStyle = { backgroundColor: color };
  return (
    <Tooltip title={tooltipContent} arrow>
    <div className={classy} style={plotStyle} onClick={()=>{
      handleClick(plot.id);
    }} >
      <div className="hexagontent">
        {content}
      </div>
    </div>
    </Tooltip>
  )

}
export default Plot;
