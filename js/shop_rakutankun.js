//
//  落単君のクラス
//

//アニメーションの定義
const ANIMATION_RUN1 = 1;
const ANIMATION_RUN2 = 2;
const ANIMATION_RUN3 = 3;

//各アイテムの数
//この宣言の仕方でいいのかな...
var makura_count = 0;
var energy_count = 0;
var pen_count    = 0;
var note_count   = 0;
var water_count  = 0;
var drink_count  = 0;
var juice_count  = 0;


class Shop_Rakutankun
{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.animation = 0;
        this.sp_num = 0;
    }

    //スプライトを変える処理
    updateAnimation(){
        //スプライトの決定
        switch (this.animation){
            case ANIMATION_RUN1:
                this.sp_num = 1;
                break;
            case ANIMATION_RUN2:
                this.sp_num = 2;
                break;
            case ANIMATION_RUN3:
                this.sp_num = 3;
                break;
        }
    }

    //歩く・走る処理
    updateRun(){
        if(keyboard.Left){
            this.x -= 1;
        }
        if(keyboard.Right){
            this.x += 1;
        }
        if(keyboard.Up){
            this.y += 1;
        }
        if(keyboard.Down){
            this.y -= 1;
        }
    }


    //毎フレームごとの更新処理
    update()
    {    
        if((frameCount%60) <= 20) this.animation = ANIMATION_RUN1;
        else if((frameCount%60) > 20 && (frameCount%60) <= 40) this.animation = ANIMATION_RUN2;
        else this.animation = ANIMATION_RUN3;

        this.updateAnimation();
        this.updateRun();
    }

    //毎フレームごとの描画処理
    draw()
    {
        let sx = (this.sp_num - 1) << 4;
        let sy = 0;

        //実画面に表示するときのサイズ
        let w  = 16;
        let h  = 32;

        vcon.drawImage(rakutankun_kun, sx, sy, w, h, 242, 2, 8, 16);
    }


}