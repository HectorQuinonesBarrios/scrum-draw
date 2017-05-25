
riot.tag2('proyect-list', '<ul class="event-list"> <li each="{proyecto, i in proyectos}"> <time> <p>Fecha de solicitud: {moment(proyecto.fecha_solicitud).format(⁗DD-MM-YYYY⁗)}</p> <p>Fecha de arranque: {moment(proyecto.fecha_arranque).format(⁗DD-MM-YYYY⁗)}</p> </time> <div class="info"> <h2 class="title"><a href="/kanban/{proyecto._id}">{proyecto.nombre}</a></h2> <p class="desc">Product Owner: {proyecto.product_owner.local.nombre}</p> <p class="desc">SCRUM Master: {proyecto.scrum_master.local.nombre}</p> <p class="desc">{proyecto.descripcion}</p><a href="/statistics/{proyecto._id}">Ver estadísticas</a>-<a href="/projects/{proyecto._id}/edit">Editar</a><a class="button" onclick="{borrar}" href="#">Borrar</a> </div> </li> </ul>', '', '', function(opts) {
    this.proyectos = opts.proyectos || []

    this.socket = io('http://localhost:3000');
    let xhttp = new XMLHttpRequest();
    let self = this

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

           self.update({proyectos:JSON.parse(xhttp.responseText)});
        }
    };

    this.borrar = function(e) {
        e.preventDefault()
        xhttp.open("DELETE", "/projects/"+e.item.proyecto._id, true);
        xhttp.send();
    }.bind(this)

    this.socket.on('nuevo', proyecto=>{
      xhttp.open("GET", "/projects/socket", true);
      xhttp.send();
    });

});
