function CamposJson(ids){
// '#firstName, #lastName,#phoneNumber,#address'
var $items = $(ids)
var obj = {}
$items.each(function() {
    obj[this.id] = $(this).val();
})

return obj;// JSON.stringify( obj);
}

  function validar(str,campo){
    //debugger;
    if(str != null && str != ''){
        if(str.length < 41 &&  str.length > 1){
            return 'isvalid';
            
        }else{
            return 'El campo "'+campo+'" debe ser menor a 40 caracteres o mayor a 1.<br>';
        }
    }else{
         return 'El campo "'+campo+'" no debe estar vacio.<br>';
  }

}

  function  validarCampos(valores,campos){
      var error = -1;
      var valido = ""; var val= "";
      var ValCount =0;
      for(x=0;x<campos.length;x++){
         val += validar(valores[x],campos[x]);
         valido = validar(valores[x],campos[x]);
         if(valido  == 'isvalid' ){
              ValCount++;
         }
      }
     if(!(campos.length == ValCount)){
        $("#Notificacion").hide(350);
        $("#Notificacion").show(350);
        $("#Correcto").hide(350);
        $("#textnot").html(val.replace(/isvalid/g,''));  
     }else{

     }
      return campos.length == ValCount;
  }

  function Error(msj){

      if(msj!= undefined){

        $("#Notificacion").hide(350);
        $("#Notificacion").show(350);
        $("#Correcto").hide();
        $("#textnot").html(msj);  

      }


  }

      function ComboCategorias(){

    }


function conversor_divisa($moneda_origen,$moneda_destino,$cantidad) {
  $get = file_get_contents("https://www.google.com/finance/converter?a=$cantidad&from=$moneda_origen&to=$moneda_destino");
  $get = explode("<span class=bld>",$get);
  $get = explode("</span>",$get[1]);  
  return preg_replace("/[^0-9\.]/", null, $get[0]);
}