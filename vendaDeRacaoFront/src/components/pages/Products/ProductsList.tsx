import axios from "axios"
import { useEffect, useState } from "react"
import { CATALOGO_URL } from "../../../../shareUrl"
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { Alert, Button, Modal, Snackbar, } from "@mui/material";

interface ProductsType {
    id: string;
    nome: string;
    preco: string;
    disponibilidade: number;
}

interface CompleteProductType {
    id: string;
    nome: string;
    preco: string;
    disponibilidade: number;
    descricao: string;
    peso: string;
    tipo: string;
}
const initialCompleteProduct: CompleteProductType = {
    id: '',
    nome: '',
    preco: '',
    disponibilidade: 0,
    descricao: '',
    peso: '',
    tipo: '',
}


export default function ProductsList() {

    const [products, setProducts] = useState<ProductsType[]>([])
    const [completeProduct, setCompleteProduct] = useState<CompleteProductType>(initialCompleteProduct)
    const [successSnackbar, setSuccessSnackbar] = useState(false)

    const [modal, setModal] = useState(false)


    function handleCloseModalProductsList() { setModal(false) }
    function handleCloseSnackbar() { setSuccessSnackbar(false) }

    useEffect(() => {
        try {

            async function getProducts() {
                const response = await axios.get(`${CATALOGO_URL}/produtos`)
                const responseData = response.data
                setProducts(responseData)
            }
            getProducts()
        } catch {
            console.log('erro na listagem de produtos')
        }
    }, [])



    const toStorageCart = (id: string) => {
        const carrinhoLocal = localStorage.getItem("carrinho")
        const carrinhoAtual: string[] = carrinhoLocal ? JSON.parse(carrinhoLocal) : []

        if (completeProduct && !carrinhoAtual.includes(id)) {
            const novoCarrinho = [...carrinhoAtual, id]
            localStorage.setItem("carrinho", JSON.stringify(novoCarrinho))
        }
        setSuccessSnackbar(true)
        setModal(false)
        setCompleteProduct(initialCompleteProduct)
        window.dispatchEvent(new Event("storage"))
    }

    function viewProdutc(item: string) {
        try {
            async function getProducts() {
                const response = await axios.get(`${CATALOGO_URL}/produtos/${item}`)
                const responseData = response.data
                setCompleteProduct(responseData)
            }
            getProducts()
            setModal(true)
        } catch {
            console.log('erro na listagem de produtos')
        }
    }

    return (
        <>
            <Paper elevation={3} className="p-5 m-5">

                <p>Lista de Usuários</p>

                <TableContainer component={Paper}>
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>

                                <TableCell align="left" className="w-2/12">NOME</TableCell>
                                <TableCell align="left" className="w-1/12">PREÇO</TableCell>
                                <TableCell align="left" className="w-1/12">ACESSAR PRODUTO</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.filter((product) => product.disponibilidade == 1).map((row) => (
                                <TableRow
                                    key={row.id}
                                    className="hover:bg-black"
                                >

                                    <TableCell align="left">{row.nome}</TableCell>
                                    <TableCell align="left">{row.preco}</TableCell>
                                    <TableCell align="left"><>

                                        <Button onClick={() => viewProdutc(row.id)}>ACESSAR</Button>

                                    </></TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Paper>


            <Modal
                open={modal}
                onClose={handleCloseModalProductsList}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className="flex place-self-center p-10">
                    <Paper className="p-10">

                        <p className="text-2xl">{completeProduct?.nome}</p>

                        <p className="p-10">{completeProduct?.descricao}</p>
                        <div className=" flex justify-between divide-x p-5">
                            <p className="p-1">Tipo: {completeProduct?.tipo}</p>
                            <p className="p-1">Peso: {completeProduct?.peso}</p>
                            <p className="p-1">Valor: {completeProduct?.preco}</p>
                        </div>
                        <Button className="flex place-self-center w-full" onClick={() => toStorageCart(completeProduct?.id || '')} variant="outlined">Adicionar ao Carrinho</Button>
                    </Paper>
                </div>
            </Modal>

            <Snackbar open={successSnackbar} autoHideDuration={1000} onClose={handleCloseSnackbar}>
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Item Adicionado ao Carrinho!
                </Alert>
            </Snackbar>
        </>
    )
}