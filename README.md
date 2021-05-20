# covid-data

Testing the [Flat Data](https://octo.github.com/projects/flat-data) method to acquire and transform COVID data.

## What's in here?

This uses GitHub Actions, Flat Data and [Simon Willison's Git Scraping](https://simonwillison.net/2020/Oct/9/git-scraping/) methodology to pull CDC data on COVID cases and vaccinations into the repo, then a post-processing script using Deno to extract the data into a simple JSON file with current vaccination data and case/death counts for Missouri and Illinois.

The workflow is in [`.github/workflows/flat.yml`](https://github.com/stlpublicradio/covid-data/blob/main/.github/workflows/flat.yml) — I used the [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=GitHubOCTO.flat) to generate it, but you could write it by hand if you want.

The raw data is scraped into the `data` folder. The post-processing scripts are in the `scripts` folder and the output file is in the `output` folder.

## Ok, how does it work?

The workflow script gets the data from the CDC:

- For vaccinations, the data comes from here: [https://covid.cdc.gov/covid-data-tracker/COVIDData/getAjaxData?id=vaccination_data](https://covid.cdc.gov/covid-data-tracker/COVIDData/getAjaxData?id=vaccination_data)
- For cases and deaths, the data comes from here: [https://data.cdc.gov/resource/9mfq-cb36.json](https://data.cdc.gov/resource/9mfq-cb36.json). For the case and death data, I'm pulling it twice, once with a parameter for each state (e.g. `?state=MO`). This is because it's time-series data and I don't want to pull all the rows for all the states.

After getting each set of data, the workflow runs a post-processing script. For the vaccination data, I filter it to Missouri and Illinois, then overwrite the output file with the current data's date, the number of people receiving their first dose and the number of people who have completed vaccinations. For the case/death data, I get the most current value for each metric for each state, and additionally I calculate the 7-day change.

The output file is a JSON file with an entry for Missouri and Illinois with both case/death data and vaccination data.