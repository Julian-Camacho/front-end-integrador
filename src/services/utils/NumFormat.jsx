export default function removeDecimals(value){
    if(isNaN(value)){
        return; 
        // si no es un numero devuelvo undefined
    }

    return Math.round(value * 100) / 100 
    // redondeo a dos decimales
}