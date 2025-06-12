export default function Succeess() {
    return (
        <>
            <div className="p-10 text-center flex flex-col w-8/12 rounded-3xl place-self-center m-20 bg-white text-black">
                <svg className="h-10 w-10 text-black place-self-center m-3"
                    width="24" height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2" stroke="currentColor"
                    fill="none" strokeLinecap="round"
                    strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" />  <rect x="4" y="4" width="16" height="16" rx="2" />  <path d="M9 12l2 2l4 -4" /></svg>
                <div className="  underline bg-green-500 text-center shadow font-semibold text-2xl p-4 rounded-lg mt-5 mb-5">
                    <p>PEDIDO FEITO COM SUCESSO!</p>




                </div>
                <div className="mb-5 text-lg font-semibold">
                    <p>Cheque seu e-mail para mais informações.</p>
                </div>
            </div>
        </>
    )
}