list-selector-p
    ul
        li(each='{ item, i in items }')
            | { options? (personas[i][1] + ': ' + item[keys[1]]) : item }
            i(class='fa fa-times' onclick='{ remove }')

    yield(from='input')
    select(ref='options' class='form-control' if='{ opts.options }')
        option(each='{ op, i in opts.options }') { op }
    button.form-control.btn.btn-primary(onclick='{ add }') Agregar { opts.buttonName }
    input(name='{ opts.name }' hidden='hidden' ref='habs' required='required')

    script.
        this.items = opts.items || []
        this.options = opts.options
        this.keys = opts.keys
        this.personas = []
        add(e) {
            e.preventDefault()
            let input = this.refs.input,
                options = this.refs.options,
                item = {}
            this.persona= JSON.parse(input.value);
            this.personas.push(this.persona);
            if (opts.options) {
                item[this.keys[0]] = this.persona[0]
                item[this.keys[1]] = options.value
                            
                
            } else {
                item[this.keys[0]] = input.value
            }

            this.items.push(item)
            input.value = ''
            this.refs.habs.value = JSON.stringify(this.items)
        }

        remove(e) {
            e.preventDefault()
            this.items.splice(e.item.i, 1)
            this.personas.splice(e.item.i,1)
            this.refs.habs.value = JSON.stringify(this.items)
        }
