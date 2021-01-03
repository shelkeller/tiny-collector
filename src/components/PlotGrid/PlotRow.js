import { useState } from "react";
import Plot from "./Plot";
import { rollUpTo } from './../../utils/dice';
import { grassColors, flowerColors, flowerColorsAccessible, colorNames } from './../../constants/colors';


const PlotRow = props => {

  const {
    plots,
    gridState,
    gridStateSetter,
    inventoryState,
    inventoryStateSetter
  } = props;

  const handleClick = (id) => {
    let thePlot = plots.filter((plot) => {return plot.id === id})[0];
    console.log(thePlot);
  }

  const performGather = (plot) =>{
    let id = plot.id;

    let slotInInventory = inventoryState.findIndex((item) => item.flowerColor === plot.flowerColorId);
    if (slotInInventory > -1) {
      inventoryState[slotInInventory].quantity ++;
      inventoryStateSetter([...inventoryState]);
} else {
    let newSlot = {
        flowerColor: plot.flowerColorId,
        colorName: plot.flowerColorName,
        quantity: 1
    }
    inventoryStateSetter([...inventoryState, newSlot]);
}
    let color = grassColors[rollUpTo(grassColors.length)];
    gridState[plot.row][plot.col] = {
      id: id,
      isFlower: false,
      color: color,
      name: "Empty",
      content: "grass",
      row: plot.row,
      col: plot.col
    };
    gridStateSetter([...gridState]);




  }

  return (
    <div className="ibws-fix">
    {
      plots.map((plot, i)=>{
        return <Plot key={"key"+i} plot={plot} handleClick={handleClick} performGather={performGather} />
      })
    }
    </div>
  )
}
export default PlotRow;
