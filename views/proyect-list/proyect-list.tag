proyect-list
  ul.event-list
    li(each='{proyecto, i in proyectos}')
      time
        p  Fecha de solicitud {moment(proyecto.fecha_solicitud).format("DD-MM-YYYY")}
        p  Fecha de arranque {moment(proyecto.fecha_arranque).format("DD-MM-YYYY")}
      .info
        h2.title
          a(href='/kanban/{proyecto._id}') {proyecto.nombre}
        p.desc Product Owner: {proyecto.product_owner.local.nombre}
        p.desc SCRUM Master: {proyecto.scrum_master.local.nombre}
        p.desc {proyecto.descripcion}
        a(href='/statistics/{proyecto._id}') Ver estadísticas
        | -
        a(href='/projects/{proyecto._id}/edit') Editar
        form(name='borrar', id='form-borrar-proyecto',  action='/projects/{proyecto._id}/borrar?_method=DELETE', method='POST')
          button.btn.btn-danger.btn-ls(type='submit' style='float:right') x
  script.
    this.proyectos = opts.proyectos || []
    this.moment = opts.moment
    let self = this
    this.socket = io('https://scrum-draw.herokuapp.com');
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
