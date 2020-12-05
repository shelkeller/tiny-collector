
function PlotRow(props){
  return (
    <div className="ibws-fix">
    {
      props.plots.map((plot, i)=>{

        let theClass = "hexagon "+plot.content;
        return (
          <div key={"key"+i} className={theClass}>
            <div className="hexagontent">
              {plot.content}
            </div>
          </div>
        )
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
