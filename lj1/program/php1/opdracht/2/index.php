<?php

$name = "Menno";
$stuNum = "101945";
$class = "D1D(2)";
$classes = ["Nederlands", "Program", "Creative Coding", "Interface"];
$grades = [7.3, 8.3, 7.8, 8.1];

$classGrades = array_combine($classes, $grades);

include_once("index_view.php");