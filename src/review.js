function addComment() {
    var name = document.getElementById('name').value;
    var password = document.getElementById('password').value;
    var review = document.getElementById('review').value;
    var movieId = document.getElementById('movieId').value;
    // 저장할때 set 아이템 고유값 설정()

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;

    var commentId = generateUniqueId(); // 댓글 고유 아이디 생성

    var newComment = document.createElement('div');
    newComment.innerHTML = '<strong>' + name + '</strong> - ' + review;

    // 댓글을 로컬 스토리지에 저장
    var comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.push({ name: name, password: password, review: review, dateTime: dateTime });
    localStorage.setItem('comments', JSON.stringify(comments));

    var deleteButton = document.createElement('button');
    deleteButton.textContent = '삭제';
    deleteButton.addEventListener('click', function () {
        var inputPassword = prompt('비밀번호를 입력하세요:');
        if (inputPassword === password) {
            newComment.remove();

            var index = comments.findIndex(function(item) {
                return item.id === commentId;
            });
            comments.splice(index, 1);
            localStorage.setItem('comments', JSON.stringify(comments));
        } else {
            alert('비밀번호가 일치하지 않습니다.');
        }
    });
    newComment.appendChild(deleteButton);

    var commentContainer = document.getElementById('commentContainer');
    commentContainer.appendChild(newComment);

    document.getElementById('name').value = '';
    document.getElementById('password').value = '';
    document.getElementById('review').value = '';
}

document.getElementById('commentForm').addEventListener('submit', function (event) {
    event.preventDefault();
    addComment();
});

window.onload = function() {
    var movieId = document.getElementById('movieId').value;
    var comments = JSON.parse(localStorage.getItem('comments')) || [];
    var commentContainer = document.getElementById('commentContainer');
    comments.forEach(function(item) {
        if (item.movieId === movieId) { // 해당 영화의 댓글만 표시
            var newComment = document.createElement('div');
            newComment.id = item.id;
            newComment.innerHTML = '<strong>' + item.name + '</strong> - ' + item.review;
            var deleteButton = document.createElement('button');
            deleteButton.textContent = '삭제';
            deleteButton.addEventListener('click', function() {
                var inputPassword = prompt('비밀번호를 입력하세요:');
                if (inputPassword === item.password) {
                    newComment.remove(); 
                    var index = comments.findIndex(function(comment) {
                        return comment.id === item.id;
                    });
                    comments.splice(index, 1);
                    localStorage.setItem('comments', JSON.stringify(comments));
                } else {
                    alert('비밀번호가 일치하지 않습니다.');
                }
            });
            newComment.appendChild(deleteButton);
            commentContainer.appendChild(newComment);
        }
    });
};