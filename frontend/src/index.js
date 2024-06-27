import ReactDom from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import StoreContextProvider, { StoreContext } from './Context/StoreContext'
const root = ReactDom.createRoot(document.getElementById('root'))
root.render(
<BrowserRouter>
<StoreContextProvider>
<App />
</StoreContextProvider>

</BrowserRouter>

)