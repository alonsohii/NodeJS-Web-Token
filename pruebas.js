/*function suma(numero_uno,numero_dos){
   setTimeout(function(){
      var resultado = numero_uno + numero_dos;
      return resultado;
   }, 500);
}

var resultado = suma(2,5)

console.log(resultado); */


function suma(numero_uno,numero_dos,callback){
   setTimeout(function(){
      var resultado = numero_uno + numero_dos;
      callback(resultado);
   }, 500);
}

suma(2,5,function(resultado){
   console.log(resultado);
})