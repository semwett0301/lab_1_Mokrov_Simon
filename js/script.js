document.getElementById('form_with_coordinates').onsubmit = function (event) {
    event.preventDefault();
    validate();
};

timer();
setInterval(timer, 1000)

function validate() {
    let x_coordinate = check_and_return_X();
    let y_coordinate = check_and_return_Y();
    let r_coordinate = check_and_return_R();

    set_and_remove_error_X(x_coordinate);
    set_and_remove_error_Y(y_coordinate);

    if (!isNaN(x_coordinate) && !isNaN(y_coordinate) && !isNaN(r_coordinate)) {

        if(!isNaN(x_coordinate) && !isNaN(y_coordinate) && !isNaN(r_coordinate)) {
            let param = 'x_coordinate=' + x_coordinate + '&' + 'y_coordinate=' + y_coordinate + '&' + 'r_coordinate=' + r_coordinate
            addLastResult();
            onRequest(param)
        }
    }
}

function onRequest(param) {
    let request = ajaxRequest()

    request.open("POST", "functions/checkPoint.php", true)
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            if (this.responseText != null) {
                document.querySelector('.result_block').innerHTML = this.responseText
                $('.result_block').fadeIn();
                window.scrollTo({top: window.innerHeight, behavior: 'smooth'});
            }
        }
    }
    request.send(param)
}

function check_and_return_X() {
    let x_coordinate = document.querySelector('input[name=x_coordinate]').value;

    if (x_coordinate.includes(',')) {
        let x_parts = x_coordinate.split(',', 2);
        if (!isNaN(x_parts[0]) && !isNaN(x_parts[1])) {
            x_coordinate = x_parts[0] + "." + x_parts[1]
            parseFloat(x_coordinate);
        }
    }

    if(!isNaN(x_coordinate) && !x_coordinate == '') {
        if (x_coordinate > -5 && x_coordinate < 5) {
            return x_coordinate
        } else {
            return "Введите число в правильном диапазоне"
        }
    }

    return "Введите число"
}

function check_and_return_Y() {
    let y_coordinate = document.querySelector('input[type=checkbox]:checked');
    let y_coordinates = document.querySelectorAll('input[type=checkbox]:checked');

    if (y_coordinates.length <= 1) {
        if(y_coordinate != null) {
            return y_coordinate.value
        } else {
            return "Нужно выбрать координату Y"
        }
    } else {
        return "Нужно выбрать только 1 checkbox"

    }
}

function check_and_return_R() {
    return document.querySelector('select[name=r_coordinate]').value;
}

function set_and_remove_error_X(x_coordinate){
    if(!isNaN(x_coordinate)) {
        document.querySelector('.x_error').innerHTML = '';
    } else {
        document.querySelector('.x_error').innerHTML = x_coordinate;
    }
}

function set_and_remove_error_Y(y_coordinate){
    if(!isNaN(y_coordinate)) {
        document.querySelector('.y_error').innerHTML = '';
    } else {
        document.querySelector('.y_error').innerHTML = y_coordinate;
    }
}

function ajaxRequest() {
    try {
        var request = new XMLHttpRequest()
    } catch (e1) {
        try {
            request = new ActiveXObject("Msxml2.XMLHTTP")
        } catch (e2) {
            try {
                request = new ActiveXObject("Microsoft.XMLHTTP")
            } catch (e3) {
                request = false
            }
        }
    }
    return request;
}

function addLastResult() {
    if (document.querySelector('.result_block').innerHTML !== '') {
        let x = document.querySelector('.x').innerHTML;
        let y = document.querySelector('.y').innerHTML;
        let r = document.querySelector('.r').innerHTML;
        let result_time = document.querySelector('.result_time').innerHTML;
        let hit = document.querySelector('.hit').innerHTML;

        if (hit === 'Точка лежит в области') {
            hit = 'Да'
        } else {
            hit = 'Нет'
        }

        document.querySelector('.past_results table tbody').innerHTML += '<tr>\n' +
            '                <td>' + x + '</td>\n' +
            '                <td>' + y + '</td>\n' +
            '                <td>' + r + '</td>\n' +
            '                <td>' + result_time + '</td>\n' +
            '                <td>' + hit + '</td>\n' +
            '            </tr>'
    }

    if(document.querySelectorAll('.past_results tbody tr').length === 1) {
        $('.past_results').slideDown(300);
    }
}

function timer() {
    requestTimer = ajaxRequest();

    requestTimer.open("POST", "functions/timer.php", true)
    requestTimer.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    requestTimer.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            if (this.responseText != null) {
                document.querySelector('.timer').innerHTML = this.responseText;
            }
        }
    }
    requestTimer.send("timer=true")
}