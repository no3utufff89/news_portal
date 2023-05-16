import { createCountryName } from "./createCountries.js";
import { getCurrentNews } from "./render.js";
import preload from "./preload.js";

export const createSection = (err, data, title, amountOfNews, sectionClass) => {
    if (err) {
        console.warn(err, data)
        return
    }
    // Создаем секцию
    const section = document.createElement('section');
    section.className = `${sectionClass} section`;

    const sectionHeaderBlock = document.createElement('div');
    sectionHeaderBlock.className = 'section-header';
    const container = document.createElement('div');
    container.className = 'container';

    const header = document.createElement('h1');
    header.className = 'page-header__text';
    header.textContent = title;

    container.append(header);
    sectionHeaderBlock.append(container);

    // Создаем Контейнер

    const contentContainer = document.createElement('div');
    contentContainer.className = 'container content';

    // contentContainer.append(createNewsCard(err, data));
    section.append(sectionHeaderBlock, contentContainer);

    const newsList = document.createElement('ul');
    newsList.className = 'news-list';
    if (data.totalResults < 1) {
        const warningMessage = document.createElement('p');
        contentContainer.prepend(warningMessage);
        warningMessage.textContent = 'Нет новостей'
    }
    const news = data.articles.map(item => {


        // Карточка новости
        const newsCard = document.createElement('li');
        newsCard.className = 'news-list__item';
        const article = document.createElement('article');
        article.className = 'news-article';

        // Картинка новости
        const image = new Image(270, 200);
        image.src = item.urlToImage;
        image.className = 'news-article__image';
        image.alt = 'Картинка новости'
        if (item.urlToImage === null) {
            image.src = './assets/img/no-image.jpg'
        }
        //Тело новости

        const newsContent = document.createElement('div');
        newsContent.className = 'news-articel__content';

        //Тайтл (ссылка)
        const newsTitle = document.createElement('a');
        newsTitle.className = 'news-article__title';
        newsTitle.textContent = item.title;
        newsTitle.href = item.url;
        newsTitle.target = '_blank';

        //Краткое содержание новости
        const newsPreview = document.createElement('p');
        newsPreview.className = 'news-articel__preview';
        newsPreview.textContent = item.description;

        //Стрелка (декор)
        const decor = document.createElement('div');
        decor.className = 'decor';

        newsContent.append(newsTitle, newsPreview, decor)

        //Футер новости (данные)
        const newsFooter = document.createElement('div');
        newsFooter.className = 'news-article__footer';

        const newsDate = document.createElement('p');
        newsDate.className = 'news-article__date';
        newsDate.textContent = '16/03/2022';

        const newsTime = document.createElement('p');
        newsTime.className = 'news-article__time';
        newsTime.textContent = '11:06';

        const newsAuthor = document.createElement('p');
        newsAuthor.className = 'news-article__author';
        newsAuthor.textContent = item.author;

        newsFooter.append(newsDate, newsTime, newsAuthor);


        //Сборка

        article.append(image, newsContent, newsFooter);
        newsCard.append(article);
        return newsCard;
    })
    news.splice(amountOfNews);
    newsList.append(...news);
    contentContainer.append(newsList);
    return section;
}

export const createSelect = (err, data) => {
    if (err) {
        console.warn(err, data)
        return
    }
    const countriesArray = [];
    data.sources.map(item => {
        countriesArray.push(item.country);
    })
    const uniqueCountries = Array.from(new Set(countriesArray)) ;

    const select = document.createElement('select');
    select.className = 'header-select';
    select.id = 'form-select';
    select.name = 'select';
    const option = document.createElement('option');
    option.value = '';
    option.textContent = 'Все страны';
    select.append(option)

    uniqueCountries.forEach(item => {
        const option = document.createElement('option');
        option.value = item;
        option.textContent = createCountryName(item);
        select.append(option);
        if(option.value === 'ru') {
            option.setAttribute('selected', 'selected')
        }
        })
    
    select.addEventListener('change', (e) => {
        preload.show();
        e.preventDefault();
        const currentCountry = select.value;
        document.querySelector('.hot-news').remove();
        getCurrentNews(currentCountry).then(data => {
            preload.remove()
            document.querySelector('.main').append(data[0]);
        })
    })

    return select;
}