let vcan = document.createElement("canvas"); //裏画面
let vcon = vcan.getContext("2d");

let can = document.getElementById("can"); //実画面
let con = can.getContext("2d");

vcan.width  = SCREEN_SIZE_W;
vcan.height = SCREEN_SIZE_H;  //裏画面のサイズ

can.width  = SCREEN_SIZE_W*4;
can.height = SCREEN_SIZE_H*4;  //実画面のサイズ


vcon.mozImageSmoothingEnabled = false;
vcon.webkitImageSmoothingEnabled = false;
vcon.msImageSmoothingEnabled = false;
vcon.imageSmoothingEnabled = false;

con.mozImageSmoothingEnabled = false;
con.webkitImageSmoothingEnabled = false;
con.msImageSmoothingEnabled = false;
con.imageSmoothingEnabled = false;

//フレームレート維持
let frameCount = 0;
let startTime;
let isStart = false;

//キーボード
let keyboard = {};

//png取得
let nomal_stage_sprite = new Image();
nomal_stage_sprite.src = "nomal_stage_sprite.png";

let defeat_enemy_animation = new Image();
defeat_enemy_animation.src = "defeat_enemy_animation.png";

let png_rakutankun = new Image();
png_rakutankun.src = "rakutan-kun_v2.png";

let png_enemy = new Image();
png_enemy.src = "enemys.png";


//落単くんクラス作成
let rakutankun = new Rakutankun(20, 32);

//パンチクラスの配列
let panchi_array = [];
let panchi_num = 0;

//敵クラスを管理する配列
let enemy_array = [];

//敵のインスタンスを追加
//敵の追加書式：new 敵の名前（x座標, y座標, 向き） 向きは左が0, 右が1
enemy_array.push(new Anko(64, 50, 0));
enemy_array.push(new Anko(50, 100, 1));
enemy_array.push(new Manbo(20, 190, 0));
enemy_array.push(new Same(30, 150, 0));
enemy_array.push(new Same(30, 170, 1));
enemy_array.push(new Tako(70, 100, 0));
enemy_array.push(new Kurage(100, 100, 0));
enemy_array.push(new Utsubo(110, 50, 0));
enemy_array.push(new Kurage(100, 200, 0));


let startButton = document.getElementById("startButton");
let overlay = document.getElementById("overlay");

//スタートボタンを押すとループ開始
startButton.onclick = function()
{
    startTime = performance.now();
    isStart = true;

    overlay.style.display = 'none';
    startButton.style.display = 'none';

    mainLoop();
}

//フィールドを作る
let field = new Field();

//更新処理
function update()
{
    if(!isStart) return;

    field.update();

    //敵クラスの更新
    enemy_array.forEach(Enemy => Enemy.update());

    //画面外の敵オブジェクトを削除
    enemy_array = enemy_array.filter(Enemy => (Enemy.x > 0 && Enemy.x < SCREEN_SIZE_W));
    enemy_array = enemy_array.filter(Enemy => (Enemy.y > 0 && Enemy.y < SCREEN_SIZE_H));


    //パンチクラスの更新
    panchi_array.forEach(Panchi => Panchi.update());

    // パンチ削除
   let currentTime = performance.now();
   panchi_array = panchi_array.filter(Panchi => currentTime - Panchi.cptime < 1000); 

    //落単くんの更新
    rakutankun.update();
    
}

//背景の描画
function drawSprite(snum,x,y)
{
	let sx = (snum&15)<<4;
	let sy = (snum>>4)<<4;
	
	vcon.drawImage(nomal_stage_sprite,sx,sy,16,32, x,y,16,32);
}

//描画処理
function draw()
{
    //画面を水色でクリア
    vcon.fillStyle = "black";
    vcon.fillRect(0, 0, SCREEN_SIZE_W, SCREEN_SIZE_H);
    
    //デバッグ情報を表示
    vcon.font = "24px 'Impact'"; 
    vcon.fillStyle = "white";
    vcon.fillText("FRAME:"+frameCount, 10, 20);
    vcon.fillText("STAGE1", 120, 20);
    
    //マップを表示
    field.draw();

    //敵の描画
    enemy_array.forEach(Enemy => Enemy.draw());

    //パンチの描画
    panchi_array.forEach(Panchi => Panchi.draw());

    //落単くんの描画
    rakutankun.draw();

    con.drawImage(vcan, 0, 0, SCREEN_SIZE_W, SCREEN_SIZE_H, 0, 0, SCREEN_SIZE_W << 2, SCREEN_SIZE_H << 2);

}

//メインループ
function mainLoop()
{
    let nowTime = performance.now();
    let nowFrame = (nowTime - startTime) / GAME_FPS;

    if(nowFrame > frameCount){

        let c = 0;
        while(nowFrame > frameCount){
            frameCount++;
            //更新処理
            update();
            if(++c>=4) break;
        }
        //描画処理
        draw();
    }

    requestAnimationFrame(mainLoop);
}

//キーボードが押されたときに呼ばれる
document.onkeydown = function(e)
{
    if(e.keyCode == 65) keyboard.Left  = true;
    if(e.keyCode == 68) keyboard.Right = true;
    // if(e.keyCode == 40) keyboard.Up    = true;
    if(e.keyCode == 83) keyboard.Down  = true;
    if(e.keyCode == 13) {
        keyboard.Enter = true;
        //パンチのインスタンスを作成
        panchi_array.push(new Panchi(rakutankun.x, rakutankun.y));
        panchi_num++;
    }

    // if(e.keyCode == 65) filed.scx--;
    // if(e.keyCode == 83) filed.scx++;
}

//キーボードが離されたときに呼ばれる    
document.onkeyup = function(e)
{
    if(e.keyCode == 65) keyboard.Left  = false;
    if(e.keyCode == 68) keyboard.Right = false;
    // if(e.keyCode == 40) keyboard.Up    = false;
    if(e.keyCode == 83) keyboard.Down  = false;
    if(e.keyCode == 13) keyboard.Enter  = false;

    if(e.keyCode == 83) field.scx++;

}

if(!isStart){
    startTime = performance.now();
    mainLoop();
}
