import Plot from "./Plot";
import { rollUpTo, generateDeadPlot } from './../../utils/dice';
import { grassColors } from './../../constants/colors';


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
    gridState[plot.row][plot.col] = generateDeadPlot({x: plot.row, y:plot.col, id: plot.id });
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
