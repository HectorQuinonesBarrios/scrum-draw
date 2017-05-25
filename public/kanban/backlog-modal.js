
riot.tag2('backlog-modal', '<div class="modal fade" id="BacklogModal" role="dialog"> <div class="modal-dialog"> <div class="modal-content"> <form id="add-backlog" name="add-backlog" onsubmit="{enviar}"> <div class="modal-header"> <button class="close" type="button" data-dismiss="modal">×</button> <h4 class="modal-title">Agregar backlog</h4> </div> <div class="modal-body"> <div class="row"> <div class="col-sm-12 form-group"> <input class="form-control" name="tipo" required="required" type="text" placeholder="Nombre del Backlog" ref="tipo"> </div> </div> </div> <div class="modal-footer"> <div class="row"> <button class="btn btn-default" type="submit">Agregar</button> <button class="btn btn-info" type="button" data-dismiss="modal">Cerrar</button> </div> </div> </form> </div> </div> </div>', '', '', function(opts) {
        this.proyecto = opts.proyecto
        let xhttp = new XMLHttpRequest()

        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
               $('#BacklogModal').modal('hide')
            }
        };
        this.enviar = function(e) {
          e.preventDefault()
          xhttp.open('POST', '/kanban/' + this.proyecto._id, true)
          xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          xhttp.send('tipo='+this.refs.tipo.value)
        }.bind(this)
});