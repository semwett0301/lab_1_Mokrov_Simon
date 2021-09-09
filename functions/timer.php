<?php
if (isset($_POST['timer'])) {
    date_default_timezone_set('Europe/Moscow');
    echo date("H:i:s");
}