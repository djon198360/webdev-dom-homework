//обЪявляем переменные
const container = document.querySelector('.container');
const commentList = document.querySelector('.comments');
const addForm = document.querySelector('.add-form');
const userName = document.querySelector('.add-form-name');
const textCommment = document.querySelector('.add-form-text');
const button = document.querySelector('.add-form-button');
const comments = document.querySelectorAll('.comment');
function dateFormat() {
    const date = new Date();
    (date.getDate() < 10) ? dd = '0' + date.getDate() : dd = date.getDate();
    (date.getMonth() < 10) ? MM = '0' + (date.getMonth() + 1) : MM = (date.getMonth() + 1);
    (date.getFullYear()) ? YY = date.getFullYear().toString().slice(-2) : YY = date.getFullYear().toString().slice(-2);
    (date.getHours() < 10) ? hh = '0' + date.getHours() : hh = date.getHours();
    (date.getMinutes() < 10) ? mm = '0' + date.getMinutes() : mm = date.getMinutes();
    return `${dd}.${MM}.${YY} ${hh}:${mm}`;
}
container.addEventListener('click', (e) => {
    const target = e.target.classList[0];
    const id = e.target.dataset.id;
    switch (target) {
        case 'like-button': initLikeClick(id);
            break;
        case 'del-comment': delClick(id);
            break;
        case 'edit-comment': editClick(id);
            editValid();
            break;
        case 'edit-form-button': saveEditComment(id);
            break;
        default: break;
    }
})

const commentsListArray = [
    {
        name: "Глеб Фокин",
        date: "12.02.22 12:18",
        msg: "Это будет первый комментарий на этой странице",
        like: "3",
        Iliked: false,
        isEdit: false,
    },
    {
        name: "Варвара Н.",
        date: "13.02.22 19:22",
        msg: "Мне нравится как оформлена эта страница! ❤",
        like: "75",
        Iliked: false,
        isEdit: false,
    },
    {
        name: "Евген",
        date: "01.05.23 13:01",
        msg: "Ничего не понимаю , но интересно ",
        like: "1",
        Iliked: true,
        isEdit: false,
    }
];
const addLikes = (id) => {
    commentsListArray[id].like++;
    commentsListArray[id].Iliked = true;
}
const delLikes = (id) => {
    commentsListArray[id].like--;
    commentsListArray[id].Iliked = false;
}
const initLikeClick = (id) => {
    (commentsListArray[id].Iliked) ? delLikes(id) : addLikes(id);
    renderComments();
}
const editClick = (id) => {
    commentsListArray[id].isEdit = true;
    renderComments();
}
const saveEditComment = (id) => {
    const date = new Date(); // дата
    const editText = document.querySelector('.edit-form-text');
    if (editText.value.length > 10) {
        commentsListArray[id].date = dateFormat();
        commentsListArray[id].msg = editText.value;
        commentsListArray[id].isEdit = false;
        renderComments();
    } else {
        editText.classList.add('error');
    }
}
function editValid() {
    const editText = document.querySelector('.edit-form-text');
    const editButton = document.querySelector('.edit-form-button');
    editText.addEventListener('input', () => {
        if (editText.value.length > 10) {
            editText.classList.remove('error');
            editButton.removeAttribute('disabled');
        } else {
            editText.classList.add('error');
            editButton.setAttribute('disabled', '');
        }
    });
}
const delClick = (id) => {
    commentsListArray.splice(id, 1);
    renderComments();
}
function renderComments() {
    const commentHtmlResult = commentsListArray.map((comment, id) => {
        (comment.Iliked) ? Iliked = '-active-like' : Iliked = '';
        if (comment.isEdit) {

            return `<div class="add-form">
                    <textarea
                    type="textarea"
                    class="edit-form-text"
                    rows="4">${comment.msg}</textarea>
                    <div class="add-form-row">
                    <button data-id="${id}" class="edit-form-button save_button">Сохранить</button>
                    </div>
                    </div>`
                ;


        } else {

            return `<li class="comment" data-id="${id}">
                    <div class="comment-header">
                    <div>${comment.name}</div>      
                    <div>${comment.date}</div>   
                    </div>
                    <div class="comment-body">
                    <div class="comment-text" data-id="${id}">
                    ${comment.msg}
                    </div>
                    </div>
                    <div class="comment-footer">
                    <div class="comment-func">
                        <div><span class="edit-comment" data-id="${id}" title="Редактироать">&#9998;</span></div>
                        <div><span class="del-comment" data-id="${id}" title="Удалить">&#10008;</span></div>
                        </div>
                    
                    <div class="likes">
                        <span class="likes-counter" >${comment.like}</span>
                        <button class="like-button ${Iliked}" data-id="${id}"></button>
                    </div>
                </div>
                </li>`;
        }
    }).join("");
    commentList.innerHTML = commentHtmlResult;
    //   initLikeClick();
    // editClick();

    //   saveEditComment();
}
function valiate() { //функция валидации простая
    if (userName.value.length === 0) { //если имя === 0
        userName.classList.add('error'); //ставим класс
        return false; //возвращаем false 
    } else { userName.classList.remove('error'); } // иначе удаляем
    if (textCommment.value.length < 10) {// если количество символов коммента менше 10 
        textCommment.classList.add('error'); //ставим класс 
        return false; //возвращаем false
    } else { textCommment.classList.remove('error'); } //иначе удаляе класс

    if (userName.value.length > 0 && textCommment.value.length >= 10) { //если  оба поля заполнены 
        return true; //возвращаем true
    }
    else {
        return false; //возвращаем false
    }
}
function addComment() { //функция  добавления коммента
    const validate = valiate(); //присваиваем переменной результат валидации
    const date = new Date(); // дата
    if (validate) { //если true 
        commentsListArray.push({
            name: userName.value,
            date: dateFormat(),
            msg: textCommment.value,
            like: 0,
        });
        renderComments();
        textCommment.value = "";// очищаем поле коммента имя не трогаем 
        button.setAttribute('disabled', '');
    }
}

button.addEventListener('click', (event) => { // если клик по буттон
    addComment();
});

addForm.addEventListener('input', (event) => { //отслеживаем ввод 
    const validate = valiate();
    (validate) ? button.removeAttribute('disabled') : button.setAttribute('disabled', '');
});

addForm.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.keyCode == 13) { addComment(); } // если нажата Ctrl + Enter
});

if (document.querySelector('.edit-form-text')) {
    const editText = document.querySelector('.edit-form-text');
    const editButton = document.querySelector('.edit-form-button');

    editText.addEventListener('input', () => {
        if (editText.value.length > 10) {
            editButton.removeAttribute('disabled');
        }
    });
}

renderComments();