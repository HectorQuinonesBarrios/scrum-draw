
riot.tag2('proyect-list', '<ul class="event-list"> <li each="{proyecto, i in proyectos}"> <time> <p> Fecha de solicitud {moment(proyecto.fecha_solicitud).format(⁗DD-MM-YYYY⁗)}</p> <p> Fecha de arranque {moment(proyecto.fecha_arranque).format(⁗DD-MM-YYYY⁗)}</p> </time> <div class="info"> <h2 class="title"><a href="/kanban/{proyecto._id}">{proyecto.nombre}</a></h2> <p class="desc">Product Owner: {proyecto.product_owner.local.nombre}</p> <p class="desc">SCRUM Master: {proyecto.scrum_master.local.nombre}</p> <p class="desc">{proyecto.descripcion}</p><a href="/statistics/{proyecto._id}">Ver estadísticas</a>-<a href="/projects/{proyecto._id}/edit">Editar</a> </div> </li> </ul>', '', '', function(opts) {
    this.proyectos = opts.proyectos || []
    this.moment = opts.moment
    let self = this
    this.socket = io('http://localhost:3000', {forceNew: true});
    let xhttp = new XMLHttpRequest();
    this.socket.on('nuevo', (proyecto)=>{

      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

           console.log(xhttp.responseText);
           self.update({proyectos:JSON.parse(xhttp.responseText)});

        }
      };
      xhttp.open("GET", "/projects/socket", true);
      xhttp.send();
    });
});