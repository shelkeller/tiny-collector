import LocalFlorist from "@material-ui/icons/LocalFlorist";
import Tooltip from '@material-ui/core/Tooltip';

const Plot = props => {
  let plot = props.plot;
  let handleClick = props.handleClick;
  let classy = "hexagon "+plot.content;
  let color = plot.color;
  let content = "";

  if (plot.isFlower) content = <LocalFlorist />;

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
