import React from 'react'
import Header from './components/headers/Header'
import { BrowserRouter } from 'react-router-dom'
import Pages from './components/mainpages/Pages'
import { DataProvider } from './GlobalState'

const App = () => {
  return (

    <DataProvider>
    <BrowserRouter>
    <div className='App'>
      <Header/>
      <Pages/>
    </div>
    </BrowserRouter>
    </DataProvider>
  )
}

export default App
