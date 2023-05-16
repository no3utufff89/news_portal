export const createCountryName = (item) => {
    const countries = [
       
        {name:'au', fullName: 'Австралия'},
        {name:'no', fullName: 'Норвегия'},
        {name:'it', fullName: 'Италия'},
        {name:'sa', fullName: 'Саудовская Аравия'},
        {name:'pk', fullName: 'Пакистан'},
        {name:'gb', fullName: 'Соединенное Королевство'},
        {name:'de', fullName: 'Германия'},
        {name:'br', fullName: 'Бразилия'},
        {name:'ca', fullName: 'Канада'},
        {name:'es', fullName: 'Испания'},
        {name:'ar', fullName: 'Аргентина'},
        {name:'fr', fullName: 'Франция'},
        {name:'in', fullName: 'Индия'},
        {name:'is', fullName: 'Исландия'},
        {name:'ru', fullName: 'Россия'},
        {name:'se', fullName: 'Швеция'},
        {name:'za', fullName: 'Южная Африка'},
        {name:'ie', fullName: 'Ирландия'},
        {name:'nl', fullName: 'Нидерланды'},
        {name:'zh', fullName: 'Китай'},
        {name:'us', fullName: 'США'},
    ]
    let countryName = countries.find(country => country.name === item).fullName;
    
    return countryName
}