import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import ReactDOM  from 'react-dom/client'
import { store } from "./redux/store.js";
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)
