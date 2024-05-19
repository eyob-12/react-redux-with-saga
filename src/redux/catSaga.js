import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { getCatsSuccess } from './catSlice';

function* workGetCatsFetch() {
    try {
        const response = yield call(axios.get, 'https://api.thecatapi.com/v1/breeds');
        const cats = response.data;

        // Add the image URL to each cat object
        const catsWithImages = cats.map(cat => ({
            ...cat,
            url: `https://cdn2.thecatapi.com/images/${cat.reference_image_id}.jpg`
        }));

        const shortenedCats = catsWithImages.slice(0, 10);

        yield put(getCatsSuccess(shortenedCats));
    } catch (error) {
        console.error('Error fetching cats:', error);
        // You can also dispatch a failure action here if you have one
    }
}

function* catSaga() {
    yield takeEvery('cats/getCatsFetch', workGetCatsFetch);
}

export default catSaga;
