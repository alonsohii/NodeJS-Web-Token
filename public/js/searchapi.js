
function Busqueda(arg) {

     var comodin  = (arg.inicio == 1? '' :'q=' ) ;
    $.get('http://localhost:8080/searchapi?'+comodin + arg.busqueda, function(data, status) {
        $('tbody').html('');
        $('#mensajes').html('');

        if (data.length>0) {

            $.when(
                $.each(data, function(index, element) {
                    $('#search').append('<tr class="z"  > ' +
                        '<td  id="url" url=' + element.urlproyecto + ' ><span id="" class="iconProject"></span><p class="txtProject">'  + element.nombre + '</p> '+
                        '<div> '+element.descripcioncorta + '  </div> </td>' +
                        ' <td>Propuestas</td><td>Fecha</td>' +
                        '<td>Precio  <br> <button    id="botonx">Postularme</button>  </td>' +
                        ' </tr>');

                })

            ).then(function(x) {
                debugger;
                pager.paragraphsPerPage = 10;
                pager.pagingContainer = $('tbody');
                pager.paragraphs = $('tr', pager.pagingContainer);
                pager.showPage(1);
                $('#referencePrj').addClass('iconProject');

            });

        } else {
            arg.busqueda = (arg.inicio == 1 ? 'No existen proyectos aun' : 'No se encontraron resultados con la busqueda:(' + arg.busqueda + ')');

            $('#mensajes').html('<div class="alert alert-warning" id="Notificacion">' +
                ' <strong>' + arg.busqueda + '</strong>' +
                '  </div>');
        }

    });

}