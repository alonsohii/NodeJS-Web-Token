function CamposJson(ids){
// '#firstName, #lastName,#phoneNumber,#address'
var $items = $(ids)
var obj = {}
$items.each(function() {
    obj[this.id] = $(this).val();
})

return obj;// JSON.stringify( obj);
}

function validarCampos2(ids){
// '#firstName, #lastName,#phoneNumber,#address'
      var $items = $(ids)
      var obj = {}
      debugger;
      var error = -1;
      var valido = ""; var val= "";
      var ValCount =0;
      var campoAct;
      var valAct;
      var nvAct;

      $items.each(function() {

          campoAct = $(this).context.__proto__.toString().toLowerCase();
          valAct = $(this).val();
          nvAct = $(this).attr('nv');

          if(campoAct.indexOf('input') != -1  || campoAct.indexOf('password') != -1) {
              val += validar(valAct, nvAct);
              valido = validar(valAct, nvAct);
          }

          if(campoAct.indexOf('textarea') != -1 ) {
              val += validarLarge(valAct, nvAct);
              valido = validarLarge(valAct, nvAct);
          }

          if(campoAct.indexOf('select') != -1) {  
              valido = null;         
              if(valAct != 99 || valAct != '99'){
                  valido = 'isvalid'
              }else{
                 val += 'No selecciono ningun valor para el Campo:'+nvAct+'<br>';
              }
            
          }
        
         if(valido  == 'isvalid' ){
              ValCount++;
              $(this).removeClass('boderRed'); 
         }else
         {
              $(this).addClass('boderRed');    
         }

        });

      if(!($items.length == ValCount)){
        $("#Notificacion").hide(350);
        $("#Notificacion").show(350);
        $("#Correcto").hide(350);
        $("#textnot").html(val.replace(/isvalid/g,''));  
     }
     return  $items.length == ValCount;

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

  function validarLarge(str,campo){
    //debugger;
    if(str != null && str != ''){
        if(str.length < 5000 &&  str.length > 40){
            return 'isvalid';
            
        }else{
            return 'El campo "'+campo+'" debe ser menor a 5000 caracteres y mayor a 40.<br>';
        }
    }else{
         return 'El campo "'+campo+'" no debe estar vacio.<br>';
  }

}

  function  validarCampos(valores,campos){
      var error = -1;
      var valido = ""; var val= "";
      var ValCount =0;
      for(x=0;x<valores.length;x++){
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

    function  validarCampo(valores,campos,cam){
      var error = -1;
      var valido = ""; var val= "";
      var ValCount =0;
      for(x=0;x<valores.length;x++){
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



window.onbeforeunload = function(e){  


      ///     $.get("http://freelanceworks.com.pc:8080/api/?token="+localStorage.getItem('tk')+'&close='1, function(data, status){
              


      //     });
// return 'Calling some alert messages here'; //return not alert
}