//import reactLogo from "./assets/react.svg"
//import viteLogo from "/vite.svg"

import Triathlon from "./model/triathlon.js"
import Stopwatch from "./model/stopwatch.js"
import TriathlonViewModel from "./viewmodel/triathlon_viewmodel.js"
import TriathlonView from "./view/triathlon_view.jsx"
import TriathlonDB from "./model/database.js"

function App() {
  const db = new TriathlonDB('triathlonDB')
  const timer = new Stopwatch()
  const triathlon = new Triathlon(db)
  const viewModel = new TriathlonViewModel(triathlon,timer)

  return (
    <div className="row">
      <TriathlonView 
        onInit={viewModel.init}
        onClear={viewModel.clear}
        onCache={viewModel.cache}
        onAdd={viewModel.add}
        onDisplay={viewModel.display}
        onSearch={viewModel.search}
        onCheck={viewModel.validate}
        onProcess={viewModel.process}
        onAverage={viewModel.average}
      />
    </div>
  )
}

export default App
