backlog-modal
  #BacklogModal.modal.fade(role='dialog')
    .modal-dialog
      // Modal content
      .modal-content
        form(id='add-backlog' name='add-backlog' onsubmit='{ enviar }')
          .modal-header
            button.close(type='button' data-dismiss='modal') ×
            h4.modal-title Agregar backlog
          .modal-body
            .row
              .col-sm-12.form-group
                input.form-control(name='tipo' required='required' type='text' placeholder='Nombre del Backlog' ref='tipo')
          .modal-footer
            .row
              button.btn.btn-default(type='submit') Agregar
              button.btn.btn-info(type='button' data-dismiss='modal') Cerrar
      script.
        this.proyecto = opts.proyecto
        let xhttp = new XMLHttpRequest()

        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
               $('#BacklogModal').modal('hide')
            }
        };
        enviar(e) {
          e.preventDefault()
          xhttp.open('POST', '/kanban/' + this.proyecto._id, true)
          xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          xhttp.send('tipo='+this.refs.tipo.value)
        }
        
        
        
