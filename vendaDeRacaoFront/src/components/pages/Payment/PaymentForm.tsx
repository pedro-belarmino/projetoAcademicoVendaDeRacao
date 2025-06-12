import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { CATALOGO_URL, PAGAMENTO_URL } from "../../../../shareUrl";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState, type JSXElementConstructor, type Key, type ReactElement, type ReactNode, type ReactPortal } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";

export default function PaymentForm() {

    const [products, setProducts] = useState<any>([])
    const navigate = useNavigate()

    useEffect(() => {
        const sotageCartIds: string[] = JSON.parse(localStorage.getItem("carrinho") || "[]")

        const fetchProducts = async () => {
            const response = await axios.get(`${CATALOGO_URL}/produtos`)
            const selecionados = response.data.filter((p: any) => sotageCartIds.includes(p.id))
            setProducts(selecionados)
        }
        fetchProducts()
    }, [])


    async function payment() {
        try {
            await axios.post(`${PAGAMENTO_URL}/pagamento/1`)
            localStorage.removeItem('carrinho')
            navigate('/feche-essa-aba')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Paper className="p-5 m-5 w-11/12 place-self-center" elevation={3}>

                <p className="text-center text-3xl font-semibold">Faça seu Pagamento</p>
                <div className="flex justify-around">
                    <div className="flex w-5/12">

                        <Box flex={1}>
                            <>
                                <Typography variant="h5" gutterBottom>
                                    Itens no Carrinho
                                </Typography>
                                <Box display="flex" flexDirection="column" gap={2}>
                                    {products.map((produto: { id: Key | null | undefined; nome: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; preco: number; }) => (
                                        <Card key={produto.id} sx={{ display: "flex", alignItems: "center" }}>
                                            <CardContent sx={{ flexGrow: 1 }}>
                                                <Typography variant="subtitle1" noWrap>
                                                    {produto.nome}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    R$ {produto.preco.toFixed(2)}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </Box>
                            </>
                        </Box>
                    </div>
                    <div className="flex w-5/12">

                        <Paper className="p-5 m-5 flex space-y-5 flex-col" elevation={3}>

                            <div className="w-full"><TextField className="w-full" label='Nome Completo' /></div>
                            <div className="w-full"><TextField className="w-full" label='Telefone' /></div>
                            <div className="w-full"><TextField className="w-full" label='E-mail' /></div>



                        </Paper>

                        <Paper className="p-5 m-5 flex space-y-5 flex-col" elevation={3}>


                            <div className="w-full"><TextField className="w-full" label='Número do Cartão' /></div>
                            <div className="w-full"><TextField className="w-full" label='Código de Segunrança' /></div>
                            <div className="w-full"><TextField className="w-full" label='Endereço de Entrega' /></div>



                        </Paper>
                    </div>
                </div>
                <Button className="w-full" onClick={payment} variant="outlined">Enviar</Button>
            </Paper>
        </>
    )
}