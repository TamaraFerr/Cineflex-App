import { useState } from "react"
import styled from "styled-components"
import { Form, Link } from "react-router-dom"

export default function() {

    return (
        <form>
            <FormContainer>
                    Nome do Comprador:
                    <input placeholder="Digite seu nome..." data-test="client-name"/>

                    CPF do Comprador:
                    <input placeholder="Digite seu CPF..." data-test="client-cpf"/>

                    <Link to={`/sucesso`}
                        style={{ 
                            textDecoration: "none",
                            alignSelf: "center",
                        }}
                    >
                        <button data-test="book-seat-btn">Reservar Assento(s)</button>
                    </Link>
            </FormContainer>
        </form>
    )
}

const FormContainer = styled.div`
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