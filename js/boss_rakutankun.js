//
//  ボスステージの落単くんクラス
//

const RIGHT     = 0;
const LEFT      = 1;

const ACCEL     = 0.015625;
const MAX_SPEED = 1; //左右に移動する速度

const SPRITE_SPEED = 5; //数が小さくなれば高速描写

//音取得
const damage_received_sound = document.getElementById('damage_received_sound');
damage_received_sound.volume = 0.05;


class Rakutankun {
    constructor(x, y){
        this.x     = x;
        this.y     = y;
    
        this.vx    = 0;

        this.snum  = 0; //ある1種類(走るなど)のスプライトのどの画像を表示させるか
        this.acou  = 0; //経過フレーム数
        this.sx    = 32;

        this.isInk = false; //墨が当たったときに立つフラグ
        this.isTentacle = false; //触手が当たったときに立つフラグ
        
        //ダメージカウント
        this.damageCount = 0;

        //ダメージを食らったら立てるフラグ
        this.isDamage = false;

        this.width = 16;
        this.height = 32;
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


    update_x(){ //座標処理 //注意：左キーと右キーが同時押しされると落単くんは移動しない．移動している状態で同時押しすると減速して移動しなくなる
        //左右キーが押されている時に最高速まで加速する
        if (keyboard.Left && this.vx > -MAX_SPEED){
            this.vx -= ACCEL;
        }
        if (keyboard.Right && this.vx < MAX_SPEED){
            this.vx += ACCEL;
        }

        //進行方向とは逆のキーが入力されたら強い減速
        if ((this.vx < 0) && (keyboard.Right)){
            this.vx += ACCEL;
        }
        if ((this.vx > 0) && (keyboard.Left)){
            this.vx -= ACCEL;
        }

        //左右キーが押されていない時に減速する
        if ((!keyboard.Left) && (!keyboard.Right)){
            if(this.vx > 0)  this.vx  -= ACCEL;
            if(this.vx < 0)  this.vx  += ACCEL;
        }

        this.checkBlock();

        //座標に反映
        this.x += this.vx;
    }

    updateAnim(){ //アニメーション処理
        let sx = 0;
        this.snum = (this.acou / SPRITE_SPEED) % 10; //10は走るスプライトの枚数．
        if (this.snum < 6){
            this.sx = 32 + (this.snum << 4);
        } else {
            this.sx = 112 - ((this.snum - 5) << 4);
        }
        // let animation = [1,2,3,4,5,6,7];
        // let anim_num = 0;
                
    }
    
    //ダメージを受けたときの落単くんが点滅するアニメーション
    animationDamage(){
        let animation = [1,0,1,0,1,0,1];

        this.damageCount++;
        if(this.damageCount >= animation.length) this.damageCount = 0;  //リセットanimation
        if(animation[this.damageCount] == 0) return false;  //0のときはfalseを返す→落単くん非表示
        else return true;                        //1のときはtrueを返す→落単くん表示           
    }


    update(){
        this.acou++;
        this.update_x();
        this.updateAnim();

        /** フラグがたったらHPを減らす、点滅するなど（ノーマルステージを参考に）**/
        if(this.isInk || this.isTentacle){
            this.isDamage = true;
            this.isInk = false;
            this.isTentacle = false;
            damage_received_sound.play();
        }
    }

    draw(){
        //カメラ座標系へ変換
        let camera_x = this.x;
        let camera_y = this.y;
        let isdraw   = true;

        if(this.isDamage){
            isdraw = this.animationDamage();
        }

        if (isdraw) vcon.drawImage(png_rakutankun, this.sx, 64, 16, 32, camera_x, camera_y, 16, 32);
    }
}


//
// 鉛筆のクラス
//

//音取得
const pen_sound = document.getElementById('pen_sound');
pen_sound.volume = 0.3;


class Pen extends Rakutankun
{
    constructor(x, y){
        super(x, y);
        this.pen_x = this.x;
        this.pen_y = this.y;

        this.width = 16;
        this.height = 16;

        this.isHit = false;
    }

    isPenHit(obj){
        let isX = false;
        let isY = false;

        isX = (this.pen_x >= obj.x && this.pen_x <= obj.x + obj.width) || (this.pen_x + this.width >= obj.x && this.pen_x + this.width <= obj.x + obj.width);
        isY = (this.pen_y >= obj.y && this.pen_y <= obj.y + obj.height) || (this.pen_y + this.height >= obj.y && this.pen_y + this.height <= obj.y + obj.height);

        return isX && isY;
    }

    //更新処理
    update(){
        this.pen_y--;

        if (this.isPenHit(boss)){
            //音
            pen_sound.play();
            boss.isPen = true;
            this.isHit = true;
        }
    } 

    //描画処理
    draw(){
        vcon.drawImage(png_boss_tako, 16, 64, 16, 16, this.pen_x, this.pen_y, 16, 16);
    }
}
