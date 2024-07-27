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
nomal_stage_sprite.src = "nomal_stage_sprite.png";

let defeat_enemy_animation = new Image();
defeat_enemy_animation.src = "defeat_enemy_animation.png";

let png_rakutankun = new Image();
png_rakutankun.src = "rakutan-kun_v2.png";

let png_enemy = new Image();
png_enemy.src = "enemys.png";

let png_bakuhatsu = new Image();
png_bakuhatsu.src = "bakuhatsu.png";  

let png_hp1 = new Image();
png_hp1.src = "hp1.png";

let png_hp2 = new Image();
png_hp2.src = "hp2.png";

let png_hp3 = new Image();
png_hp3.src = "hp3.png";

let png_item = new Image();
png_item.src = "item-png.png";

//フィールド作成
let field = new Field();

//落単くんクラス作成
let rakutankun = new Rakutankun(128, 32);

//ゲームオーバーなら立てるフラグ
//hitPointが0になるか，画面から出ると立つ
let isGameOver = false;

//HPクラス作成
let hp = new HP();

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
enemy_array.push(new Anko(16, 1000, 1));
enemy_array.push(new Anko(16, 2000, 1));
enemy_array.push(new Anko(16, 3000, 1));
enemy_array.push(new Anko(16, 4000, 1));
enemy_array.push(new Anko(50, 1000, 1));
enemy_array.push(new Manbo(20, 1900, 0));
enemy_array.push(new Same(30, 1500, 0));
enemy_array.push(new Same(30, 1700, 1));
enemy_array.push(new Tako(70, 1000, 0));
enemy_array.push(new Kurage(100, 1000, 0));
enemy_array.push(new Utsubo(110, 500, 0))
enemy_array.push(new Kurage(100, 200, 0));
enemy_array.push(new Anko(64, 300, 0));
enemy_array.push(new Anko(64, 400, 0));
enemy_array.push(new Anko(64, 1000, 0));
enemy_array.push(new Anko(50, 1200, 1));
enemy_array.push(new Manbo(20, 1900, 0));
enemy_array.push(new Same(30, 1500, 0));
enemy_array.push(new Same(30, 1700, 1));
enemy_array.push(new Tako(70, 1000, 0));
enemy_array.push(new Kurage(100, 1000, 0));
enemy_array.push(new Utsubo(110, 500, 0))
enemy_array.push(new Kurage(100, 2000, 0));
enemy_array.push(new Anko(64, 3000, 0));
enemy_array.push(new Anko(64, 470, 0));
enemy_array.push(new Anko(16, 1000, 1));
enemy_array.push(new Anko(16, 2000, 1));
enemy_array.push(new Anko(16, 3000, 1));
enemy_array.push(new Anko(16, 4000, 1));
enemy_array.push(new Anko(50, 1000, 1));
enemy_array.push(new Manbo(20, 1900, 0));
enemy_array.push(new Same(30, 1500, 0));
enemy_array.push(new Same(30, 1700, 1));
enemy_array.push(new Tako(70, 1000, 0));
enemy_array.push(new Kurage(100, 1000, 0));
enemy_array.push(new Utsubo(110, 500, 0))
enemy_array.push(new Kurage(100, 200, 0));
enemy_array.push(new Anko(64, 300, 0));
enemy_array.push(new Anko(64, 400, 0));
enemy_array.push(new Anko(64, 1000, 0));
enemy_array.push(new Anko(50, 1200, 1));
enemy_array.push(new Manbo(20, 1900, 0));
enemy_array.push(new Same(30, 1500, 0));
enemy_array.push(new Same(30, 1700, 1));
enemy_array.push(new Tako(70, 1000, 0));
enemy_array.push(new Kurage(100, 1000, 0));
enemy_array.push(new Utsubo(110, 500, 0))
enemy_array.push(new Kurage(100, 2000, 0));
enemy_array.push(new Anko(64, 3000, 0));
enemy_array.push(new Anko(64, 470, 0));

/****************** ここを編集！ ↑ *******************/


/****************** ここを編集！ ↓ *******************/
//アイテムのインスタンスを追加
//アイテムの追加書式：new 敵の名前（x座標, y座標）
//ここでの座標はワールド座標系
item_array.push();

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

    overlay.style.display     = 'none';
    startButton.style.display = 'none';

    mainLoop();
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
    enemy_array.forEach(Enemy => {if (Enemy.isPanchi) Enemy.deleteSelf();});

    //アイテムクラスの更新
    item_array.forEach(Item => {
        if (isInCamera(Item)) Item.update();
    });

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


    /*******************ここを編集 ********************************/
    //ゲームオーバー実装したら変更する
    //isGameOverはhitPointが0になるか，画面から出ちゃったら立つフラグ
    if(isGameOver){
        showDialog("rakutankaihi.html", "Game Over!\n Back Home...\n");
    }
    /*******************ここを編集 ********************************/
    
    
}


//描画処理
function draw()
{
    //フィールドを描画
    field.draw();
    
    //デバッグ情報を表示
    vcon.font = "24px 'Impact'"; 
    vcon.fillStyle = "white";
    vcon.fillText("FRAME:"+frameCount, 10, 20);
    vcon.fillText("STAGE1", 120, 20);

    //画面内にいる敵の描画
    //敵が裏画面内（バッファゾーン含む）にあるかチェック
    enemy_array.forEach(Enemy => {
        if (isInCamera(Enemy)) Enemy.draw();
    });

    //アイテムクラスの描画
    item_array.forEach(Item => {
        if (isInCamera(Item)) Item.draw();
    });

    //パンチの描画
    panchi_array.forEach(Panchi => Panchi.draw());

    //HPの描画
    hp.draw();

    //落単くんの描画
    rakutankun.draw();

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