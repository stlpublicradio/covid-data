import { readJSON, writeJSON } from 'https://deno.land/x/flat@0.0.14/mod.ts'
import dayjs from "https://cdn.skypack.dev/dayjs@1.10.4";

const filename = Deno.args[0] // equivalent to writing `const filename = 'btc-price.json'`
const data = await readJSON(filename)
const output = await readJSON('output/covid.json')


var sorted = data.sort((a,b) => {
    return new Date(b.submission_date) - new Date(a.submission_date); // descending
}).slice(0,7)

// make sure we're using a full week's worth of data
var day_1 = dayjs(sorted[0].submission_date)
var day_2 = dayjs(sorted[6].submission_date)

if (day_1.diff(day_2,'days') == 6) {
    var cases = {'date': dayjs(sorted[0].submission_date).format('YYYY-MM-DD'), 'cases': +sorted[0].tot_cases,'new_cases':sorted[0].tot_cases - sorted[6].tot_cases,'deaths': +sorted[0].tot_death,'new_deaths':sorted[0].tot_death - sorted[6].tot_death,}

    output[sorted[0].state].cases = cases

    const newfile = `output/covid.json`
    await writeJSON(newfile, output)


}

// var local = data.vaccination_data.filter(d => d.Location == 'MO' || d.Location == 'IL')

// var states = ['MO','IL']

// states.forEach(function(d) {
//     var source = local.filter(k => k.Location == d)[0]
    
//     var vaccinations = {'data': source.Date, 'first_dose': source.Administered_Dose1_Recip, 'complete': source.Series_Complete_Yes}

//     output[d].vaccinations = vaccinations
// })

// const newfile = `output/covid.json`
// await writeJSON(newfile, output)
