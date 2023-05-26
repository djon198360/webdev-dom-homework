export function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

export function dateFormat(dateF) {
    const options = {
        year: '2-digit',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }
    const newDate = new Date(dateF);
    return newDate.toLocaleString('ru-RU', options).replace(',', '');
}

export function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
}

export function htmlBbDecode(text, id) {
    return text
        .replaceAll(/\[quote=(.*?)\]/g, `<div class="quote_title" data-id="${id}">Цитата: $1</div><div class="quote" data-id="${id}">`)
        .replaceAll(/\[iframe=(.*?)\]/g, `<iframe src="$1" width="100%" height="240" allow="autoplay; encrypted-media; fullscreen; picture-in-picture;" frameborder="0" allowfullscreen>`)
        .replaceAll(/\[video=(.*?)\]/g, `<video src="$1" width="100%" height="240" controls>`)
        .replaceAll(/\[img=(.*?)\]/g, `<img src="$1" width="100%" height="240">`)
        .replaceAll(/\[audio=(.*?)\]/g, `<audio src="$1" width="100%" height="240" controls>`)
        .replaceAll(/\[(.*?)\]/g, '<$1>')
        .replaceAll(/\[\/(.*?)\]/g, '</$1>')
}
//реплайс спец символов
export function htmlSpecialChars(text) {
    return text
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
}

export function isValiate(text) { //функция валидации простая
if(text.length >= 3){
    return true;
}
else {return false;}
}