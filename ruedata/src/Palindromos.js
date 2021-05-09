import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'

export default function findPalindromos() {
    const palabra = "laanulalunapaisajemontanaguaamoraromacomidaluzazulsillagatobotellacamarayosoypalindromocasaverdebanderaventanacangrejolarutanosaportootropasonaturaliniciaracaestoseralodoodolaresdonasbarcosmarcieloaviontierrapaisbicicletaestonoespalindromojugarseverlasalrevesusandounradarenelojorejero";
    //tamaño del texto = 285
    // let esPalindromo = false
    let contador = 0

    //285
    /**
    * Esta funcion busca palabras palimdromas en un texto
    */


    let styles = {
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        maxWidth: '50%'
    }
    function recorreTexto(texto) {
        let resul = []
        for (let j = 0; j < texto.length; j++) {
            for (let i = 0; i < texto.length; i++) {
                let caracteres = texto.slice(i, (i + contador))
                //esPalindromo = EsPalimdromo(caracteres)
                if (caracteres.length > 3 && caracteres.length <= contador) {
                    if (EsPalimdromo(caracteres)) {
                        resul[i] = texto.slice(i, (i + contador))
                    }
                }
            } contador++
        }
        return (
            <div>
                <h4>PALABRAS PALINDROMAS ENCONTRADAS</h4>
                <div style={styles}>
                    {resul.map(resultado => {
                        console.log(resultado)
                        return (
                            <ul>
                                <li>{resultado}</li>
                            </ul>
                        )
                    })}
                </div>
            </div>
        )
    }

    function EsPalimdromo(caracteres) {
        //Recorre toda la palabra
        for (let i = 0; i < caracteres.length; i++) {
            //Compara cada letra 
            if (caracteres[i] !== caracteres[caracteres.length - i - 1]) {
                return false;
            }
        } return true;
    }

    return (
        <div>
            {recorreTexto(palabra)}

        </div>
    )

}