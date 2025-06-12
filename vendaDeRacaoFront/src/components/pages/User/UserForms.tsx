import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { USUARIO_URL } from "../../../../shareUrl";


interface userType {
    name: string;
    email: string;
    password: string;
}

const initialUser: userType = {
    name: '',
    email: '',
    password: ''
}

export default function UserForms() {
    const [user, setUser] = useState<userType>(initialUser)

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = e.target
        let newValue = value

        setUser((prevState) => ({
            ...prevState,
            [name]: newValue
        }))
    }

    async function save() {
        let url = `${USUARIO_URL}/usuarios/cadastrar`
        console.log('salvar')
        try {
            const response = await axios.post(url,
                {
                    nome: user.name,
                    email: user.email,
                    senha: user.password
                }
            )
            console.log(response.status)
            setUser(initialUser)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="border p-5 m-5 rounded-xl space-y-5">

            <p>Usuário</p>dad

            <div className="flex flex-col space-y-5">
                <div>
                    <TextField label='Nome' onChange={handleChange} name="name" value={user.name} />
                </div>
                <div>
                    <TextField label='E-mail' onChange={handleChange} name="email" value={user.email} />
                </div>
                <div>
                    <TextField label='Senha' onChange={handleChange} name="password" value={user.password} />
                </div>
            </div>

            <Button variant="outlined" onClick={save}>Salvar</Button>

        </div>
    )
}