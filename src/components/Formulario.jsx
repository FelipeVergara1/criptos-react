import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Error from './Error'
import useSelectMonedas from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas'

const InputSubmit = styled.input`
    background-color: #9497ff;
    border: none;
    width: 100%;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 28px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;

    &:hover {
        background-color: #7a7bfe;
        cursor: pointer;
    }
`

const Formulario = ({setMonedas}) => {
    const [criptos, setCriptos] = useState([])
    const [error, setError] = useState(false)

    const [ moneda, SelectMonedas ] = useSelectMonedas('Elige tu moneda', monedas)
    const [ criptomoneda, SelectCriptomonedas ] = useSelectMonedas('Elige tu Criptomoneda', criptos)

    useEffect(() => {
        const consultarAPI = async () => {
            const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`
            const respuesta = await fetch(url)
            const resultado = await respuesta.json()

            const arrayCriptos = resultado.Data.map(cripto => {
                const objCripto = {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName
                }

               return objCripto 
            })

            setCriptos(arrayCriptos)
        }

        consultarAPI()
    }, [])

    const handleSubmit = e => {
        e.preventDefault()

        if ([moneda, criptomoneda].includes('')) {
            setError(true)
            return
        }

        setError(false)
        setMonedas({
            moneda,
            criptomoneda
        })
    }

    return (
        <>
            {error && <Error>todos los campos son obligatorios</Error>}
            <form
            onSubmit={handleSubmit}
            >
                <SelectMonedas />

                <SelectCriptomonedas />

                <InputSubmit
                    type="submit"
                    value="Cotizar"
                    />
            </form>
        </>
  )
}

export default Formulario
