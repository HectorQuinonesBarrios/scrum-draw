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
        button.btn.btn-danger.btn-ls.button(onclick="{ borrar }") X
  script.
    this.proyectos = opts.proyectos || []
    this.moment = opts.moment
    let self = this
    //this.socket = io('https://scrum-draw.herokuapp.com');
    this.socket = io('http://localhost:3000');
    let xhttp = new XMLHttpRequest();

    borrar(e) {
        e.preventDefault()
        xhttp.open("DELETE", "/projects/"+e.item.proyecto._id, true);
        xhttp.send();
    }

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           //console.log(xhttp.responseText);
           self.update({proyectos:JSON.parse(xhttp.responseText)});
        }
    };

    this.socket.on('nuevo', proyecto=>{
      xhttp.open("GET", "/projects/socket", true);
      xhttp.send();
    });

      
    
    
