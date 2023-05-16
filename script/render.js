import { createSection } from "./builder.js"
import { createCountryName } from "./createCountries.js"
import fetchRequest from "./fetchRequest.js"

export const getCurrentNews = (country) => {
    const currentCountryFyllName = createCountryName(country);
    return Promise.all([
     fetchRequest(`top-headlines?country=${country}`,{
         callback: createSection,
         title: `Свежие новости в стране ${currentCountryFyllName}`,
         amountOfNews: 8,
         sectionClass: 'hot-news',
         headers: {
             'X-Api-Key': 'e9096cc9305b42dd9d2013e23174f2a6',
           },
     })
    ])
 }
