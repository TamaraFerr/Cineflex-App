import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import SeatReservation from "./SeatReservation"
import Seats from "./Seats"

export default function SeatsPage() {
    const {idSessao} = useParams()
    const [sessao, setSessao] = useState()
    const [reservados, setReservados] = useState([])
    const URL = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`

    useEffect(() => {
        const promise = axios.get(URL)

        promise.then((res) => {
            console.log(res.data)
            setSessao(res.data)
        })
        promise.catch((err) => {console.log(err.response.data)})
    }, [])

    function chooseSeat(seat) {
        if(!seat.isAvailable){
            alert("Esse assento não está disponível")
        } else {
            const foiReservado = reservados.some((seats) => seats.id === seat.id)
            
            if(foiReservado){
               const novaLista = reservados.filter((seats) = seats.id !== seat.id)
               setReservados(novaLista)
            } else {
                setReservados([...reservados, seat])
            }
        }
    }

    if(sessao) {
        return (
            <PageContainer>
                Selecione o(s) assento(s)

                <SeatsContainer>
                    {sessao.seats.map((seat) => (
                        <Seats
                            key={seat.id}
                            seat={seat}
                            chooseSeat={() =>  chooseSeat(seat)}
                            foiReservado = {reservados.some((seats) => seats.id === seat.id)}
                        />
                    ))}
                </SeatsContainer>
                        
                <CaptionContainer>
                    <CaptionItem>
                        <CaptionCircle status={"selecionado"}/>
                        Selecionado
                    </CaptionItem>
                    <CaptionItem>
                        <CaptionCircle status={"disponível"}/>
                        Disponível
                    </CaptionItem>
                    <CaptionItem>
                        <CaptionCircle status={"indisponível"}/>
                        Indisponível
                    </CaptionItem>
                </CaptionContainer>

                <SeatReservation />

                <FooterContainer data-test="footer">
                    <div>
                        <img src={sessao.movie.posterURL} alt={sessao.movie.overview} />
                    </div>
                    <div>
                        <p>{sessao.movie.title}</p>
                        <p>{`${sessao.day.weekday} - ${sessao.name}`}</p>
                    </div>
                </FooterContainer>

            </PageContainer>
        )
    }
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`

const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${(props) => {
        if(props.status === "selecionado"){
            return "#0E7D71"
        } else if(props.status === "disponível"){
            return "#7B8B99"
        } else {
            return "#F7C52B"
        }
    }};
    background-color: ${(props) => {
        if(props.status === "selecionado"){
            return "#1AAE9E"
        } else if(props.status === "disponível"){
            return "#C3CFD9"
        } else {
            return "#FBE192"
        }
    }};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`

const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`