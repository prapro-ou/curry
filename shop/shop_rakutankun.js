//
//  落単君のクラス
//

//アニメーションの定義
const ANIMATION_RUN1 = 1;
const ANIMATION_RUN2 = 2;
const ANIMATION_RUN3 = 3;

//とりあえず10
var shussekiten  = 10;

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

    //アイテムの中か確認
    checkItem(){
        //枕
        if((this.x + 4) > 20 && (this.x + 12) < 50){
            if((this.y + 32) > 25&& (this.y + 32) < 56){
                if(keyboard.Get && shussekiten){
                     makura_count += 1;
                     shussekiten  -= 1;
                     console.log("makura_count:", makura_count);
                }
                keyboard.Get = false;
            }
        }

        //エナジードリンク
        if((this.x + 4) > 70 && (this.x + 12) < 100){
            if((this.y + 32) > 25&& (this.y + 32) < 56){
                if(keyboard.Get && shussekiten){
                     energy_count += 1;
                     shussekiten  -= 1;
                     console.log("energy_count:", energy_count);
                }
                keyboard.Get= false;
            }
        }

        //鉛筆
        if((this.x + 4) > 120 && (this.x + 12) < 150){
            if((this.y + 32) > 25&& (this.y + 32) < 56){
                if(keyboard.Get && shussekiten){
                     pen_count   += 1;
                     shussekiten -= 1;
                     console.log("pen_count:", pen_count);
                }
                keyboard.Get = false;
            }
        }

        //ノート
        if((this.x + 4) > 170 && (this.x + 12) < 200){
            if((this.y + 32) > 25&& (this.y + 32) < 56){
                if(keyboard.Get && shussekiten){
                     note_count  += 1;
                     shussekiten -= 1;
                     console.log("note_count:", note_count);
                }
                keyboard.Get = false;
            }
        }

        //水
        if((this.x + 4) > 20 && (this.x + 12) < 50){
            if((this.y + 32) > 75&& (this.y + 32) < 106){
                if(keyboard.Get && shussekiten){
                     water_count += 1;
                     shussekiten -= 1;
                     console.log("water_count:", water_count);
                }
                keyboard.Get = false;
            }
        }
        //酒
        if((this.x + 4) > 70 && (this.x + 12) < 100){
            if((this.y + 32) > 75&& (this.y + 32) < 106){
                if(keyboard.Get && shussekiten){
                     drink_count += 1;
                     shussekiten -= 1;
                     console.log("drink_count:", drink_count);
                }
                keyboard.Get = false;
            }
        }

        //ジュース
        if((this.x + 4) > 120 && (this.x + 12) < 150){
            if((this.y + 32) > 75&& (this.y + 32) < 106){
                if(keyboard.Get && shussekiten){
                     juice_count += 1;
                     shussekiten -= 1;
                     console.log("juice_count:", juice_count);
                }
                keyboard.Get = false;
            }
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
        this.checkItem();
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