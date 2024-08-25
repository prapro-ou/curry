// 画像を表示する要素を取得
const displayImage = document.getElementById('displayImage');

// 画像のリストを配列として作成
const images = ['synopsis1.png', 'synopsis2.png', 'synopsis3.png'];
const synopsis = ['あらすじ1', 'あらすじ2', 'あらすじ3'];
let currentPng = 0;

document.getElementById('previousButton').addEventListener('click', function() {
    currentPng = (currentPng - 1 + images.length) % images.length;

    displayImage.src = images[currentPng];
    displayImage.alt = synopsis[currentPng];
});

document.getElementById('nextButton').addEventListener('click', function() {
    currentPng = (currentPng + 1) % images.length;

    displayImage.src = images[currentPng];
    displayImage.alt = synopsis[currentPng];
});

document.getElementById('backButton').addEventListener('click', function() {
    console.log('backButton click');
    window.location.href = 'start.html';
});