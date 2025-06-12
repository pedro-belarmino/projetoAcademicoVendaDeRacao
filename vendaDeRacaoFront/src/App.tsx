import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./views/Home"
import User from "./views/User"
import Order from "./views/Order"
import Payment from "./views/Payment"
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Template from "./views/Template"
import Products from "./views/Products"
import Login from "./views/Login"
import Succeess from "./views/Success"

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});


function App() {

    return (
        <div className="w-full">
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Template />}>
                            <Route path='/home' element={<Home />} />
                            <Route path='/usuario' element={<User />} />
                            <Route path='/pedido' element={<Order />} />
                            <Route path='/pagamento' element={<Payment />} />
                            <Route path='/produtos' element={<Products />} />
                            <Route path='/*' element={<><p className="text-red-200 p-4 bg-red-900 rounded-4xl m-10 border border-red-700">ROTA INVALIDA</p></>} />
                        </Route>
                        <Route path='/login' element={<Login />} />
                        <Route path='/feche-essa-aba' element={<Succeess />} />

                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    )
}

export default App
