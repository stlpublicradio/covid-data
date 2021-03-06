import { readJSON, writeJSON } from 'https://deno.land/x/flat@0.0.14/mod.ts'

const filename = Deno.args[0] // equivalent to writing `const filename = 'btc-price.json'`
const data = await readJSON(filename)
const output = await readJSON('output/covid.json')

var local = data.vaccination_data.filter(d => d.Location == 'MO' || d.Location == 'IL')

var states = ['MO','IL']

states.forEach(function(d) {
    var source = local.filter(k => k.Location == d)[0]
    
    var vaccinations = {'date': source.Date, 'first_dose': source.Administered_Dose1_Recip, 'complete': source.Series_Complete_Yes}

    output[d].vaccinations = vaccinations
})

const newfile = `output/covid.json`
await writeJSON(newfile, output)
