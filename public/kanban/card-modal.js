
riot.tag2('card-modal', '<div class="modal fade" id="CardModal" role="dialog"> <div class="modal-dialog"> <div class="modal-content"> <form name="crear" id="form-add-card" method="POST" action="/tarjetas" onsubmit="{enviar}"> <div class="modal-header"> <button class="close" type="button" data-dismiss="modal">×</button> <h4 class="modal-title">Agregar tarjeta</h4> </div> <div class="modal-body"> <div class="row"> <div class="col-sm-12 form-group"> <h5 class="modal-title">Narrativa de la historia</h5> <input class="form-control" name="como" required="required" type="text" placeholder="Como" riot-value="{tarjeta.narrativa.como}"><br> <input class="form-control" name="quiero" required="required" type="text" placeholder="Quiero" riot-value="{tarjeta.narrativa.quiero}"><br> <input class="form-control" name="manera" required="required" type="text" placeholder="De tal manera" riot-value="{tarjeta.narrativa.manera}"><br> <h5 class="modal-title"> Criterios de aceptacion</h5> <input class="form-control" name="dado" required="required" type="text" placeholder="Dado" riot-value="{tarjeta.criterios.dado}"><br> <input class="form-control" name="cuando" required="required" type="text" placeholder="Cuando" riot-value="{tarjeta.criterios.cuando}"><br> <input class="form-control" name="entonces" required="required" type="text" placeholder="Entonces" riot-value="{tarjeta.criterios.entonces}"> <input hidden="hidden" name="backlog" type="text" required="required" riot-value="{tarjeta.backlog}"> <input hidden="hidden" name="proyecto" type="text" riot-value="{proyecto._id}" required="required"> </div> </div> </div> <div class="modal-footer"> <div class="row"> <div class="col-sm-6"> <select class="form-control" name="valor" required="required"> <option value="" selected>Valor</option> <option>1</option> <option>2</option> <option>3</option> <option>5</option> <option>8</option> </select> </div> <div class="col-sm-6"> <button class="btn btn-default" type="submit">Agregar</button> <button class="btn btn-info" type="button" data-dismiss="modal">Cerrar</button> </div> </div> </div> </form> </div> </div> </div>', '', '', function(opts) {
    var OptsMixin = {
      init: function() {
        this.on('updated', function() { console.log('Updated!') })
      },

      getOpts: function() {
        return this.opts
      },

      setOpts: function(opts, update) {
        this.opts = opts
        if (!update) this.update()
        return this
      }
    }
    this.mixin(OptsMixin)
    this.proyecto = opts.proyecto
    this.tarjeta = opts.tarjeta || {narrativa: {}, criterios: {}}

    this.enviar = function(e) {
      e.preventDefault()
      $('#CardModal').modal('hide')
      return true
    }.bind(this)
});
