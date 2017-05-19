
riot.tag2('abilities-list', '<ul> <li each="{item, i in items}">{item.nombre + \': \' + item.rank} <i class="fa fa-times" onclick="{remove}"></i></li> </ul> <input class="form-control" ref="input"> <select class="form-control" ref="rank"> <option>Junior</option> <option>Senior</option> <option>Master</option> </select> <button class="form-control" onclick="{add}">Agregar habilidad</button> <input name="habilidades" hidden="hidden" ref="habs" required="required">', '', '', function(opts) {
    this.items =  opts.habilidades || []

    this.add = function(e) {
        e.preventDefault()
        let input = this.refs.input
        let rank = this.refs.rank
        this.items.push({nombre: input.value, rank: rank.value})
        input.value = ''
        this.refs.habs.value = JSON.stringify(this.items)
    }.bind(this)

    this.remove = function(e) {
        e.preventDefault()
        this.items.splice(e.item.i, 1)
        this.refs.habs.value = JSON.stringify(this.items)
    }.bind(this)
});