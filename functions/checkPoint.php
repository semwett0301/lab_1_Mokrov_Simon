<?php
include "validate.php";
include "draw_table.php";

$time = microtime(true);

$x = $_POST['x_coordinate'];
$y = $_POST['y_coordinate'];
$r = $_POST['r_coordinate'];


if (isset($x) && isset($y) && isset($r)) {
    if (validate_data($x, $y, $r)) {
        if (checkCircle($x, $y, $r) || checkSquare($x, $y, $r) || checkTriangle($x, $y, $r)) {
            drawTable($x, $y, $r, "Точка лежит в области", $time);
        } else {
            drawTable($x, $y, $r, "Точка не лежит в области", $time);
        }
    }
} else {
    echo "Данные не были получены";
}


function checkSquare($x, $y, $r) {
    if ($x <= 0 && $x >= -$r && $y >= 0 && $y <= $r) {
        return true;
    }
    return false;
}

function checkCircle($x, $y, $r) {
    if ($x >= 0 && $x <= $r / 2 && $y >= 0 && $y <= $r / 2 ) {
        $distance = distanceToPointFromBegin($x, $y);
        if ($r / 2 >= $distance - 0.000001) {
            return true;
        }
    }

    return false;
}
function checkTriangle($x, $y, $r) {
    if ($x <= 0 && $x >= -$r && $y <= 0 && $y >= -$r) {
        if ($y >= -$x - $r) {
            return true;
        }
    }

    return false;
}

function distanceToPointFromBegin($pointX, $pointY) {
    return sqrt(pow($pointX, 2) + pow($pointY, 2));
}