<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Simple Canvas Game</title>

    <link rel="stylesheet" href="style.css">
</head>
<body>
    <input type="range" min="0.1" max="10" step="0.1" id="speedPicker" value="1.15">
    <p>Goblin speed: <span id="speed"></span></p>

    <ul class="healthBar" id="healthBar" >
        <li class="health" style="display: inline-block">
            <img src="images/heart.png" alt="">
        </li>

        <li class="health" style="display: inline-block">
            <img src="images/heart.png" alt="">
        </li>

        <li class="health" style="display: inline-block">
            <img src="images/heart.png" alt="">
        </li>

        <li class="health" style="display: inline-block">
            <img src="images/heart.png" alt="">
        </li>

        <li class="health" style="display: inline-block">
            <img src="images/heart.png" alt="">
        </li>
    </ul>

    <form action="" method="post">
        <input type="text" id="score" name="score" disabled>
    </form>

    <div id="deadScreen">
        <h1>WASTED</h1>
        <button id="again"><a href="/">play again</a></button>
        <button id="record">register my record</button>

        <form id="registerCont" class="hidden" method="post">
            <input type="text" id="score1" name="score1" disabled>
            <input type="text" id="name" name="name" placeholder="ВАШЕ ИМЯ">
            <input type="submit" value="Send">
        </form>
    </div>

    <script src="js/game.js"></script>
    <script src="js/world.js"></script>
</body>
</html>

<?php
$name = $_POST['name'];
$score = $_POST['score1'];

$connect = mysqli_connect('localhost', 'mysql', 'mysql', 'gaglis');
$result = mysqli_query($connect, "INSERT INTO `records` (name, score) VALUES ('$name', '$score')");

if($result == true) {
    die();
}

if($connect !== true) {
    die(mysqli_connect_error());
}
?>