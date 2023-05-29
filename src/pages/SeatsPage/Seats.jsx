import { useEffect, useState } from "react"
import styled from "styled-components"

export default function Seats({ seat, chooseSeat, foiReservado }) {
    const [estado, setEstado] = useState("selecionado")
    const { id, isAvailable, name } = seat

    useEffect(() => {
        if (foiReservado) {
            setEstado("selecionado")
        } else if (isAvailable) {
            setEstado("disponível")
        } else {
            setEstado("indisponível")
        }
    }, [foiReservado])


    return (
        <SeatItem data-test="seat" onClick={chooseSeat} estado={estado}>{name}</SeatItem>
    )
}

const SeatItem = styled.div`
    border: 1px solid ${(props) => {
        if(props.estado === "selecionado"){
            return "#0E7D71"
        } else if(props.estado === "disponível"){
            return "#7B8B99"
        } else {
            return "#F7C52B"
        }
    }};
    background-color: ${(props) => {
        if(props.estado === "selecionado"){
            return "#1AAE9E"
        } else if(props.estado === "disponível"){
            return "#C3CFD9"
        } else {
            return "#FBE192"
        }
    }};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`