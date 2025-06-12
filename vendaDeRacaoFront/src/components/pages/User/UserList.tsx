import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import axios from "axios";
import { useEffect, useState } from "react";
import { USUARIO_URL } from "../../../../shareUrl";

interface userType {
    id: string;
    nome: string;
    email: string
}

export default function UserList() {

    const [user, setUser] = useState<userType[]>([])

    useEffect(() => {
        async function getUsers() {
            try {
                const response = await axios.get(`${USUARIO_URL}/usuarios/listar`)
                const responseData = response.data;
                setUser(responseData)
            } catch (error) {
                console.log('erro listagem dos usuarios')
            }
        }
        getUsers()
    }, [])


    return (
        <>
            <Paper elevation={3} className="p-5 m-5">

                <p>Lista de Usuários</p>

                <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="right">NOME</TableCell>
                                <TableCell align="right">E-MAIL</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {user.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.id}
                                    </TableCell>
                                    <TableCell align="right">{row.nome}</TableCell>
                                    <TableCell align="right">{row.email}</TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Paper>
        </>
    )
}