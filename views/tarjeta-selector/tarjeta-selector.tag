tarjeta-selector
  div#sortableKanbanBoards.row
      div.panel.panel-primary.kanban-col(each='{ backlog, i in backlogs }')
        div.panel-heading { backlog.tipo }
          i.fa.fa-2x.fa-plus-circle.pull-right
        div.panel-body
          div.kanban-centered(id='{ backlog._id }')
              article#item6.kanban-entry.grab(draggable='true' each='{ tarjeta, i in backlog.tarjetas }')
                div.kanban-entry-inner
                  div.kanban-label
                    h2 Tarea con valor de { tarjeta.valor }
                    p Como : { tarjeta.narrativa.como }
                    p Quiere : { tarjeta.narrativa.quiero }
                    p De Manera Que : { tarjeta.narrativa.manera }
                    p Dado : { tarjeta.criterios.dado}
                    p Cuando : { tarjeta.criterios.cuando }
                    p Entonces : { tarjeta.criterios.entonces }
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
    this.socket = io('http://localhost:3000', {forceNew: true})
    let xhttp = new XMLHttpRequest()
    this.socket.on('backlogs', (backlog)=>{
      console.log('conectado');
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           console.log(xhttp.responseText);
           self.update({backlogs: JSON.stringify(xhttp.responseText)})

        }
      };
      xhttp.open('GET', '/backlogs/'+this.proyecto._id, true);
      xhttp.send();
    });
