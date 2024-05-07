import { makeGenreForm } from "./genre_data.js";
// 신이지니 import

// 조민수 시작포인트
// TMDB 에서  영화 가져온것
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OWIwNDE1OTlmNzBkMDkwYjVmYTg2NjJlOWNkYTVhZCIsInN1YiI6IjY2MmE0NzFmMWM2YWE3MDBiMjkyNzg3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.P1vJ1UkEQN1GdOv7kd_C2XL1bxFKy16ySE3ZvkrXtxU'
    }
};


export async function getdata() {

    const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1', options)
    const data = await response.json()

    const newmovieinfo = [];

    for (let item of data.results) {
        const movieinfo = {};
        movieinfo['title'] = item['title'];
        movieinfo['overview'] = item['overview'];
        movieinfo['poster_path'] = item['poster_path'];
        movieinfo['vote_average'] = item['vote_average'];
        movieinfo['movie_id'] = item['id'];


        newmovieinfo.push(movieinfo);
    }

    //신이지니 시작
    makeGenreForm(data.results);

    return newmovieinfo;
}


//카드 만들기
export function makeCard(item) {
    const innerContents = `
    <div>
        <a href = "./detail.html?${item.movie_id}">
        <div class="card" style="width: 18rem;" id= "mvcard_${item.movie_id}">
        <img src="https://image.tmdb.org/t/p/w500${item.poster_path}" class="card-img-top" alt="이미지 준비중">
            <div class="card-body">
                <h3 class="card-title">${item.title}</h3>
                <p class="card-text">${item.overview}</p>
            </div>
            <div>
            <small class = "score"> "rating:${item.vote_average}</small>
            </div>
        </div>
        </a>
    </div>
    `;
    document.querySelector("#movieCard").insertAdjacentHTML('beforeend', innerContents);

    document.getElementById(`mvcard_${item.movie_id}`).addEventListener('click', async (e) => {
        await makeModal(item);
    });

}

//출력하기
export async function print() {
    const data = await getdata();
    let count = 0;
    data.forEach(function (item) {
        makeCard(item);

        count++;
    });

}
print();

// 조민수 끝나는포인트