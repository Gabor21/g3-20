var urlget_socios_negocio = 'https://34.68.196.220:90/G3_20/Socios_negocio/controller/socios_negocio.php?op=get_socios_negocio';
var urlpost_socios_negocio = 'https://34.68.196.220:90/G3_20/Socios_negocio/controller/socios_negocio.php?op=insert_socio_negocio';
var urlget_socio_negocio = 'https://34.68.196.220:90/G3_20/Socios_negocio/controller/socios_negocio.php?op=get_socio_negocio';
var urlput_socio_negocio = 'https://34.68.196.220:90/G3_20/Socios_negocio/controller/socios_negocio.php?op=update_socio_negocio';
var urldelete_socio_negocio = 'https://34.68.196.220:90/G3_20/Socios_negocio/controller/socios_negocio.php?op=delete_socio_negocio';

$(document).ready(function () {
    cargarSocios_negocio();
})

function cargarSocios_negocio() {

    $.ajax({
        url: urlget_socios_negocio,
        type: 'GET',
        datatype: 'JSON',
        success: function (response) {
            var miItems = response;
            var valores = '';

            for (i = 0; i < miItems.length; i++) {
                valores += '<tr>' +
                    '<td>' + miItems[i].id + '</td>' +
                    '<td>' + miItems[i].nombre + '</td>' +
                    '<td>' + miItems[i].razon_social + '</td>' +
                    '<td>' + miItems[i].direccion + '</td>' +
                    '<td>' + miItems[i].tipo_socio + '</td>' +
                    '<td>' + miItems[i].contacto + '</td>' +
                    '<td>' + miItems[i].email + '</td>' +
                    '<td>' + miItems[i].fecha_creado + '</td>' +
                    '<td>' + miItems[i].estado + '</td>' +
                    '<td>' + miItems[i].telefono + '</td>' +
                    '<td>' +
                    '<button class="btn btn-warning" onclick="cargarSocio_negocio(' + miItems[i].id + ')">Editar</button></td>' +
                    '<td><button class="btn btn-danger" onclick="eliminarSocio_negocio(' + miItems[i].id + ')">Eliminar</button>' +
                    '</td>' +
                    '</tr>';
                $('.socios_negocio').html(valores);
            }
        }
    })
}

function agregarSocios_negocio() {
    var datos = {
        nombre: $('#nombre').val(),
        razon_social: $('#razon_social').val(),
        direccion: $('#direccion').val(),
        tipo_socio: $('#tipo_socio').val(),
        contacto: $('#contacto').val(),
        email: $('#email').val(),
        estado: $('#estado').val(),
        telefono: $('#telefono').val()
    };

    var datos_json = JSON.stringify(datos);

    $.ajax({
        url: urlpost_socios_negocio,
        type: 'POST',
        data: datos_json,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
        }
    })
    alert("Socio agregado");
}

function cargarSocio_negocio(idSocio) {
    var datos = {
        id: idSocio
    };

    var datos_json = JSON.stringify(datos);

    $.ajax({
        url: urlget_socio_negocio,
        type: 'POST',
        data: datos_json,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            var miItems = response;

            $('#nombre').val(miItems[0].nombre);
            $('#razon_social').val(miItems[0].razon_social);
            $('#direccion').val(miItems[0].direccion);
            $('#tipo_socio').val(miItems[0].tipo_socio);
            $('#contacto').val(miItems[0].contacto);
            $('#email').val(miItems[0].email);
            $('#estado').val(miItems[0].estado);
            $('#telefono').val(miItems[0].telefono);
            var btnActualizar = '<input type="submit" id="btn_actualizar" onclick="actualizarSocios_negocio(' + miItems[0].id + ')" value="Modificar socio" class= "btn btn-primary">';
            $('.btn_agregar').html(btnActualizar);
        }
    })
}

function actualizarSocios_negocio(idSocio) {
    var datos = {
        id: idSocio,
        nombre: $('#nombre').val(),
        razon_social: $('#razon_social').val(),
        direccion: $('#direccion').val(),
        tipo_socio: $('#tipo_socio').val(),
        contacto: $('#contacto').val(),
        email: $('#email').val(),
        estado: $('#estado').val(),
        telefono: $('#telefono').val()
    };

    var datos_json = JSON.stringify(datos);

    $.ajax({
        url: urlput_socio_negocio,
        type: 'PUT',
        data: datos_json,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
        }
    })
    alert("Socio modificado");
}

function eliminarSocio_negocio(idSocio) {
    var datos = {
        id: idSocio
    };

    var datos_json = JSON.stringify(datos);

    $.ajax({
        url: urldelete_socio_negocio,
        type: 'DELETE',
        data: datos_json,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);            
        }
    })
    alert("Socio eliminado");
}