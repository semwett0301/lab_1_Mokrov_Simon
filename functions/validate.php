<?php
function validate_data($x_coordinate, $y_coordinate,  $r_coordinate) {
    if (is_numeric($x_coordinate) && is_numeric($y_coordinate) && is_numeric($r_coordinate)) {
        if(check_x_coordinate($x_coordinate) && check_y_coordinate($y_coordinate) && check_r_coordinate($r_coordinate)) {
            return true;
        }
    } else {
        echo "Полученные данные не являются числами";
        return false;
    }

    return false;
}

function check_x_coordinate($x_coordinate) {
    if ($x_coordinate > -5 && $x_coordinate < 5) {
        return true;
    }

    return false;
}

function check_y_coordinate($y_coordinate) {
    if ($y_coordinate >= -5 && $y_coordinate <= 3) {
        return true;
    }

    return false;
}

function check_r_coordinate($r_coordinate) {
    if ($r_coordinate >= 1 && $r_coordinate <= 5) {
        return true;
    }

    return false;
}