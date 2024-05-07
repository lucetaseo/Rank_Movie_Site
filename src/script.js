import { getdata, print } from './movie.js';
import { makeMovieSlide } from './movie_slide.js';

// 슬라이드
async function test() {
  await makeMovieSlide();
}
test();

// 카드
print();
