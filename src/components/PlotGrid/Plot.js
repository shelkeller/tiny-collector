import LocalFlorist from "@material-ui/icons/LocalFlorist";
import SpaIcon from '@material-ui/icons/Spa';
import Tooltip from '@material-ui/core/Tooltip';

const Plot = props => {
  let plot = props.plot;
  let handleClick = props.handleClick;
  let classy = "hexagon "+plot.content;
  let content = "";
  let color = ""

  if (plot.isFlower && plot.age >=1 ) {
    color = plot.flowerColor;
    content = <LocalFlorist />
  };
  if (plot.isFlower && plot.age < 1 ){
    color = plot.budColor;
    content = <SpaIcon />;
  }

  if (!plot.isFlower){
    color = plot.color;
  }

  let tooltipContent = <p style={{fontSize: 14}}>{plot.row}, {plot.col}</p>
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
