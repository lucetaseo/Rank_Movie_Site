// 조민수 시작포인트
// TMDB 에서  영화 가져온것
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OWIwNDE1OTlmNzBkMDkwYjVmYTg2NjJlOWNkYTVhZCIsInN1YiI6IjY2MmE0NzFmMWM2YWE3MDBiMjkyNzg3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.P1vJ1UkEQN1GdOv7kd_C2XL1bxFKy16ySE3ZvkrXtxU'
    }
};

async function getdata() {

    const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1', options)
    const data = await response.json()

    const newmovieinfo = [];

    for (let item of data['results']) {
        const movieinfo = {};
        movieinfo['title'] = item['title'];
        movieinfo['overview'] = item['overview'];
        movieinfo['poster_path'] = item['poster_path'];
        movieinfo['vote_average'] = item['vote_average'];
        movieinfo['movie_id'] = item['id'];


        newmovieinfo.push(movieinfo);

    }
    return newmovieinfo;


}

//  영화 감독 출연진 정보에 대한 api가져오기
async function getdetail(id) {

    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=es_US`, options)
    const data = await response.json()

    const newmoviedetail = [];
    newmoviedetail.push(data.cast)
    newmoviedetail.push(data.crew)

    return newmoviedetail;
}


//  영화트레일러 api
async function getvideo(id) {
   console.log(id);
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    const data = await response.json()
    // console.log(data);
    let newvideo;
    newvideo = data.results

    return newvideo;
}





//카드 만들기
function makeCard(item) {
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

//   카드 커지기
function zoomIn(event) {
    event.target.style.transform = "scale(1.07)"; //1.2배 확대
    event.target.style.zIndex = 1;
    event.target.style.transition = "all 0.5s"; // 속도
}

function zoomOut(event) {
    event.target.style.transform = "scale(1)";
    event.target.style.zIndex = 0;
    event.target.style.transition = "all 0.3s";
}

//출력하기

async function print() {
    const data = await getdata();
    let count = 0;
    data.forEach(function (item) {
        makeCard(item);

        count++;
    });

}
print();

// 조민수 끝나는포인트