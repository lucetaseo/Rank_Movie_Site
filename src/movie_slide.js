import { getdata } from "./movie.js"

const $carouselIndicator = document.querySelector(".carousel-indicators");
const $carouselItem = document.querySelector(".carousel-inner");

// data에서 상위 5개만큼 슬라이드에 추가
export const makeMovieSlide = async function () {
    const data = await getdata();
    const NUM_OF_SLIDE = 5;

    for (let i = 0; i < NUM_OF_SLIDE; i++) {
        addMovieSilde("https://image.tmdb.org/t/p/w500" + data[i].poster_path, i);
    }
}

// 슬라이드에 항목 추가
const addMovieSilde = (poster_path, index) => {
    let carouselIndicator;
    let carouselItem;

    if (index === 0) {
        // 이미 active인 0번 슬라이드가 있을 경우 active속성 제거를 위한 기능 필요
        carouselIndicator = `<button type="button" data-bs-target="#carouselExampleIndicators" 
                                data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1">
                            </button>`
        carouselItem = `<div class="carousel-item active">
                            <img src="${poster_path}" id="img_${index}"
                                class="d-block w-100" alt="movie poster 0">
                        </div>`;
    } else {
        carouselIndicator = `<button type="button" data-bs-target="#carouselExampleIndicators" 
                                data-bs-slide-to="${index}" aria-label="Slide ${index + 1}">
                            </button>`
        carouselItem = `<div class="carousel-item">
                            <img src="${poster_path}" id="img_${index}"
                                class="d-block w-100" alt="movie poster ${index}">
                        </div>`
    }
    $carouselIndicator.insertAdjacentHTML('beforeend', carouselIndicator);
    $carouselItem.insertAdjacentHTML('beforeend', carouselItem);
    addMovieSildeClickEvent(index);
}

// click 이벤트 생성
const addMovieSildeClickEvent = (index) => {
    // 캐러셀의 슬라이드 트렌지션이 완료했을 때 발생
    document.querySelector(".carousel").addEventListener('slide.bs.carouse1',(event) => {
        console.log(event.from);
        document.getElementById(`img_${index}`).addEventListener("click",() => {
            // 클릭 시 나오는 함수 작성
            alert('클릭');
        })
        alert('클릭2');
    }) 

    // document.getElementById(`img_${index}`).addEventListener("click", () => {
    //     // 클릭 시 나오는 함수 작성
    //     alert('클릭');
    // })

    //console.log(document.getElementById(`img_${index}`));
}
