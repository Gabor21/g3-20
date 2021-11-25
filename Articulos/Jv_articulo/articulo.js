var urlGetart= 'http://34.68.196.220:90/G3_20/Articulos/Controller/Articulos.php?op=GetArt';
var urlpostart='http://34.68.196.220:90/G3_20/Articulos/Controller/Articulos.php?op=InsertarArt';
var urlGetunart='http://34.68.196.220:90/G3_20/Articulos/Controller/Articulos.php?op=Getunart';
var urlactualiazart='http://34.68.196.220:90/G3_20/Articulos/Controller/Articulos.php?op=ActualizarArt';
var urlelimart='http://34.68.196.220:90/G3_20/Articulos/Controller/Articulos.php?op=EliminarArt';

$(document).ready(function(){
    cargararticulos();
});

function cargararticulos(){
    $.ajax({
        url:urlGetart,
        type: 'get',
        datatype: 'JSON',
        success: function(response){
            var miltems=response;
            var valores='';


            for(i=0;i<miltems.length;i++){
                valores="<tr>"+     
                        '<tr>'
                          '<td>'+miltems[i].ID+'</td>'+
                          '<td>'+miltems[i].Descripcion+'</td>'+
                          '<td>'+miltems[i].Unidad+'</td>'+
                          '<td>'+miltems[i].Costo+'</td>'+
                          '<td>'+miltems[i].Precio +'</td>'+
                          '<td>'+miltems[i].Aplica_ISV+'</td>'+
                          '<td>'+miltems[i].Porcentaje_ISV+'</td>'
                          '<td>'+miltems[i].ID_socio+'</td>'+
                            '<td>'+
                            '<button class="btn btn-warning" onclick="cargararticulos('+miltems[i].ID+')">Editar</button>'
                            '<button class="btn btn-danger" onclick="EliminarArt('+miltems[i].ID+')">Eliminar</button>'
                            '</td>'+
                        '</tr>';
                $('.articulos').html(valores);        
            }
        }
    });
}

function AgregarArticulo(){
    var datoarticulo ={
      ID:$('#ID').val(),
       Descripcion:$('#Descripcion').val(),
       Unidad:$('#Unidad').val(),
       Costo:$('#Costo').val(),
       Precio:$('#Precio').val(),
      Aplica_ISV:$('#Aplica_ISV').val(),
      Porcentaje_ISV:$('#Porcentaje_ISV').val(),
      ID_socio:$('#ID_Socio').val()    
    };

    

    var datoarticulojson= JSON.stringify(datoarticulo);

    $.ajax({
        url:urlpostart,
        type:'post',
        data:datoarticulojson,
        datatype:'JSON',
        contentype:'application/json',
        success:function(response){
            console.log(response);
        }
    });
    alert("Articulo Agregado");
    
}
function cargarart(IDart){
    var datosart = {
    ID: IDart
    };

     var  datosartjson= JSON.stringify( datosart);

     $.ajax({
        url:urlGetunart,
        type:'post',
        data:datosartjson,
        datatype:'JSON',
        contentype:'application/json',
        success:function(response){
            var miltems=response;
            ID:$('#ID').val(miltems[0].ID);
            $('#Descripcion').val(miltems[0].Descripcion);
            $('#Unidad').val(miltems[0].Unidad);
            $('#Costo').val(miltems[0].Costo);
            $('#Precio').val(miltems[0].Precio);
            $('#Aplica_ISV').val(miltems[0].Aplica_ISV);
            $('#Porcentaje_ISV').val(miltems[0].Porcentaje_ISV);
            $('#ID_Socio').val(miltems[0].ID_socio);
            var btnactualizar ='input type="submit" id="Btn_actualizar" onclick="actualizarArticulo('+ miltems[0].ID+')"'+
           'value="actualizar Articulo" class="btn btn-primary"></input>';
            $('.btnagregar').html(btnactualizar);

        }
    });
   

}
function actualizarArticulo(idarticulo){
    var datosarticulo ={
        ID:idarticulo,
        ID:$('#ID').val(),
       Descripcion:$('#Descripcion').val(),
       Unidad:$('#Unidad').val(),
       Costo:$('#Costo').val(),
       Precio:$('#Precio').val(),
      Aplica_ISV:$('#Aplica_ISV').val(),
      Porcentaje_ISV:$('#Porcentaje_ISV').val(),
      ID_socio:$('#ID_Socio').val()    
    };

    

    var datosarticulojson= JSON.stringify(datosarticulo);

    $.ajax({
        url:urlactualiazart,
        type:'put',
        data:datosarticulojson,
        datatype:'JSON',
        contentype:'application/json',
        success:function(response){
            console.log(response);
        }
    });
    alert("articulo Actualizado");
}
function EliminarArt(IDelimart){
    var eliminarsart = {
        ID: IDelimart
     };
    
     var  eliminarartjson= JSON.stringify( eliminarsart);
    
     $.ajax({
        url:urlelimart,
        type:'DELETE',
        data:datosarticulojson,
        datatype:'JSON',
        contentype:'application/json',
        success:function(response){
            console.log(response);
        }
    });
    alert("articulo Eliminado");
}