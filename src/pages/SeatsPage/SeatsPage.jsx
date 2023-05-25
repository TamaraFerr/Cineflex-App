import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import SeatReservation from "../../components/SeatReservation"

export default function SeatsPage() {
    const {idSessao} = useParams()
    const [sessao, setSessao] = useState()
    const URL = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`

    useEffect(() => {
        const promise = axios.get(URL)

        promise.then((res) => {
            console.log(res.data)
            setSessao(res.data)
        })
        promise.catch((err) => {console.log(err.response.data)})
    }, [])

    function chooseSeat() {

    }

    if(sessao) {
        return (
            <PageContainer>
                Selecione o(s) assento(s)

                <SeatsContainer>
                    {sessao.seats.map((seat) => 
                        <SeatItem data-test="seat" key={seat.id} available={seat.isAvailable} onClick={(ev) => seat.isAvailable ? chooseSeat(ev) : null}>{seat.name}</SeatItem> 
                    )}
                </SeatsContainer>
                        
                <CaptionContainer>
                    <CaptionItem>
                        <CaptionCircle />
                        Selecionado
                    </CaptionItem>
                    <CaptionItem>
                        <CaptionCircle />
                        Disponível
                    </CaptionItem>
                    <CaptionItem>
                        <CaptionCircle />
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
    border: 1px solid blue;         // Essa cor deve mudar
    background-color: lightblue;    // Essa cor deve mudar
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
const SeatItem = styled.div`
    border: 1px solid blue;         // Essa cor deve mudar
    background-color: lightblue;    // Essa cor deve mudar
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