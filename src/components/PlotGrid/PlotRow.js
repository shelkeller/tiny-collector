import { useState } from "react";
import Plot from "./Plot";

const PlotRow = (props) => {
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
export default PlotRow;
