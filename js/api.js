import { errorShow, textCommment,loader } from './main.js';
import { renderComments } from './render.js';
import { commentsListArray } from './data.js';
import { sleep } from "./function.js";
let answerStatus = '';

export function fetchRequest(method, body = null, answerStatus) {
    return fetch("https://webdev-hw-api.vercel.app/api/v1/djon198360/comments",
        {
            method: method,
            body: body,
        })
        .then((response) => {
            answerStatus = response.status;
            return response.json();
        })
        .then((data) => {
            if (answerStatus === 201) {
                fetchRequest("GET");
                textCommment.value = "";
                loader.classList.remove('loader_visible');
            }
            else if (answerStatus === 400) {
                errorShow(data.error, answerStatus);
            }
            else if (answerStatus === 500) {
                errorShow('На сервере , что-то сломалось', '500');
                fetchRequest(method, body);
            }
            else {
                commentsListArray.splice(0,commentsListArray.length);
                data.comments.map((comment, id) => {
                    commentsListArray.push(comment);
                   
                });
                renderComments();
            }
        })
        .catch((error) => {
            if (error.message === 'Failed to fetch') {
                errorShow('Нет соединения с интернетом, жду соединения', 'соединения');
                sleep(5000);
                fetchRequest(method, body);
            }
            else { error }
        });
}
