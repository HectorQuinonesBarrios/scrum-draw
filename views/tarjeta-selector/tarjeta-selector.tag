tarjeta-selector
  div#sortableKanbanBoards.row
      div.panel.panel-primary.kanban-col(each='{ backlog in backlogs }')
        div.panel-heading { backlog.tipo }
          button.btn.btn-danger.btn-sm.buttonBacklog(onclick="{ borrarBacklog }") X
          i.fa.fa-2x.fa-plus-circle.pull-right      
        div.panel-body
          div.kanban-centered(id='{ backlog._id }')
            article.kanban-entry.grab(draggable='true' each='{ tarjeta in backlog.tarjetas }' id='{ tarjeta._id }')
                div.kanban-entry-inner
                  div.kanban-label
                    h2 Tarea con valor de { tarjeta.valor }
                    p Como : { tarjeta.narrativa.como }
                    p Quiere : { tarjeta.narrativa.quiero }
                    p De Manera Que : { tarjeta.narrativa.manera }
                    p Dado : { tarjeta.criterios.dado}
                    p Cuando : { tarjeta.criterios.cuando }
                    p Entonces : { tarjeta.criterios.entonces }
                    button.btn.btn-danger.btn-ls.buttonTarjeta(type='submit' onclick="{ borrarTarjeta }") X
        div.panel-footer
          button.btn.btn-info.btn-sm(type='button' data-toggle='modal' data-target='#CardModal' data-backlog='{ backlog._id }') Agregar tarjeta
  div#processing-modal.modal.modal-static.fade(role='dialog' aria-hidden='true')
    div.modal-dialog
      div.modal-content
        div.modal-body
          div.text-center
            i.fa.fa-refresh.fa-5x.fa-spin
            h4 Processing...
  script.
    this.backlogs = opts.backlogs
    this.proyecto = opts.proyecto
    let self = this
    //this.socket = io('https://scrum-draw.herokuapp.com');
    this.socket = io('http://localhost:3000');
    let xhttp = new XMLHttpRequest()

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           //console.log(xhttp.responseText)
           self.update({backlogs: JSON.parse(xhttp.responseText)})
        }
    };

    borrarBacklog(e) {
      e.preventDefault()
      xhttp.open("DELETE", "/kanban/"+e.item.backlog._id, true)
      xhttp.send()
    }

    borrarTarjeta(e) {
      e.preventDefault()
      xhttp.open("DELETE", "/tarjetas/"+e.item.tarjeta._id, true)
      xhttp.send()
    }

    this.socket.on('backlogs', backlog=>{
      xhttp.open('GET', '/kanban/backlogs/'+this.proyecto._id, true)
      xhttp.send()
    });
