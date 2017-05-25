
riot.tag2('tarjeta-selector', '<card-modal ref="cardModal"></card-modal> <div class="row" id="sortableKanbanBoards"> <div class="panel panel-primary kanban-col" each="{backlog, i in backlogs}"> <div class="panel-heading" onclick="{toggle}">{backlog.tipo}<i class="fa fa-2x fa-plus-circle pull-right"> </i> <button class="btn btn-danger btn-sm buttonBacklog fa fa-times" onclick="{borrarBacklog}"></button> </div> <div class="panel-body" ondragover="{allowDrop}" ondrop="{drop}"> <div class="kanban-centered" id="{backlog._id}"> <article class="kanban-entry grab" draggable="true" each="{tarjeta, j in backlog.tarjetas}" id="{tarjeta._id}" ondragstart="{drag}"> <div class="kanban-entry-inner" onclick="{openTarjeta}"> <div class="kanban-label"> <h2>Tarea con valor de {tarjeta.valor}</h2> <p>Como : {tarjeta.narrativa.como}</p> <p>Quiere : {tarjeta.narrativa.quiero}</p> <p>De Manera Que : {tarjeta.narrativa.manera}</p> <p>Dado : {tarjeta.criterios.dado}</p> <p>Cuando : {tarjeta.criterios.cuando}</p> <p>Entonces : {tarjeta.criterios.entonces}</p> </div> </div> <button class="btn btn-danger btn-ls buttonTarjeta fa fa-times" onclick="{borrarTarjeta}"></button> </article> </div> </div> <div class="panel-footer"> <button class="btn btn-info btn-sm" type="button" onclick="{openTarjeta}">Agregar tarjeta</button> </div> </div> </div> <div class="modal modal-static fade" id="processing-modal" role="dialog" aria-hidden="true"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-body"> <div class="text-center"><i class="fa fa-refresh fa-5x fa-spin"></i> <h4>Procesando...</h4> </div> </div> </div> </div> </div>', '', '', function(opts) {
    this.backlogs = opts.backlogs
    this.proyecto = opts.proyecto
    this.socket = io('http://localhost:3000')

    let sourceId;
    let self = this
    let xhttp = new XMLHttpRequest()

    this.borrarBacklog = function(e) {
      e.preventDefault()
      xhttp.open('DELETE', '/kanban/' + e.item.backlog._id, true)
      xhttp.send()
    }.bind(this)

    this.borrarTarjeta = function(e) {
      e.preventDefault()
      xhttp.open('DELETE', '/tarjetas/' + e.item.tarjeta._id, true)
      xhttp.send()
    }.bind(this)

    this.openTarjeta = function(e) {
      this.refs.cardModal.setOpts({tarjeta: e.item.tarjeta || {narrativa: {}, criterios: {}}, backlog: e.item.tarjeta? e.item.tarjeta.backlog : e.item.backlog._id})
      $('#CardModal').modal('show')
    }.bind(this)

    this.toggle = function(e) {
      $(e.target.parentElement.nextElementSibling)
      .slideToggle()
    }.bind(this)

    this.drag = function(e) {
      sourceId = e.item.tarjeta.backlog;
      e.dataTransfer.setData('text', e.target.id);
    }.bind(this)

    this.allowDrop = function(e) {
      e.preventDefault()
    }.bind(this)

    this.drop = function(e) {
      let targetId = e.item.backlog._id
      if (sourceId != targetId) {
        let elementId = e.dataTransfer.getData('text')
        $('#processing-modal').modal('toggle')
        $.post('/tarjetas?_method=PUT', {
          _id: elementId, backlog: targetId
        }, data=> {
          let element = document.getElementById(elementId)
          $(targetId).children().prepend(element)
        }).always(()=>{
          $('#processing-modal').modal('toggle')
        })
      }
      e.preventDefault()
    }.bind(this)

    this.socket.on('backlogs', message=>{
      xhttp.open('GET', '/kanban/backlogs/' + this.proyecto._id, true)
      xhttp.send()
    })

    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {

        self.update({backlogs: JSON.parse(xhttp.responseText)})
      }
    }

    let kanbanCol = $('.panel-body')
    kanbanCol.css('max-height', (window.innerHeight - 150) + 'px')

    let kanbanColCount = parseInt(kanbanCol.length)
    $('.container-fluid').css('min-width', (kanbanColCount * 350) + 'px')

});
riot.tag2('card-modal', '<div class="modal fade" id="CardModal" role="dialog"> <div class="modal-dialog"> <div class="modal-content"> <form id="crearTarjeta" onsubmit="{enviar}"> <div class="modal-header"> <button class="close" type="button" data-dismiss="modal">×</button> <h4 class="modal-title">Agregar tarjeta</h4> </div> <div class="modal-body"> <h5>Narrativa de la historia</h5> <input class="form-control" name="como" required="required" type="text" placeholder="Como" riot-value="{tarjeta.narrativa.como}"><br> <input class="form-control" name="quiero" required="required" type="text" placeholder="Quiero" riot-value="{tarjeta.narrativa.quiero}"><br> <input class="form-control" name="manera" required="required" type="text" placeholder="De tal manera" riot-value="{tarjeta.narrativa.manera}"><br> <h5>Criterios de aceptacion</h5> <input class="form-control" name="dado" required="required" type="text" placeholder="Dado" riot-value="{tarjeta.criterios.dado}"><br> <input class="form-control" name="cuando" required="required" type="text" placeholder="Cuando" riot-value="{tarjeta.criterios.cuando}"><br> <input class="form-control" name="entonces" required="required" type="text" placeholder="Entonces" riot-value="{tarjeta.criterios.entonces}"> <input hidden name="backlog" type="text" required="required" riot-value="{backlog}"> <input hidden name="_id" type="text" riot-value="{tarjeta._id}"> <label for="valor">Valor</label> <select class="form-control" name="valor" required="required"> <option value="" selected="{!tarjeta}">Valor</option> <option each="{op in [1,2,3,5,8]}" riot-value="{op}" selected="{tarjeta.valor == op}">{op}</option> </select> </div> <div class="modal-footer"> <button class="btn btn-default" type="submit">Agregar</button> <button class="btn btn-info" type="button" data-dismiss="modal">Cerrar</button> </div> </form> </div> </div> </div>', '', '', function(opts) {
    this.tarjeta = opts.tarjeta || {narrativa: {}, criterios: {}}
    this.backlog = opts.backlog || this.tarjeta.backlog
    let xhttp = new XMLHttpRequest()

    this.enviar = function(e) {
      e.preventDefault()
      if (!this.tarjeta._id) xhttp.open('POST', '/tarjetas')
      else xhttp.open('POST', '/tarjetas?_method=PUT')
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send($('#crearTarjeta').serialize())
    }.bind(this)

    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(xhttp.responseText)
        $('#CardModal').modal('hide')
      }
    }

    this.mixin({
      init: function() {
        this.on('updated', function() {
          console.log('Updated!')
        })
      },

      getOpts: function() {
        return this.opts
      },

      setOpts: function(opts, update) {
        this.opts = opts
        if (!update) this.update(opts)
        return this
      }
    })
});
