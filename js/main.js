import { fetchRequest } from "./api.js";
import { commentsListArray } from "./data.js";
import { delay, htmlSpecialChars, isValiate } from "./function.js";
import { renderComments } from "./render.js";

//обЪявляем переменные
export const container = document.querySelector('.container');
export const commentList = document.querySelector('.comments');
export const addForm = document.querySelector('.add-form');
export const userName = document.querySelector('.add-form-name');
export const editName = document.querySelector('.edit-form-name');
export const textCommment = document.querySelector('.add-form-text');
export const button = document.querySelector('.add-form-button');
export const comments = document.querySelectorAll('.comment');
export const loader = document.querySelector('.loader');

//Найдена на просторах инета


window.addEventListener('load', () => {
    loader.classList.remove('loader_visible');
    loader.classList.add('loader_hidden');
});

//показывем ошибки
export function errorShow(text_error, code) {
    const error_popap = document.querySelector('.error_popap');
    const error_popap__h2 = document.querySelector('.error_popap__h2');
    const error_popap__p = document.querySelector('.error_popap__p');
    error_popap__h2.textContent = `Ошибка ${code}`;
    error_popap__p.textContent = text_error;
    error_popap.classList.remove('error_popap__hide')
    loader.classList.remove('loader_visible');
    loader.classList.add('loader_hidden');
    addForm.style.visibility = "visible";
}
//скрываем ошибки
export function errorHide() {
    const error_popap = document.querySelector('.error_popap');
    const error_popap__h2 = document.querySelector('.error_popap__h2');
    const error_popap__p = document.querySelector('.error_popap__p');
    error_popap__h2.textContent = '';
    error_popap__p.textContent = '';
    error_popap.classList.add('error_popap__hide');
}
//устанока лайка
const addLikes = (id) => {
    delay(2000).then(() => {
        commentsListArray[id].likes++;
        commentsListArray[id].isLiked = true;
        renderComments();
    });
}
//удаление лайка
const delLikes = (id) => {
    commentsListArray[id].isLikeLoading = true;
    delay(2000).then(() => {
        commentsListArray[id].likes--;
        commentsListArray[id].isLiked = false;
        renderComments();
    });
}
//проверка лайкнуто или нет
const initLikeClick = (id) => {
    (commentsListArray[id].isLiked) ? delLikes(id) : addLikes(id);

}
//редактирование 
const editClick = (id) => {
    commentsListArray[id].isEdit = true;
    renderComments();
    const editFormText = document.querySelector('.edit-form-text');
    editFormText.scrollIntoView({ behavior: "smooth" });
}
//сохраняем редактирование
const editValid = (id) => {
    const editText = document.querySelector('.edit-form-text');
    const editButton = document.querySelector('.edit-form-button');
    editText.addEventListener('input', () => {
        if (isValiate(editText.value)) {
            editText.classList.remove('error');
            editButton.removeAttribute('disabled');

        } else {
            editText.classList.add('error');
            editButton.setAttribute('disabled', '');
        }
    });
}
const saveEditComment = (id) => {
    const editText = document.querySelector('.edit-form-text');
    if (isValiate(editText.value)) {
        const data = JSON.stringify({
            id: id,
            name: commentsListArray[id].author.name,
            text: htmlSpecialChars(editText.value),
        });
        commentsListArray[id].isEdit = false;
        fetchRequest("POST", data);
    } else {
        editText.classList.add('error');
    }
}
//удаление
const delClick = (id) => {
    commentsListArray.splice(id, 1);
    renderComments();
}
//цитата 
function quoteComment(id) {
    const comment_body = document.querySelectorAll('.comment-text');
    textCommment.scrollIntoView({ behavior: "smooth" });
    const quoteText = `[quote=${commentsListArray[id].author.name}]\n${commentsListArray[id].text}[/quote]\n`;
    textCommment.value += quoteText;
}
//добавка коммента
function addComment() { 
    if (isValiate(textCommment.value), isValiate(userName.value)) { 
        const body = JSON.stringify({
            name: htmlSpecialChars(userName.value),
            forceError: true,
            text: htmlSpecialChars(textCommment.value),
            like: 0,
        });

        addForm.style.visibility = "hidden";
        loader.classList.add('loader_visible');
        fetchRequest("POST", body);
    }
}

userName.addEventListener('input', (e) => {
    (isValiate(e.target.value)) ? e.target.classList.remove('error') : e.target.classList.add('error');
});

textCommment.addEventListener('input', (e) => {
    (isValiate(e.target.value)) ? textCommment.classList.remove('error') : textCommment.classList.add('error');
});

button.addEventListener('click', (event) => {
    addComment();
});

addForm.addEventListener('input', (event) => {
    (isValiate(textCommment.value), isValiate(userName.value)) ? button.removeAttribute('disabled') : button.setAttribute('disabled', '');
});

addForm.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.keyCode == 13) { addComment(); }
});

if (document.querySelector('.edit-form-text')) {
    const editText = document.querySelector('.edit-form-text');
    const editButton = document.querySelector('.edit-form-button');
    editText.addEventListener('input', () => {
        if (isValiate(editText.value)) {
            editButton.removeAttribute('disabled');
        }
    });
}

const bbCodeButton = document.querySelectorAll('.bb_code_button');
for (let i = 0; i < bbCodeButton.length; i++) {
    const element = bbCodeButton[i];
    element.addEventListener('click', (event) => {
        const bbTag = event.target.dataset.code;
        if (bbTag === 'iframe' || bbTag === 'video' || bbTag === 'img' || bbTag === 'audio') {
            const iframeUrl = prompt(`Вставьте адрес ${bbTag}`);
            if (iframeUrl) { textCommment.value += `[${bbTag}=${iframeUrl}][/${bbTag}]` }
        }
        if (textCommment.selectionStart === textCommment.selectionEnd) {
            return; // ничего не выделено
        }
        let selected = textCommment.value.slice(textCommment.selectionStart, textCommment.selectionEnd);
        textCommment.setRangeText(`[${bbTag}]${selected}[/${bbTag}]`);
    });
}

container.addEventListener('click', (e) => {
    const target = e.target.classList[0];
    const id = e.target.dataset.id;
    switch (target) {
        case 'like-button': initLikeClick(id);
            e.target.classList.add('-loading-like');
            break;
        case 'del-comment': delClick(id);
            break;
        case 'edit-comment': editClick(id); editValid();//editValid();
            break;
        case 'edit-form-button': saveEditComment(id);
            break;
        case 'comment-body': quoteComment(id);
            break;
        case 'comment-text': quoteComment(id);
            break;
        case 'quote_title': quoteComment(id);
            break;
        case 'quote': quoteComment(id);
            break;
        case 'comment': quoteComment(id);
            break;
        default: break;
    }
});

fetchRequest("GET");