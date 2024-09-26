let vcan = document.createElement("canvas"); //裏画面
let vcon = vcan.getContext("2d");

let can = document.getElementById("can"); //実画面
let con = can.getContext("2d");

vcan.width  = SCREEN_W;
vcan.height = SCREEN_H + BUFFER_ZONE;  //裏画面のサイズ

can.width  = SCREEN_W << 2;
can.height = SCREEN_H << 2;  //実画面のサイズ

vcon.mozImageSmoothingEnabled    = false;
vcon.webkitImageSmoothingEnabled = false;
vcon.msImageSmoothingEnabled     = false;
vcon.imageSmoothingEnabled       = false;

con.mozImageSmoothingEnabled     = false;
con.webkitImageSmoothingEnabled  = false;
con.msImageSmoothingEnabled      = false;
con.imageSmoothingEnabled        = false;

//フレームレート維持
let frameCount = 0;
let startTime;
let isStart = false;

//スタートボタンを作成
let startButton = document.getElementById("startButton");
let overlay     = document.getElementById("overlay");

//キーボード
let keyboard = {};

//png取得
let nomal_stage_sprite = new Image();
nomal_stage_sprite.src = "png/nomal_stage_sprite.png";

let defeat_enemy_animation = new Image();
defeat_enemy_animation.src = "png/defeat_enemy_animation.png";

let png_rakutankun = new Image();
png_rakutankun.src = "png/rakutan-kun_v2.png";

let png_enemy = new Image();
png_enemy.src = "png/enemys.png";

let png_bakuhatsu = new Image();
png_bakuhatsu.src = "png/bakuhatsu.png";  

let png_hp1 = new Image();
png_hp1.src = "png/hp1.png";

let png_hp2 = new Image();
png_hp2.src = "png/hp2.png";

let png_hp3 = new Image();
png_hp3.src = "png/hp3.png";

let png_item = new Image();
png_item.src = "png/item.png";


//ローカルデータから読み込む
let shussekiCount = parseInt(localStorage.getItem('shussekiCount')) || 0;
let hitPoint = 4;
let stage = localStorage.getItem('stage');

//BGM音源取得
const normal_stage_bgm = document.getElementById('normal_stage_bgm');
normal_stage_bgm.volume = 0.01;

const game_over_sound = document.getElementById('game_over_sound');
game_over_sound.volume = 0.3;

const whale_sound = document.getElementById('whale_sound');
whale_sound.volume = 0.3;
var whale_sound_played = false;


//フィールド作成
let field = new Field();

//落単くんクラス作成
let rakutankun = new Rakutankun(50, 64);

//クジラクラス作成
let whale = new Whale(31, 3948);

//ゲームオーバーなら立てるフラグ
//hitPointが0になるか，画面から出ると立つ
let isGameOver = false;

//HPクラス作成
let hp = new HP(4, 32);

//パンチクラスの配列
let panchi_array = [];
let panchi_num = 0;

//敵クラスを管理する配列
let enemy_array = [];

//アイテムクラスを管理する配列
let item_array = [];


/****************** ここを編集！ ↓ *******************/

//敵のインスタンスを追加
//敵の追加書式：new 敵の名前（x座標, y座標, 向き） 向きは左が0, 右が1
//ここでの座標はワールド座標系
//x座標は16~240-敵の幅
//ランダム表示(x軸)　Math.random() * (海の幅(224) - 敵の幅) + 海の左端(16)

enemy_array.push(new Same(125, 200, 0));
enemy_array.push(new Utsubo(50, 200, 1));
enemy_array.push(new Same(115, 300, 1));
enemy_array.push(new Kurage(110, 400, 0));
enemy_array.push(new Kurage(136, 400, 0));
enemy_array.push(new Kurage(136, 450, 0));
enemy_array.push(new Kurage(110, 500, 0));
enemy_array.push(new Kurage(136, 500, 0));
enemy_array.push(new Kurage(136, 550, 0));
enemy_array.push(new Kurage(56, 550, 0));
enemy_array.push(new Manbo(140, 640, 0));
enemy_array.push(new Manbo(90, 680, 0));
enemy_array.push(new Uni(20, 780, 1));
enemy_array.push(new Uni(80, 830, 1));
enemy_array.push(new Tako(55, 975, 0));
enemy_array.push(new Tako(75, 975, 0));
enemy_array.push(new Tako(95, 975, 0));
enemy_array.push(new Tako(115, 975, 0));
enemy_array.push(new Tako(135, 975, 0));
enemy_array.push(new Tako(85, 1102, 1));
enemy_array.push(new Tako(105, 1102, 1));
enemy_array.push(new Tako(125, 1102, 1));
enemy_array.push(new Tako(145, 1102, 1));
enemy_array.push(new Tako(165, 1102, 1));
enemy_array.push(new Tako(185, 1102, 1));
enemy_array.push(new Tako(80, 1230, 0));
enemy_array.push(new Tako(100, 1230, 0));
enemy_array.push(new Tako(120, 1230, 0));
enemy_array.push(new Tako(140, 1230, 0));
enemy_array.push(new Tako(160, 1230, 0));
enemy_array.push(new Anko(150, 1600, 0));
enemy_array.push(new Anko(190, 1650, 0));
enemy_array.push(new Anko(130, 1650, 0));
enemy_array.push(new Utsubo(50, 1710, 1));
enemy_array.push(new Utsubo(90, 1750, 1));
enemy_array.push(new Utsubo(130, 1790, 1));
enemy_array.push(new Uni(145, 1950, 1));
enemy_array.push(new Uni(135, 1980, 0));
enemy_array.push(new Uni(175, 2020, 1));
enemy_array.push(new Same(80, 2170, 0));
enemy_array.push(new Same(130, 2220, 0));
enemy_array.push(new Same(150, 2180, 0));
enemy_array.push(new Kurage(200, 2400, 0));
enemy_array.push(new Kurage(180, 2400, 0));
enemy_array.push(new Kurage(170, 2400, 0));
enemy_array.push(new Kurage(200, 2450, 0));
enemy_array.push(new Tako(150, 3080, 1));
enemy_array.push(new Tako(100, 3110, 0));
enemy_array.push(new Tako(150, 3125, 0));
enemy_array.push(new Tako(150, 3140, 1));
enemy_array.push(new Tako(100, 3170, 0));
enemy_array.push(new Anko(110, 3600, 0));
enemy_array.push(new Anko(160, 3640, 0));
enemy_array.push(new Same(100, 3750, 1));
enemy_array.push(new Same(85, 3800, 1));
enemy_array.push(new Hitode(80, 337, 0));
enemy_array.push(new Hitode(80, 359, 0));
enemy_array.push(new Hitode(80, 381, 0));
enemy_array.push(new Hitode(100, 1407, 0));
enemy_array.push(new Hitode(120, 1407, 0));
enemy_array.push(new Hitode(140, 1407, 0));
enemy_array.push(new Hitode(100, 1505, 0));
enemy_array.push(new Hitode(120, 1505, 0));
enemy_array.push(new Hitode(140, 1505, 0));
enemy_array.push(new Hitode(218, 2100, 0));
enemy_array.push(new Hitode(180, 2650, 0));
enemy_array.push(new Hitode(200, 2650, 0));
enemy_array.push(new Hitode(220, 2650, 0));
enemy_array.push(new Hitode(20, 2780, 0));
enemy_array.push(new Hitode(40, 2780, 0));
enemy_array.push(new Hitode(25, 2927, 0));
enemy_array.push(new Hitode(215, 3023, 0));
enemy_array.push(new Hitode(215, 3023, 0));
enemy_array.push(new Hitode(140, 3400, 0));
enemy_array.push(new Hitode(65, 3475, 0));

/****************** ここを編集！ ↑ *******************/


/****************** ここを編集！ ↓ *******************/
//アイテムのインスタンスを追加
//アイテムの追加書式：new 敵の名前（x座標, y座標）
//ここでの座標はワールド座標系
// item_array.push(new Makura(100, 100));
// item_array.push(new Energy(120, 200));
// item_array.push(new Drink(60, 300));
// item_array.push(new Drink(60, 300));
// item_array.push(new Drink(128, 100));

// 座標をランダムに取得
function get_rand_coordinate() {
    let x = 0;
    let y = 0;
    let coordinate_err = true;
    
    while (coordinate_err || y < 7) {
        x = Math.floor(Math.random() * 15);
        y = Math.floor(Math.random() * 255);
        if (field.isBlock(x, y)) {
            coordinate_err = false;
        }
    }

    return [x*16, y*16];
}

// 枕を計16個配置
for(i = 0; i < 16; i++){
    coordinates = get_rand_coordinate();
    item_array.push(new Makura(coordinates[0], coordinates[1]));
}

// エナドリを計16個配置
for(i = 0; i < 16; i++){
    coordinates = get_rand_coordinate();
    item_array.push(new Energy(coordinates[0], coordinates[1]));
}

// 出席点を計8個配置
for(i = 0; i < 8; i++){
    coordinates = get_rand_coordinate();
    item_array.push(new Shussekiten(coordinates[0], coordinates[1]));
}

// 酒を計16個配置
for(i = 0; i < 16; i++){
    coordinates = get_rand_coordinate();
    item_array.push(new Drink(coordinates[0], coordinates[1]));
}


/****************** ここを編集！ ↑ *******************/



//パンチのインスタンスを作成
function create_panchi()
{
    panchi_array.push(new Panchi(rakutankun.x, rakutankun.y));
    panchi_num++;
}

//スタートボタンを押すとループ開始
startButton.onclick = function()
{
    startTime = performance.now();
    isStart   = true;

    background.style.display     = 'none';
    startButton.style.display = 'none';

    mainLoop();

    normal_stage_bgm.play();

}

//各オブジェクトが裏画面内（バッファゾーン含む）にあるかチェック
//画面内ならtrueを返す
function isInCamera(object){
    return (object.y > field.scy) && (object.y + object.height < field.scy + SCREEN_H + BUFFER_ZONE*2)
}




/*******************ここを編集 ********************************/
//コース画面からステージ選択画面に戻るときにアニメーションがないので改善する

//画面遷移のアニメーション
function startSlideAnimation(url){
    const overlay = document.getElementById('overlay');
    overlay.classList.add('active');
    setTimeout(() => {
        window.location.href = url;
    }, 3000);   //次画面への待ち時間3秒
}

//ダイアログを表示させる
function showDialog(url, message){
    const modal = document.getElementById('customModal');
    const modalMessage = document.getElementById('modalMessage');
    const modalOK = document.getElementById('modalOK');

    modalMessage.textContent = message;
    modal.style.display = 'block';

    modalOK.onclick = () => {
        modal.style.display = 'none';
        this.startSlideAnimation(url);
    }
}
/*******************ここを編集 ********************************/




//更新処理
function update()
{
    if(!isStart) return;

    //ゲームオーバーフラグ
    if(isGameOver) return;

    //フィールドの更新
    field.update();
    
    //敵クラスの更新
    enemy_array.forEach(Enemy => {
        if (isInCamera(Enemy)) Enemy.update();
    });

    //画面外の敵オブジェクトを削除
    enemy_array = enemy_array.filter(Enemy => (Enemy.x > 0 && Enemy.x < WORLD_W));
    enemy_array = enemy_array.filter(Enemy => (Enemy.y > field.scy && Enemy.y < WORLD_H));

    //敵を倒す（削除）
    // isPanchiが1の敵を削除
    enemy_array.forEach(Enemy => {if (Enemy.isPanchi) {
            Enemy.deleteSelf();
            rakutankun.shussekiCount++;
        }
    });

    //アイテムクラスの更新
    item_array.forEach(Item => {
        if (isInCamera(Item)) Item.update();
    });

    //クジラの更新
    if(isInCamera(whale)) whale.update();

    // //アイテム獲得（削除）
    // //isGetItemがtrueのときに削除する
    item_array.forEach(Item => {if (Item.isGetItem) Item.deleteSelf();});


    //現在時刻
    let currentTime = performance.now();

    //パンチクラスの更新
    panchi_array.forEach(Panchi => Panchi.update());

    // パンチ削除
    panchi_array = panchi_array.filter(Panchi => currentTime - Panchi.cptime < 1000);  //パンチは全部2秒で消える
   
    // パンチ数を更新
    panchi_num = panchi_array.length;

    //HPクラスの更新
    hp.update();

    //落単くんの更新
    rakutankun.update();

    //らくたん君が画面外に出たらゲームオーバー
    if(!isInCamera(rakutankun)) isGameOver = true;


    /*******************ここを編集 ********************************/
    //ゲームオーバー実装したら変更する
    //isGameOverはhitPointが0になるか，画面から出ちゃったら立つフラグ
    if(isGameOver){
        normal_stage_bgm.pause();
        game_over_sound.play();
        showDialog("html/rakutankaihi.html", "Game Over!\n Back Home...\n");
    }
    /*******************ここを編集 ********************************/

    if(whale.isToNext){
        normal_stage_bgm.pause();
        if(!whale_sound_played){
        whale_sound.play();
        whale_sound_played = true;
        }
        showDialog("html/shop.html", "Go to Item Shop.\n");
        localStorage.setItem('shussekiCount', rakutankun.shussekiCount);
        localStorage.setItem('HP', hp.hitPoint);
        localStorage.setItem('stage', '4');
    }
    
    
}


//描画処理
function draw()
{
    //フィールドを描画
    field.draw();
    

    //画面内にいる敵の描画
    //敵が裏画面内（バッファゾーン含む）にあるかチェック
    enemy_array.forEach(Enemy => {
        if (isInCamera(Enemy)) Enemy.draw();
    });

    //アイテムクラスの描画
    item_array.forEach(Item => {
        if (isInCamera(Item)) Item.draw();
    });

    //クジラの描画
    if(isInCamera(whale)) whale.draw();

    //パンチの描画
    panchi_array.forEach(Panchi => Panchi.draw());

    //HPの描画
    hp.draw();

    //落単くんの描画
    rakutankun.draw();

    vcon.font = "16px 'Impact'"; 
    vcon.fillStyle = "Blue";
    vcon.fillText("STAGE4", 206, 46);

    //出席点表示
    vcon.drawImage(png_item, 80, 0, 16, 16, 39, 32, 16, 16);
    vcon.font = "14px 'Impact'"; 
    vcon.fillStyle = "white";
    vcon.fillText(rakutankun.shussekiCount.toString(), 58, 46);

    //裏画面の座標(0, BUFFER_ZONE)からSCREENサイズ分を実画面として描画する
    con.drawImage(vcan, 0, BUFFER_ZONE, SCREEN_W, SCREEN_H, 0, 0, SCREEN_W << 2, SCREEN_H << 2);

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

    //一気に出せるパンチは4つまで
    //panchi_num をパンチを生成してからインクリメントしてるから4も含む
    if(panchi_num < 3){
        if(e.keyCode == 76) {
            keyboard.RPanchi  = true;
            create_panchi();
        }
        if(e.keyCode == 74) {
            keyboard.LPanchi  = true;
            create_panchi();
        }
        if(e.keyCode == 75){
            keyboard.DPanchi  = true;
            create_panchi();
        }
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
    if(e.keyCode == 76) keyboard.RPanchi  = false;
    if(e.keyCode == 74) keyboard.LPanchi  = false;
    if(e.keyCode == 75) keyboard.Enter  = false;

}

if(!isStart){
    startTime = performance.now();
    mainLoop();
}