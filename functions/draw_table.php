<?php
function drawTable($x, $y, $r, $hit, $time) {
    echo "<table class=\"result_table\">
                    <tbody>
                        <tr>
                            <td>Полученный параметр x</td>
                            <td class=\"x\">" . $x . "</td>
                        </tr>
                        <tr>
                            <td>Полученный параметр y</td>
                            <td class=\"y\">" . $y . "</td>
                        </tr>
                        <tr>
                            <td>Полученный параметр R</td>
                            <td class=\"r\">" . $r . "</td>
                        </tr>
                        <tr>
                            <td>Время выполнения скрипта</td>
                            <td class=\"result_time\">" . round((microtime(true) - $time) * 1000000) ." мкс"."</td>
                        </tr>
                        <tr>
                            <td colspan=2 class=\"hit\">".$hit."</td>
                        </tr>
                    </tbody>
                </table>";
}

