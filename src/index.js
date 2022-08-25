import './sass/index.scss'
import NewsApiService from './js/new-service'
import hitTpl from './js/templates/hit.hbs';
import LoadMoreBtn from './js/components/load-more-btn';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
    searchForm: document.querySelector('.js-search-form'),
    hitsConteiner: document.querySelector('.gallery'),
};

const loadMoreBtn = new LoadMoreBtn({
    selector: '.load-more-btn',
    hidden: true,
});
const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchHits);

async function onSearch(e) {
    e.preventDefault(); 
    console.log('test');
    newsApiService.setQuery(e.currentTarget.elements.query.value);
    clearTotalHitsContainer();
   

    if (newsApiService.getQuery() === '') {
        Notiflix.Notify.warning('введіть щось для пошуку')
        loadMoreBtn.disabled();
        return appendTotalHitsMarkup('');
    } else {
        const data = await newsApiService.fetchhits();

        if (data.hits.length === 0) {
            Notiflix.Notify.failure('Sorry, there are no more images matching your search query. Please try new search.');
            loadMoreBtn.hide();
        } else {
            Notiflix.Notify.success(`Hooray! We found ${data.total} images.`);
            loadMoreBtn.show();
            newsApiService.resetPage();
            appendTotalHitsMarkup(data.hits);
            newsApiService.incrementPage();
        }
    };
}

async function fetchHits() {
    newsApiService.incrementPage();
        loadMoreBtn.disabled();
        await newsApiService.fetchhits().then(({ hits }) => {
        appendTotalHitsMarkup(hits);
        loadMoreBtn.enable();
        });
    if (newsApiService.currentPage + 1 > newsApiService.totalPage) {
       loadMoreBtn.disabled(); 
    }
}




function appendTotalHitsMarkup(hits) {
    refs.hitsConteiner.insertAdjacentHTML('beforeend', hitTpl(hits));
    newsApiService.createGallery();
}

function clearTotalHitsContainer() {
    refs.hitsConteiner.innerHTML = '';
}





