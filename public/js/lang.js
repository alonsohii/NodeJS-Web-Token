

/*
var translate = function (jsdata)
{	
	$("[tkey]").each (function (index)
	{
		var strTr = jsdata [$(this).attr ('tkey')];
	    $(this).html (strTr);
	});
}


langCode = navigator.language.substr (0, 2);
debugger;
if (langCode in langs)
	$.getJSON('lang/'+langCode+'.json', translate);
else
	$.when($.getJSON("lang/en.json", function(result){
         jQuery.data( document, "lang",result );
   	 })).then(function( x ) {
   translate(jQuery.data( document, "lang"));
   jQuery.removeData( document, "lang" );
});
*/

	//$.getJSON('lang/en.json', translate);


