//
//  ボスステージの落単くんクラス
//

const RIGHT     = 0;
const LEFT      = 1;

const ACCEL     = 0.015625;
const MAX_SPEED = 1; //左右に移動する速度

const SPRITE_SPEED = 5; //数が小さくなれば高速描写


class Rakutankun {
    constructor(x, y){
        this.x     = x;
        this.y     = y;
    
        this.vx    = 0;

        this.snum  = 0; //ある1種類(走るなど)のスプライトのどの画像を表示させるか
        this.acou  = 0; //経過フレーム数
        this.sx    = 32;
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

    update(){
        this.acou++;
        this.update_x();
        this.updateAnim();
    }

    draw(){
        //カメラ座標系へ変換
        let camera_x = this.x;
        let camera_y = this.y;
        let isdraw   = true;

        if (isdraw){
        vcon.drawImage(png_rakutankun, this.sx, 64, 16, 32, camera_x, camera_y, 16, 32);
        }
    }
}