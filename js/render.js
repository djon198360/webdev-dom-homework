import { errorHide , commentList, addForm, loader } from './main.js';
import { commentsListArray } from "./data.js";
import {dateFormat,htmlBbDecode} from './function.js';

let Iliked = '';
export function renderComments() {
  
   
    const commentHtmlResult = commentsListArray.map((comment, id) => {
       
       (comment.isLiked) ? Iliked = '-active-like' : Iliked = '';
       if (comment.isEdit) {
        return `<div class="add-form">
        
        <div class="edit-form-name">${comment.author.name}</div>  
        <textarea
        type="textarea"
        class="edit-form-text"
        rows="4">${comment.text}</textarea>
        <div class="add-form-row">
        <button data-id="${id}" class="edit-form-button save_button">Сохранить</button>
        </div>
        </div>` 
        ;

} else {

return `<li class="comment" data-id="${id}">
        <div class="comment-header">
        <div>${comment.author.name}</div>      
        <div>${dateFormat(new Date(comment.date))}</div>     
        </div>
        <div class="comment-body">
        <div class="comment-text" data-id="${id}">
        ${htmlBbDecode(comment.text, id)}
        </div>
        </div>
        <div class="comment-footer">
        <div class="comment-func">
            <div><span class="edit-comment" data-id="${id}" title="Редактироать">&#9998;</span></div>
            <div><span class="del-comment" data-id="${id}" title="Удалить">&#10008;</span></div>
            </div>
        
        <div class="likes">
            <span class="likes-counter" >${comment.likes}</span>
            <button class="like-button ${Iliked}" data-id="${id}"></button>
        </div>
    </div>
    </li>`;
}


    }).join("");
//    loader.classList.remove('loader_visible');
//    loader.classList.add('loader_hidden');
    addForm.style.visibility = "visible";
    errorHide();
    commentList.innerHTML = commentHtmlResult;
//console.log(commentsListArray);

}