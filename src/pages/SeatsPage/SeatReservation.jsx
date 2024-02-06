import { useState } from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export default function({reservados, setSucesso, sessao}) {
    const [form, setForm] = useState({ name: "", cpf: "" })
    const navigate = useNavigate()

    function formulario(e){
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    function finalizarCompra(e){
        e.preventDefault()
        const ids = reservados.map((seat) => seat.id)
        const body = { ...form, ids }

        axios.post(`${import.meta.env.VITE_API_URL}/movies/seats/book-many`, body)
            .then(res => {
                const infos = {
                    filme: sessao.movie.title,
                    data: sessao.day.date,
                    hora: sessao.name,
                    nome: form.name,
                    cpf: form.cpf,
                    seats: reservados.map((seat) => seat.name)
                }
                setSucesso(infos)
                navigate("/sucesso")
            })
            .catch(err => alert(err.responde.data.message))
    }

    return (
        <>
            <FormContainer onSubmit={finalizarCompra}>
                    Nome do Comprador:
                    <input 
                        placeholder="Digite seu nome..." 
                        data-test="client-name"
                        name="name"
                        value={form.name}
                        onChange={formulario}
                        required
                    />

                    CPF do Comprador:
                    <input 
                        placeholder="Digite seu CPF..." 
                        data-test="client-cpf"
                        name="cpf"
                        value={form.cpf}
                        onChange={formulario}
                        required
                    />

                    <button
                        style={{ 
                            textDecoration: "none",
                            alignSelf: "center",
                        }} 
                        type="submit" 
                        data-test="book-seat-btn"
                    >
                        Reservar Assento(s)
                    </button>
            </FormContainer>
        </>
    )
}

const FormContainer = styled.form`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`