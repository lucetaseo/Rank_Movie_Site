import { getdata } from './movie.js';

const $carouselIndicator = document.querySelector('.carousel-indicators');
const $carouselItem = document.querySelector('.carousel-inner');

// TMDB API MOVEIS-Images 데이터 가져오기
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3N2M5NTE5NGJmNmQxNTRjMTAyODEyZWFkNmZmZGIzMyIsInN1YiI6IjY2MmVkZWI3ZTMzZjgzMDEyODIxYjY3YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._pBtT4wAn0hnLFf8LKD2dPzrGwfE-364B4Pw2ow_siY',
  },
};

const getImgdata = async function () {
  let imgdata = [];
  const totaldata = await getdata();

  return await Promise.all(
    totaldata.map((item) => matchImageById(item.movie_id)),
  )
    .then((data) => {
      imgdata = data;

      return [totaldata, imgdata];
    })
    .catch((error) => {
      // 오류 처리
      console.error('데이터를 가져오는 중 오류가 발생했습니다.', error);
    });
};

const matchImageById = async function (id) {
  const response = await fetch(
    'https://api.themoviedb.org/3/movie/' + id + '/images',
    options,
  );
  const data = await response.json();

  return data.backdrops[0].file_path;
};

// data에서 상위 10개만큼 슬라이드에 추가
export const makeMovieSlide = async function () {
  const data = await getImgdata();
  const moviedata = data[0];
  const imgdata = data[1];
  const NUM_OF_SLIDE = 10;

  for (let i = 0; i < NUM_OF_SLIDE; i++) {
    addMovieSilde(moviedata[i], imgdata[i], i);
  }
};

// 슬라이드에 항목 추가
const addMovieSilde = (moviedata, imgdata, index) => {
  let carouselIndicator;
  let carouselItem;

  if (index === 0) {
    carouselIndicator = `<button type="button" data-bs-target="#carouselExampleIndicators" 
                                data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1">
                            </button>`;
    carouselItem = `<div class="carousel-item active">
                            <img src="https://image.tmdb.org/t/p/w500${imgdata}" id="img_slide_${moviedata.movie_id}"
                                class="d-block w-100" alt="movie poster 0">
                            <div class="carousel-caption d-none d-md-block">
                                <h5>${moviedata.title}</h5>
                            </div>
                        </div>`;
  } else {
    carouselIndicator = `<button type="button" data-bs-target="#carouselExampleIndicators" 
                                data-bs-slide-to="${index}" aria-label="Slide ${
      index + 1
    }">
                            </button>`;
    carouselItem = `<div class="carousel-item">
                            <img src="https://image.tmdb.org/t/p/w500${imgdata}" id="img_slide_${moviedata.movie_id}"
                                class="d-block w-100" alt="movie poster ${index}">
                            <div class="carousel-caption d-none d-md-block">
                                <h5>${moviedata.title}</h5>
                            </div>
                        </div>`;
  }
  $carouselIndicator.insertAdjacentHTML('beforeend', carouselIndicator);
  $carouselItem.insertAdjacentHTML('beforeend', carouselItem);
  addMovieSildeClickEvent(moviedata.movie_id);
};

// click 이벤트 생성
const addMovieSildeClickEvent = (id) => {
  document.getElementById(`img_slide_${id}`).addEventListener('click', () => {
    // 클릭 시 나오는 함수 작성
    alert('movie_id: ' + id);
  });
};
