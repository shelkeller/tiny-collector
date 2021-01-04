import LocalFlorist from "@material-ui/icons/LocalFlorist";
import SpaIcon from '@material-ui/icons/Spa';
import Tooltip from '@material-ui/core/Tooltip';
import { useState } from "react";

import OptionsDialog from "./../OptionsDialog";

// One cell in the grid, set up to reflect the contents
// of a member of the grid state.
// There is some extra stuff in here for opening a Dialog
// currently not being implemented.

const Plot = props => {
  let { plot, handleClick, performGather } = props;
  let classy = "hexagon "+plot.content;
  let content = "";
  let color = ""

  if (plot.isFlower && plot.age >=1 ) {
    color = plot.flowerHex;
    content = <LocalFlorist />
  };
  if (plot.isFlower && plot.age < 1 ){
    color = plot.budColor;
    content = <SpaIcon />;
  }

  if (!plot.isFlower){
    color = plot.color;
  }

  //Tooltip currently shows coordinates for debugging purposes
  //In the future it will give important information during
  //accessibility mode 
  let plotTitle = plot.isFlower ? plot.flowerColorName + " Flower" : "Empty Plot";
  let tooltipContent = <><p>{plotTitle}</p><p style={{fontSize: 14}}>{plot.row}, {plot.col}</p></>;
  let plotStyle = { backgroundColor: color };


  //dialog stuff
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("delete");


const onClose = (selectedAction, plot) => {
  setOpen(false);
  setSelectedValue(selectedAction);
  if (selectedAction==="gather") performGather(plot);
};

//end dialog stuff

  return (
    <>
    <Tooltip title={tooltipContent} arrow>
    <div className={classy} style={plotStyle} onClick={()=>{
        if (plot.isFlower && plot.age >=1) performGather(plot)
    }} >
      <div className="hexagontent">
        {content}
      </div>
    </div>
    </Tooltip>
    { plot.isFlower && plot.age &&
      <OptionsDialog onClose={onClose} title={plotTitle} open={open} selectedValue={selectedValue} selectedPlot={plot} />
    }

      </>
  )

}
export default Plot;
