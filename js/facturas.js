var urlget_facturas = 'https://34.68.196.220:90/G3_20/Facturas/controller/facturas.php?op=getFacturas';
var urlpost_facturas = 'https://34.68.196.220:90/G3_20/Facturas/controller/facturas.php?op=insertFactura';
var urlget_factura = 'https://34.68.196.220:90/G3_20/Facturas/controller/facturas.php?op=getFactura';
var urlput_facturas = 'https://34.68.196.220:90/G3_20/Facturas/controller/facturas.php?op=updateFactura';
var urldelete_facturas = 'https://34.68.196.220:90/G3_20/Facturas/controller/facturas.php?op=deleteFactura';

$(document).ready(function () {
    cargarFacturas();
})

function cargarFacturas() {

    $.ajax({
        url: urlget_facturas,
        type: 'GET',
        datatype: 'JSON',
        success: function (response) {
            var miItems = response;
            var valores = '';

            for (i = 0; i < miItems.length; i++) {
                valores += '<tr>' +
                    '<td>' + miItems[i].ID + '</td>' +
                    '<td>' + miItems[i].NUMERO_FACTURA + '</td>' +
                    '<td>' + miItems[i].ID_SOCIO + '</td>' +
                    '<td>' + miItems[i].FECHA_FACTURA + '</td>' +
                    '<td>' + miItems[i].DETALLE + '</td>' +
                    '<td>' + miItems[i].SUB_TOTAL + '</td>' +
                    '<td>' + miItems[i].TOTAL_ISV + '</td>' +
                    '<td>' + miItems[i].TOTAL + '</td>' +
                    '<td>' + miItems[i].FECHA_VENCIMIENTO + '</td>' +
                    '<td>' +
                    '<button class="btn btn-warning" onclick="cargarFactura(' + miItems[i].ID + ')">Editar</button></td>' +
                    '<td><button class="btn btn-danger" onclick="eliminarFactura(' + miItems[i].ID + ')">Eliminar</button>' +
                    '</td>' +
                    '</tr>';
                $('.Facturas').html(valores);
            }
        }
    })
}

function agregarFactura() {
    var datos = {
        NUMERO_FACTURA: $('#NUMERO_FACTURA').val(),
        ID_SOCIO: $('#ID_SOCIO').val(),
        FECHA_FACTURA: $('#FECHA_FACTURA').val(),
        DETALLE: $('#DETALLE').val(),
        SUB_TOTAL: $('#SUB_TOTAL').val(),
        TOTAL_ISV: $('#TOTAL_ISV').val(),
        TOTAL: $('#TOTAL').val(),
        FECHA_VENCIMIENTO: $('#FECHA_VENCIMIENTO').val()
    };

    var datos_json = JSON.stringify(datos);

    $.ajax({
        url: urlpost_facturas,
        type: 'POST',
        data: datos_json,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
        }
    })
    alert("Factura Agregada");
}

function cargarFactura(ID_FACTURA) {
    var datos = {
        ID: ID_FACTURA
    };

    var datos_json = JSON.stringify(datos);
    var detalle;

    $.ajax({
        url: urlget_factura,
        type: 'POST',
        data: datos_json,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            var miItems = response;
            detalle = miItems[0].DETALLE;

            $('#NUMERO_FACTURA').val(miItems[0].NUMERO_FACTURA);
            $('#ID_SOCIO').val(miItems[0].ID_SOCIO);
            $('#FECHA_FACTURA').val(miItems[0].FECHA_FACTURA);
            $('#DETALLE').val(miItems[0].DETALLE);
            $('#SUB_TOTAL').val(miItems[0].SUB_TOTAL);
            $('#TOTAL_ISV').val(miItems[0].TOTAL_ISV);
            $('#TOTAL').val(miItems[0].TOTAL);
            $('#FECHA_VENCIMIENTO').val(miItems[0].FECHA_VENCIMIENTO);
            var btnActualizar = '<input type="submit" id="btn_actualizar" onclick="actualizarFactura(' + ID_FACTURA + ')" value="Modificar factura" class= "btn btn-primary">';
            $('.btn_agregar').html(btnActualizar);
        }
    })    
}

function actualizarFactura(ID_FACTURA) {
    var datos = {
        ID: ID_FACTURA,
        NUMERO_FACTURA: $('#NUMERO_FACTURA').val(),
        ID_SOCIO: $('#ID_SOCIO').val(),
        FECHA_FACTURA: $('#FECHA_FACTURA').val(),
        DETALLE: $('#DETALLE').val(),
        SUB_TOTAL: $('#SUB_TOTAL').val(),
        TOTAL_ISV: $('#TOTAL_ISV').val(),
        TOTAL: $('#TOTAL').val(),
        FECHA_VENCIMIENTO: $('#FECHA_VENCIMIENTO').val()
    };

    var datos_json = JSON.stringify(datos);

    $.ajax({
        url: urlput_facturas,
        type: 'PUT',
        data: datos_json,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
        }
    })
    alert("Factura modificada");
}

function eliminarFactura(ID_FACTURA) {
    var datos = {
        ID: ID_FACTURA
    };

    var datos_json = JSON.stringify(datos);

    $.ajax({
        url: urldelete_facturas,
        type: 'DELETE',
        data: datos_json,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);            
        }
    })
    alert("Factura eliminada");
}