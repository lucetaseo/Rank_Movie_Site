// 조민수 시작포인트
// TMDB 에서  영화 가져온것
const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OWIwNDE1OTlmNzBkMDkwYjVmYTg2NjJlOWNkYTVhZCIsInN1YiI6IjY2MmE0NzFmMWM2YWE3MDBiMjkyNzg3MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.P1vJ1UkEQN1GdOv7kd_C2XL1bxFKy16ySE3ZvkrXtxU"
    }
};

async function getdata() {
    const response = await fetch("https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1", options);
    const data = await response.json();

    const newmovieinfo = [];

    for (let item of data["results"]) {
        const movieinfo = {};
        movieinfo["title"] = item["title"];
        movieinfo["overview"] = item["overview"];
        movieinfo["poster_path"] = item["poster_path"];
        movieinfo["vote_average"] = item["vote_average"];
        movieinfo["id"] = item["id"];

        newmovieinfo.push(movieinfo);
    }
    return newmovieinfo;
}

//  영화 감독 출연진 정보에 대한 api가져오기
async function getcredit(id) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=ko-KR`, options);
    const data = await response.json();
    console.log(data);

    const newmoviecredit = [];
    newmoviecredit.push(data.cast);
    newmoviecredit.push(data.crew);

    return newmoviecredit;
}

//  영화트레일러 api
async function getvideo(id) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=ko-KR`, options);
    const data = await response.json();
    console.log(data);
    let newvideo;
    newvideo = data.results;

    return newvideo;
}

//영화 비디오가 없을때

let newvideo = function novideo() {
    if (getvideo(id).length > 0) {
        return get[0].key;
    } else if (getvideo(id).length === 0) {
        return "관련영상이없습니다";
    }
};

// 영화디테일 api
async function getdetail(id) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=ko-KR`, options);
    const data = await response.json();
    let newdetail;
    newdetail = data;

    return newdetail;
}

async function makesubpage() {
    document.getElementById("mainContents").innerHTML = "";
    let id = location.href.split("?")[1];
    let tmp = ``;
    const details = await getdetail(id);
    const videos = await getvideo(id);
    if (videos.length > 0) {
        tmp = `<a href="https://www.youtube.com/watch?v=${videos[0].key}" target="_blank">
       https://www.youtube.com/watch?v=${videos[0].key} </a>`;
    } else if (videos.length === 0) {
        tmp = `관련영상이없습니다`;
    }
    const credits = await getcredit(id);
    const innerContents = `
    <div id="content" class="row">
    <div id="left_section" class="col text-center">
        <div id="moviePoster">
            <img src="https://image.tmdb.org/t/p/w500${details.poster_path}" alt="이미지준비중입니다" id="posterimg">
        </div>
    </div>
    <div id="right_section" class="col">
        <h2 id ="mtitle"> ${details.title}</h2>
        <p> 유트브 링크:${tmp} </p>
        <p> ${details.overview} </p>
        <strong> 영화 감독</strong>
        <p> ${credits[1][0].name}</p>
        <strong> 출연자 배우</strong>
        <p> ${credits[0][0].name}, ${credits[0][1].name}, ${credits[0][2].name},
        ${credits[0][3].name} </p>
    </div>
</div>
    `;
    document.querySelector("#mainContents").insertAdjacentHTML("beforeend", innerContents);
}

makesubpage();

// 조민수 끝나는포인트
