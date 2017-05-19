abilities-list
    ul
        li(each='{ item, i in items }') { item.nombre + ': ' + item.rank } 
            i(class='fa fa-times' onclick='{ remove }')

    input(ref='input' class='form-control')
    select(ref='rank' class='form-control')
        option Junior
        option Senior
        option Master
    button(onclick='{ add }' class='form-control') Agregar habilidad
    input(name='habilidades' hidden='hidden' ref='habs' required='required')

    script.
        this.items =  opts.habilidades || []

        add(e) {
            e.preventDefault()
            let input = this.refs.input
            let rank = this.refs.rank
            this.items.push({nombre: input.value, rank: rank.value})
            input.value = ''
            this.refs.habs.value = JSON.stringify(this.items)
        }
        
        remove(e) {
            e.preventDefault()
            this.items.splice(e.item.i, 1)
            this.refs.habs.value = JSON.stringify(this.items)
        }