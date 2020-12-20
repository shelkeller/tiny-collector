import { useState } from "react";
import Plot from "./Plot";

const PlotRow = (props) => {
  const plots = props.plots;
  const gridState = props.gridState;
  const gridStateSetter = props.gridStateSetter;

  const handleClick = (id) => {
    let thePlot = plots.filter((plot) => {return plot.id === id})[0];
    console.log(thePlot);
  }

  return (
    <div className="ibws-fix">
    {
      plots.map((plot, i)=>{
        return <Plot key={"key"+i} plot={plot} handleClick={handleClick} />
      })
    }
    </div>
  )
}
export default PlotRow;
