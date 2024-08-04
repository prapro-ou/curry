//
//  ノーマルステージの落単くんクラス
//

const RIGHT      = 0;
const LEFT       = 1;
const DOWN       = 2;

/* パンチ用の方向定数 */
const P_RIGHT    = 0;
const P_LEFT     = 1;
const P_DOWN     = 2;

const ANIME_STOP = 1;
const MAX_SPEED  = 5;

class Rakutankun
{
    constructor(x, y){
        //これはワールド座標系
        this.x     = x;
        this.y     = y;
    
        this.vy    = 0;
        this.vy    = 0;

        this.anim  = 0;
        this.snum  = 0;
        this.acou  = 0;

        this.damageCount = 0;

        //ダメージを食らったら立てるフラグ
        this.isDamage = false;

        //回復アイテムをとったら立てるフラグ
        this.isRecover = false;

        //底についたらスクロース止める
        this.stayScroll = WORLD_H - 290;
        //底についたら立てるフラグ → 落単くんのy座標を更新するかどうか決める
        this.isFloor = false;

    }
    

    //左右移動の処理
    updateSwimSub_x(direction){
        if(direction == 0) this.x += 2;
        else this.x -= 2;
    }

    //横方向の移動
    updateSwim_x(){
        if (keyboard.Left){
            this.updateSwimSub_x(LEFT);
        } else if (keyboard.Right){
            this.updateSwimSub_x(RIGHT);
        } else {
            if(this.vx > 0)  this.vx  -= 1;
            if(this.vx < 0)  this.vx  += 1;
            if(this.vx == 0) this.anim = ANIME_STOP;
        }
    }

    //縦方向の移動
    updateSwim_y(){
        if(keyboard.Down){
            this.y += 2;
        }
    }

    //落単くんの左右と下がブロック（通れない）かどうかを判定
    checkBlock(){
        //まず左の判定
        if(!field.isBlock((this.x - 1)>> 4, (this.y + 1) >> 4) || !field.isBlock((this.x - 1)>> 4, (this.y + 16 + 1) >> 4) ){
            this.vx = 0;
            this.x += 3;
        }   


        //次に右の判定
        if(!field.isBlock((this.x + 1 + 13) >> 4, (this.y + 1) >> 4) || !field.isBlock((this.x + 1 + 13) >> 4, (this.y + 16 + 1) >> 4)){
            this.vx = 0;
            this.x -= 3;
        }

        //次に底の判定
        if(!field.isBlock(this.x >> 4, (this.y + 32) >> 4)){
            this.vy = 0; 
            this.isFloor = true;
        }   
    }


    //敵に当たったらtrueを返す
    //このtrueを使って点滅処理・ダメージを受ける処理をする
    isHitObj(obj){
        let isX = false;
        let isY = false;

        let isx = false;
        let isy = false;

        //当たり判定
        //敵の各クラスにサイズを持たせたので，それを使って判定を行うようにする
        isX = (this.x >= obj.x && this.x <= obj.x + obj.width) || (this.x + obj.width >= obj.x && this.x + obj.width <= obj.x + obj.width);
        isY = (this.y >= obj.y && this.y <= obj.y + obj.height) || (this.y + obj.height >= obj.y && this.y + obj.height <= obj.y + obj.height);
        
        isx = (this.x <= obj.x && obj.x <= this.x + 16) || (this.x <= obj.x + obj.width && obj.x + obj.width <= this.x + 16)
        isy = (this.y <= obj.y && obj.y <= this.y + 32) || (this.y <= obj.y + obj.height && obj.y + obj.height <= this.y + 32) 

        return (isX && isY) || (isx && isy);
    }

    //ダメージを受けたときの落単くんが点滅するアニメーション
    animationDamage(){
        let animation = [1,0,1,0,1,0,1];

        if((frameCount%4) == 2) this.damageCount++;
        if(this.damageCount >= animation.length) this.damageCount = 0;  //リセットanimation
        if(animation[this.damageCount] == 0) return false;  //0のときはfalseを返す→落単くん非表示
        else return true;                        //1のときはtrueを返す→落単くん表示           
    }

    update(){
        this.acou++;
        if (Math.abs(this.vx) == MAX_SPEED) this.acou++;

        //左右・下の判定
        this.checkBlock();

        //敵にあたったかどうか判定
        //この判定は，HPを減らす処理でも使える this.isDamage = true ならHPを減らす
        enemy_array.forEach(Enemy => {
            if(Enemy.type != 'Whale'){
                if (this.isHitObj(Enemy)) this.isDamage = true;  //ダメージを受けていたらフラグを立てる
            }
        });

        //アイテムにあたったかどうか判定
        item_array.forEach(Item => {
            if (this.isHitObj(Item)){
                Item.isGetItem = true;
                switch(Item.type){
                    case 'Makura': Item.isMakura = true;
                    break;
                    case 'Energy': Item.isEnergy = true;
                    break;
                    case 'Pen': Item.isPen = true;
                    break;
                    case 'Note': Item.isNote = true;
                    break;
                    case 'Shussekiten': Item.isShussekiten = true;
                    break;
                    case 'Water': Item.isWater = true;
                    break;
                    case 'Drink': Item.isDrink = true;
                    break;
                    case 'Juice': Item.isJuice = true
                    break;
                }
                console.log("isGetItem = ", Item.isGetItem);
                console.log("flag = ", Item.isMakura);
            }
        });


        this.updateSwim_x();

        if(!this.isFloor){
            //落単くん更新
            this.updateSwim_y();

            //自動スクロールについてこさせるための加算
            //手動スクロールされていなければ自動スクロールする
            //field.scy と合わせてまた調整する
            if(!field.isScroll){
                this.y++;
            }
        }
    }

    draw(){

        //カメラ座標系へ変換
        let camera_x = this.x;
        let camera_y = this.y - field.scy;  // world_y - (スクロール量) = カメラ座標系での現座標
        let isdraw = true;
        
        if(this.isDamage){
            isdraw = this.animationDamage();
        }

        if(isdraw) vcon.drawImage(png_rakutankun, 32, 32, 16, 32, camera_x, camera_y, 16, 32);

    }
}


//
//パンチクラス
//

class Panchi extends Rakutankun
{
    constructor(x, y){
        super(x, y);
        this.count = 0;
        this.isActive = true;
        this.cptime = performance.now();

        // 方向を記録
        if(keyboard.LPanchi){
            this.direction = P_LEFT;
            this.panchi_x = this.x + 0;
            this.panchi_y = this.y - field.scy + 15;

        }
        else if(keyboard.RPanchi){
            this.direction = P_RIGHT;
            this.panchi_x = this.x + 16;
            this.panchi_y = this.y - field.scy + 15;
        }
        else{
            this.direction = P_DOWN;
            this.panchi_x = this.x + 2;
            this.panchi_y = this.y -field.scy + 25;
        }
    }

    //当たり判定
    //敵の各クラスにサイズを持たせたので，それを使って判定を行うようにする
    isPanchiHit(obj){
        let isX = false;
        let isY = false;
        let worldPanchi_y = this.panchi_y + field.scy;

        isX = this.panchi_x >= obj.x && this.panchi_x <= obj.x + obj.width;
        isY = worldPanchi_y >= obj.y && worldPanchi_y <= obj.y + obj.height;

        return isX && isY;
    }

    update(){
        switch(this.direction){
            case P_LEFT: this.panchi_x -= 2; break;
            case P_RIGHT: this.panchi_x += 2; break;
            case P_DOWN: this.panchi_y += 2; break;
        }

        enemy_array.forEach(Enemy => {
            if (this.isPanchiHit(Enemy)) Enemy.isPanchi = 1;
        });

    }

    //攻撃のアニメーション
    attackAnime(){
        switch(this.direction){
            //下向きに動く時の左向きの時のパンチ
            case P_LEFT:
                vcon.drawImage(png_rakutankun, 160, 32, 16, 16, this.panchi_x, this.panchi_y, 16, 16);
                break;

            //下向きに動く時の右向きの時のパンチ
            case P_RIGHT:
                vcon.drawImage(png_rakutankun, 160, 64, 16, 16, this.panchi_x, this.panchi_y, 16, 16);
                break;

            //帽子左の右向きの時のパンチ
            case P_DOWN:
                vcon.drawImage(png_rakutankun, 160, 0, 16, 16, this.panchi_x, this.panchi_y, 16, 16);
                break;
        }
    }

    draw(){        
        this.attackAnime();
    }
}