tarjeta-selector
  card-modal(ref='cardModal')
  div#sortableKanbanBoards.row
    div.panel.panel-primary.kanban-col(each='{ backlog, i in backlogs }')
      div.panel-heading(onclick='{ toggle }') { backlog.tipo }
        i.fa.fa-2x.fa-plus-circle.pull-right
        button.btn.btn-danger.btn-sm.buttonBacklog.fa.fa-times(onclick="{ borrarBacklog }")
      div.panel-body(ondragover='{ allowDrop }' ondrop='{ drop }')
        div.kanban-centered(id='{ backlog._id }')
          article.kanban-entry.grab(draggable='true' each='{ tarjeta in backlog.tarjetas }' id='{ tarjeta._id }' ondragstart='{ drag }')
            div.kanban-entry-inner(onclick="{ openTarjeta }")
              div.kanban-label
                h2 Tarea con valor de { tarjeta.valor }
                p Como: { tarjeta.narrativa.como }
                p Quiere: { tarjeta.narrativa.quiero }
                p De manera que: { tarjeta.narrativa.manera }
                p Dado: { tarjeta.criterios.dado }
                p Cuando: { tarjeta.criterios.cuando }
                p Entonces: { tarjeta.criterios.entonces }
                strong { getNombre(tarjeta.asignado)  }
            button.btn.btn-danger.btn-ls.buttonTarjeta.fa.fa-times(onclick="{ borrarTarjeta }")
      div.panel-footer
        button.btn.btn-info.btn-sm(type='button' onclick='{ openTarjeta }') Agregar tarjeta
  div#processing-modal.modal.modal-static.fade(role='dialog' aria-hidden='true')
    div.modal-dialog
      div.modal-content
        div.modal-body
          div.text-center
            i.fa.fa-refresh.fa-5x.fa-spin
            h4 Procesando...
  script.
    this.backlogs = opts.backlogs
    this.proyecto = opts.proyecto
    //this.socket = io('http://localhost:3000')
    this.socket = io('https://scrum-draw.herokuapp.com')
    let sourceId;
    let self = this
    let xhttp = new XMLHttpRequest()

    borrarBacklog(e) {
      e.preventDefault()
      xhttp.open('DELETE', '/kanban/' + e.item.backlog._id, true)
      xhttp.send()
    }

    borrarTarjeta(e) {
      e.preventDefault()
      xhttp.open('DELETE', '/tarjetas/' + e.item.tarjeta._id, true)
      xhttp.send()
    }

    getNombre(asignado) {
      return this.proyecto.equipo_desarrollo.find(u => {
        return u._id == asignado
      }).local.nombre
    }

    openTarjeta(e) {
      this.refs.cardModal.setOpts({tarjeta: e.item.tarjeta || {narrativa: {}, criterios: {}}, backlog: e.item.tarjeta? e.item.tarjeta.backlog : e.item.backlog._id, users: this.proyecto.equipo_desarrollo})
      $('#CardModal').modal('show')
    }

    toggle(e) {
      $(e.target.parentElement.nextElementSibling)
      .slideToggle()
    }

    drag(e) {
      sourceId = e.item.tarjeta.backlog;
      e.dataTransfer.setData('text', e.target.id);
    }

    allowDrop(e) {
      e.preventDefault()
    }

    drop(e) {
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
    }

    this.socket.on('backlogs', message=>{
      xhttp.open('GET', '/kanban/backlogs/' + this.proyecto._id, true)
      xhttp.send()
    })

    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        //console.log(xhttp.responseText)
        self.update({backlogs: JSON.parse(xhttp.responseText)})
      }
    }

    let kanbanCol = $('.panel-body')
    kanbanCol.css('max-height', (window.innerHeight - 150) + 'px')

    let kanbanColCount = parseInt(kanbanCol.length)
    $('.container-fluid').css('min-width', (kanbanColCount * 350) + 'px')

card-modal
  #CardModal.modal.fade(role='dialog')
    .modal-dialog
      .modal-content
        form(id='crearTarjeta' onsubmit='{ enviar }')
          .modal-header
            button.close(type='button' data-dismiss='modal') ×
            h4.modal-title Agregar tarjeta
          .modal-body
            h5 Narrativa de la historia
            label(for='como') Como
            input.form-control(name='como' required='required' type='text' placeholder='Como' value='{ tarjeta.narrativa.como }')
            label(for='quiero') Quiero
            input.form-control(name='quiero' required='required' type='text' placeholder='Quiero' value='{ tarjeta.narrativa.quiero }')
            label(for='manera') De tal manera
            input.form-control(name='manera' required='required' type='text' placeholder='De tal manera' value='{ tarjeta.narrativa.manera }')
            label(for='dado') Dado
            h5 Criterios de aceptacion
            input.form-control(name='dado' required='required' type='text' placeholder='Dado' value='{ tarjeta.criterios.dado }')
            label(for='cuando') Cuando
            input.form-control(name='cuando' required='required' type='text' placeholder='Cuando' value='{ tarjeta.criterios.cuando }')
            label(for='entonces') Entonces
            input.form-control(name='entonces' required='required' type='text' placeholder='Entonces' value='{ tarjeta.criterios.entonces }')
            label(for='asignado') Asignado
            select.form-control(name='asignado')
              option(value='') Elige una persona
              option(each='{ user in opts.users }' value='{ user._id }' selected='{ user._id == tarjeta.asignado }') { user.local.nombre }
            |
            input(hidden name='backlog' type='text' required='required' value='{ backlog }')
            input(hidden name='_id' type='text' value='{ tarjeta._id }')
            |
            label(for='valor') Valor
            select.form-control(name='valor' required='required')
              option(value='' selected='{ !tarjeta }') Valor
              option(each='{ op in [1,2,3,5,8] }' value='{ op }' selected='{ tarjeta.valor == op }') { op }
          .modal-footer
            button.btn.btn-default(type='submit') Agregar
            button.btn.btn-info(type='button' data-dismiss='modal') Cerrar
  script.
    this.tarjeta = opts.tarjeta || {narrativa: {}, criterios: {}}
    this.backlog = opts.backlog || this.tarjeta.backlog
    let xhttp = new XMLHttpRequest()

    enviar(e) {
      e.preventDefault()
      if (!this.tarjeta._id) xhttp.open('POST', '/tarjetas')
      else xhttp.open('POST', '/tarjetas?_method=PUT')
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send($('#crearTarjeta').serialize())
    }

    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        //console.log(xhttp.responseText)
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
