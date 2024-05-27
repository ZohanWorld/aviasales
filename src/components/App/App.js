import './App.scss'
import { Provider } from 'react-redux'

import MainContent from '../main-content/main-content'
import LogoIcon from '../../img/Logo.svg'
import AsideFilter from '../aside-filter/aside-filter'
import { store } from '../../store/index'

function App() {
  return (
    <div className="App">
      <header className="header">
        <img src={LogoIcon} alt="logo" />
      </header>
      <Provider store={store}>
        <div className="wrapper">
          <AsideFilter />
          <MainContent />
        </div>
      </Provider>
    </div>
  )
}

export default App
