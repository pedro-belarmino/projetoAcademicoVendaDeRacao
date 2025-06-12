import { Badge, Paper } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Toolbar from '@mui/material/Toolbar';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATALOGO_URL } from '../../../shareUrl';

interface Produto {
    id: string;
    nome: string;
    preco: number;
    disponibilidade: number;
    descricao: string;
    peso: string;
    tipo: string;
}
export default function NavBar() {

    const navigate = useNavigate()

    const [produtosCarrinho, setProdutosCarrinho] = useState<Produto[]>([])

    const [modal, setModal] = useState<boolean>(false)
    const [qtdCarrinho, setQtdCarrinho] = useState(0)
    const [emptyCart, setEmptyCart] = useState(false)

    function handleCloseModalNavBar() { setModal(false) }

    useEffect(() => {
        const atualizarCarrinhoDoStorage = () => {
            const carrinhoLocal = localStorage.getItem("carrinho");
            const carrinhoAtual: string[] = carrinhoLocal ? JSON.parse(carrinhoLocal) : [];
            setQtdCarrinho(carrinhoAtual.length);
        };

        atualizarCarrinhoDoStorage();

        window.addEventListener("storage", atualizarCarrinhoDoStorage);

        return () => {
            window.removeEventListener("storage", atualizarCarrinhoDoStorage);
        };
    }, []);

    async function fetchStorageCart() {
        const carrinhoLocal = localStorage.getItem("carrinho");
        const carrinhoAtual: string[] = carrinhoLocal ? JSON.parse(carrinhoLocal) : [];

        if (carrinhoAtual.length === 0) {
            setEmptyCart(true);
            setProdutosCarrinho([]);
            return;
        }

        setEmptyCart(false);

        try {
            const responses = await Promise.all(
                carrinhoAtual.map(id =>
                    fetch(`${CATALOGO_URL}/produtos/${id}`).then(res => res.json())
                )
            );
            setProdutosCarrinho(responses);
            setModal(true)
        } catch (error) {
            console.error("Erro ao buscar produtos do carrinho", error);
        }
    }


    function handleLimparCarrinho() {
        localStorage.removeItem('carrinho');
        setQtdCarrinho(0);
        setProdutosCarrinho([]);
        setEmptyCart(true);
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar variant="dense" className='flex justify-between'>
                        <div className='space-x-4 flex'>
                            <div>
                                <Button variant='outlined' href="/produtos">Produtos</Button>
                            </div>
                            <div>
                                <Button variant='outlined' href="/usuario">Usuarios</Button>
                            </div>
                        </div>
                        <div onClick={fetchStorageCart}>
                            <Badge badgeContent={qtdCarrinho}>
                                <svg className="h-6 w-6 place-self-center hover:text-sky-200 cursor-pointer text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="9" cy="21" r="1" />  <circle cx="20" cy="21" r="1" />
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                                </svg>
                            </Badge>
                        </div>
                    </Toolbar>
                </AppBar>
            </Box>
            <Modal
                open={modal}
                onClose={handleCloseModalNavBar}
            >
                <Paper className="bg-slate-200 w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl lg:min-w-[600px] 2xl:max-w-4xl mx-auto mt-10 rounded-xl p-5">

                    <div className='flex justify-between'>
                        <p className='text-xl font-semibold place-self-center'>Seu Carrinho</p>
                        <div className='p-2 cursor-pointer hover:bg-slate-300 rounded-xl' onClick={() => setModal(false)}>

                        </div>
                    </div>

                    {emptyCart && (
                        <Paper className='p-10 flex items-center place-self-center'>
                            <p className='text-gray-600 text-center text-xl'>Carrinho Vazio</p>
                            <svg className="h-5 w-5 text-gray-600 m-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </Paper>
                    )}

                    {emptyCart == false && (
                        <>

                            <Paper className="my-4 max-h-96 overflow-y-auto space-y-4">
                                {produtosCarrinho.map(produto => (
                                    <Paper key={produto.id} className="flex items-center m-2 place-self=-center space-x-4 bg-white p-3 rounded shadow">
                                        <div className="flex flex-col">
                                            <p className="font-medium">{produto.nome}</p>
                                            <p className="text-sm text-gray-600">R$ {produto.preco.toFixed(2)}</p>
                                        </div>
                                    </Paper>
                                ))}
                            </Paper>


                            <div className='flex justify-between'>
                                <Button variant="outlined" onClick={handleLimparCarrinho}>Limpar Carrinho</Button>
                                <Button variant="contained" color="success" onClick={() => { setModal(false); navigate('/pagamento') }}>Confirmar Compra</Button>
                            </div>
                        </>
                    )}
                </Paper>
            </Modal>
        </>
    )
}


