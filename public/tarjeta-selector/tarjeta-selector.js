
riot.tag2('tarjeta-selector', '<div class="row" id="sortableKanbanBoards"> <div class="panel panel-primary kanban-col" each="{backlog, i in backlogs}"> <div class="panel-heading">{backlog.tipo} <button class="btn btn-danger btn-sm buttonBacklog" type="submit" onclick="borrarBacklog(\'{backlog._id}\');">X</button><i class="fa fa-2x fa-plus-circle pull-right"> </i> </div> <div class="panel-body"> <div class="kanban-centered" id="{backlog._id}"> <article class="kanban-entry grab" draggable="true" each="{tarjeta, i in backlog.tarjetas}" id="{tarjeta._id}"> <div class="kanban-entry-inner"> <div class="kanban-label"> <h2>Tarea con valor de {tarjeta.valor}</h2> <p>Como : {tarjeta.narrativa.como}</p> <p>Quiere : {tarjeta.narrativa.quiero}</p> <p>De Manera Que : {tarjeta.narrativa.manera}</p> <p>Dado : {tarjeta.criterios.dado}</p> <p>Cuando : {tarjeta.criterios.cuando}</p> <p>Entonces : {tarjeta.criterios.entonces}</p> <button class="btn btn-danger btn-ls buttonTarjeta" type="submit" onclick="borrarTarjeta(\'{tarjeta._id}\');">X</button> </div> </div> </article> </div> </div> <div class="panel-footer"> <button class="btn btn-info btn-sm" type="button" data-toggle="modal" data-target="#CardModal" data-backlog="{backlog._id}">Agregar tarjeta</button> </div> </div> </div> <div class="modal modal-static fade" id="processing-modal" role="dialog" aria-hidden="true"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-body"> <div class="text-center"><i class="fa fa-refresh fa-5x fa-spin"></i> <h4>Processing...</h4> </div> </div> </div> </div> </div>', '', '', function(opts) {
    this.backlogs = opts.backlogs
    this.proyecto = opts.proyecto
    let self = this

    this.socket = io('http://localhost:3000');

    let xhttp = new XMLHttpRequest()
    this.socket.on('backlogs', (backlog)=>{
      console.log('conectado');
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
           console.log(xhttp.responseText);
           self.update({backlogs: JSON.parse(xhttp.responseText)});
        }
      };
      xhttp.open('GET', '/kanban/backlogs/'+this.proyecto._id, true);
      xhttp.send();
    });
});