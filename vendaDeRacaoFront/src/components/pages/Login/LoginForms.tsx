import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useState } from "react";
import { USUARIO_URL } from "../../../../shareUrl";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

interface UserType {
    email: string;
    password: string;
}
const initialUser: UserType = {
    email: "",
    password: ""
}



export default function LoginForm() {

    const [user, setUser] = useState<UserType>(initialUser)
    const [successSnackbar, setSuccessSnackbar] = useState(false)
    const [userName, setUserName] = useState('')
    const navigate = useNavigate()

    function handleCloseSnackbar() { setSuccessSnackbar(false) }

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = e.target
        let newValue = value

        setUser((prevState) => ({
            ...prevState,
            [name]: newValue
        }))
    }

    async function login() {
        try {
            const response = await axios.post(`${USUARIO_URL}/usuarios/login`, {
                email: user.email,
                senha: user.password,
            })
            setUserName(response.data.nome)
            setSuccessSnackbar(true)
            setTimeout(() => {
                navigate('/produtos')
            }, 2500)
        } catch (error) {
            console.log('erro no login')
        }
    }

    return (
        <>        <div className="flex m-5 place-self-center">
            <Paper className="p-5 m-5">
                <p className="text-xl font-semibold p-5 text-center underline">Login</p>
                <div className="flex flex-col space-y-5">

                    <div>
                        <TextField label="E-mail" name='email' value={user.email} onChange={handleChange} />
                    </div>
                    <div>
                        <TextField label="Senha" name='password' value={user.password} onChange={handleChange} />
                    </div>
                    <Button variant="contained" onClick={login}>Entrar</Button>
                </div>
            </Paper>
        </div>
            <Snackbar open={successSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Bem vindo, {userName}!
                </Alert>
            </Snackbar>
        </>

    )
}