import LocalFlorist from "@material-ui/icons/LocalFlorist";
import SpaIcon from '@material-ui/icons/Spa';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Tooltip from '@material-ui/core/Tooltip';
import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';

import OptionsDialog from "./../OptionsDialog";



const Plot = props => {
  let { plot, handleClick, performGather } = props;
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

  let plotTitle = plot.isFlower ? plot.flowerColorName + " Flower" : "Empty Plot";
  let tooltipContent = <><p>{plotTitle}</p><p style={{fontSize: 14}}>{plot.row}, {plot.col}</p></>;
  let plotStyle = { backgroundColor: color };


  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("delete");


const onClose = (selectedAction, plot) => {
  setOpen(false);
  setSelectedValue(selectedAction);
  if (selectedAction==="gather") performGather(plot);
};

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
