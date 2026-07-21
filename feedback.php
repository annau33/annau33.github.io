<?php
$link = mysqli_connect("localhost", "root", "", "jewelry_db");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
    $message = $_POST['message'];
    mysqli_query($link, "INSERT INTO reviews (name, message) VALUES ('$name', '$message')");
    header("Location: feedback.php");
}
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Отзывы</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header class="header">
        <div class="logo">YourGift</div>
        <div class="user">👤</div>
    </header>

    <main>
        <h1>Отзывы</h1>
        
        <form method="POST" style="max-width: 600px; margin: 0 auto; background: #fff; padding: 30px; border-radius: 8px;">
            <input type="text" name="name" placeholder="Ваше имя" required style="width: 100%; padding: 10px; margin-bottom: 15px;">
            <textarea name="message" placeholder="Отзыв" required style="width: 100%; padding: 10px; height: 100px; margin-bottom: 15px;"></textarea>
            <button type="submit" style="padding: 10px 30px; background: #000; color: #fff; border: none; cursor: pointer;">Отправить</button>
        </form>

        <div style="max-width: 800px; margin: 40px auto;">
            <?php
            $result = mysqli_query($link, "SELECT * FROM reviews ORDER BY id DESC");
            while ($row = mysqli_fetch_assoc($result)) {
                echo "<div class='card' style='text-align: left; margin-bottom: 20px;'>";
                echo "<h3>" . $row['name'] . "</h3>";
                echo "<p>" . $row['message'] . "</p>";
                echo "</div>";
            }
            ?>
        </div>
    </main>

    <footer class="footer">
        <div class="logo">YourGift</div>
        <p>YourGift © 2026</p>
    </footer>
</body>
</html>