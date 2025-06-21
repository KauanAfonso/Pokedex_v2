import { useState } from 'react'
import { RouteComp } from '../routes/RouteComp'
import { BrowserRouter } from "react-router-dom";

function App() {
  return(
    <BrowserRouter>
      <RouteComp/>
    </BrowserRouter>
  )
}

export default App
