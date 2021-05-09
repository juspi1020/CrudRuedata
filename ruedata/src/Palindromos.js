import React from 'react';

export default function findPalindromos() {
    const palabra = "laanulalunapaisajemontanaguaamoraromacomidaluzazulsillagatobotellacamarayosoypalindromocasaverdebanderaventanacangrejolarutanosaportootropasonaturaliniciaracaestoseralodoodolaresdonasbarcosmarcieloaviontierrapaisbicicletaestonoespalindromojugarseverlasalrevesusandounradarenelojorejero";
    let esPalindromo = ""
    let contador = 3
    let resul = []
    //285
    /**
    * Esta funcion busca palabras palimdromas en un texto
    */
    function recorreTexto(texto) {
        for (let i = 0; i < texto.length; i++) {
            let palabraConCaracteres = texto.slice(i, (i += contador))
            esPalindromo = EsPalimdromo(palabraConCaracteres)
            if (palabraConCaracteres.length >= 3) {
                if (esPalindromo) {
                    resul[i] = texto.slice(i, (i += contador) )
                    console.log(resul)
                }
            }
        }
    }

    function EsPalimdromo(palabra) {
        //Recorre toda la palabra
        for (let i = 0; i < palabra.length; i++) {
            //Compara cada letra 
            if (palabra[i] !== palabra[palabra.length - i - 1]) {
                return false;
            }
            return true;
        }
    }

    return (
        <div>
            {recorreTexto(palabra)}
            <span>{resul}</span>
        </div>
    )

}