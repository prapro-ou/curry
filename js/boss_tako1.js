//
//  でかタコ助教授のクラス
//

const FIRE_TIME   = 3600;
const GROUND      = 184;


class Boss_tako 
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

        this.isDamage = false;
        this.damageCount = 0;
        this.PenTimeCount = 0; //ペンが刺さっている時間のカウント追加しました

        //最初右に行けるように設定→変更してもいいよ
        this.isRight = true;
        this.isLeft = false;

        //鉛筆が当たったら立つフラグ
        this.isPen = false;

        this.width = 64;
        this.height = 64;
    }

    //ペンが刺さっている時間のカウント追加しました
    PenTime(){
        if(this.isPen){
            this.PenTimeCount = this.PenTimeCount + 1;
            if(this.PenTimeCount == 250){
                this.isPen = false;
                this.PenTimeCount = 0;     
            }
        }
    }

    moveLeft(){
        this.x -= 0.5;
        if(this.x < 0) {
            this.isRight = true;
            this.isLeft = false;
        }
    }

    moveRight(){
        this.x += 0.5;
        if(this.x > 192){
            this.isLeft = true;
            this.isRight = false;
        }
    }

    update(){
        if(this.isLeft)  this.moveLeft();
        if(this.isRight)  this.moveRight();
        else this.x += 0;
        this.PenTime(); //ペンが刺さっている時間のカウント追加しました
    }

    draw(){


    //カメラ座標系へ変換
        let camera_x = this.x;
        let camera_y = this.y;
        let isdraw = true;

        if(this.isPen && isdraw){
            vcon.drawImage(png_boss_tako, 192, 0, 64, 64, camera_x, camera_y, 64, 64);
        }
        else if(!this.isPen && isdraw){
            if((frameCount%200) <= 20)vcon.drawImage(png_boss_tako, 0, 0, 64, 64, camera_x, camera_y, 64, 64);
            if((frameCount%200) <= 60)vcon.drawImage(png_boss_tako, 64, 0, 64, 64, camera_x, camera_y, 64, 64);
            if((frameCount%200) <= 90)vcon.drawImage(png_boss_tako, 128, 0, 64, 64, camera_x, camera_y, 64, 64);
            if((frameCount%200) <= 150)vcon.drawImage(png_boss_tako, 192, 0, 64, 64, camera_x, camera_y, 64, 64);
            if((frameCount%200) <= 200)vcon.drawImage(png_boss_tako, 0, 0, 64, 64, camera_x, camera_y, 64, 64);
        }
  }
}

//火炎放射器のクラス
//
class Fire {
    constructor(x, y){
        this.x = x;
        this.y = y;

        this.isStageClear = false;
    }

    update(){
        if (frameCount >= FIRE_TIME){
            if (this.y <= GROUND){
                this.y++;
            } else {
                if ((rakutankun.x >= this.x) && (rakutankun.x <= this.x + 16)){
                    this.isStageClear = true;
                }
            }
        }

        if(this.isStageClear){
            this.x = rakutankun.x;
        }
    }

    draw(){
        vcon.drawImage(png_boss_tako, 128, 64, 32, 16, this.x, this.y, 32, 16);
    }
}


// 墨のクラス
//

class Ink extends Boss_tako
{
    constructor(x, y){
        super(x, y);
        this.x = x;
        this.y = y;
        this.ink_x = this.x + 24;
        this.ink_y = this.y + 48;
        this.inkCount = 5;
        this.inkTimeCount = 0;

        this.width = 16;
        this.height = 32;
    }

    isInkHit(obj){
        let isX = false;
        let isY = false;

        isX = (this.ink_x >= obj.x && this.ink_x <= obj.x + obj.width) || (this.ink_x + this.width >= obj.x && this.ink_x + this.width <= obj.x + obj.width);
        isY = (this.ink_y >= obj.y && this.ink_y <= obj.y + obj.height) || (this.ink_y + this.height >= obj.y && this.ink_y + this.height <= obj.y + obj.height);

        return isX && isY;
    }


    //更新処理
    update(){
        this.ink_y++;
        this.inkTimeCount++;

        if (this.isInkHit(rakutankun)) rakutankun.isInk = true;
    }

        
    //描画処理
    draw(){
        if(this.inkTimeCount % 30 < 15){
            vcon.drawImage(png_boss_tako, 96, 64, 16, 32, this.ink_x, this.ink_y, 16, 32);
        } else if (this.inkTimeCount % 30 >= 15){
            vcon.drawImage(png_boss_tako, 112, 64, 16, 32, this.ink_x, this.ink_y, 16, 32);
        }
    }

}

// 触手のクラス
//

class Tentacle extends Boss_tako
{
    constructor(x, y){
        super(x, y);
        this.tentacle_x = rakutankun.x;
        this.tentacle_y = rakutankun.y;
        this.appertentacle = false;
        this.tentacleTimeCount = 0;

        this.width = 16;
        this.height = 32;
    }

    isTentacleHit(obj){
        let isX = false;
        let isY = false;

        isX = (this.tentacle_x >= obj.x && this.tentacle_x <= obj.x + obj.width) || (this.tentacle_x + this.width >= obj.x && this.tentacle_x + this.width <= obj.x + obj.width);
        isY = (this.tentacle_y >= obj.y && this.tentacle_y <= obj.y + obj.height) || (this.tentacle_y + this.height >= obj.y && this.tentacle_y + this.height <= obj.y + obj.height);

        return isX && isY;
    }

    //触手が出現するタイミング時間のカウント追加しました
    //前コードではthis.appertentacleがずっとfalseなのでif以下が実行されていません
    //意図に合わせて変更してください
    //僕の方では一旦最初のifを消しておきます
    //また、frameCountが30のときのみだと、職種が出現するのが一瞬すぎて見えないので範囲も変更してます
    TentacleTime(){
        this.tentacleTimeCount++;
        if(this.tentacleTimeCount >= 120) this.appertentacle = true;
    }

    //更新処理
    update(){
        this.TentacleTime();
        if (this.isTentacleHit(rakutankun) && this.appertentacle) rakutankun.isTentacle = true;
    }

        
    //描画処理
    draw(){
        //警告マークの表示
        if ((!this.appertentacle) && (this.tentacleTimeCount % 40 <= 20)){
            vcon.drawImage(png_boss_tako, 0, 64, 16, 16, this.tentacle_x, this.tentacle_y + 16, 16, 16);
        }
        
        //触手の表示(うねうね付き)
        if((this.appertentacle) && (this.tentacleTimeCount % 20 < 10)){
            vcon.drawImage(png_boss_tako, 64, 64, 16, 32, this.tentacle_x, this.tentacle_y, 16, 32);
        } else if ((this.appertentacle) && (this.tentacleTimeCount % 20 >= 10)){
            vcon.drawImage(png_boss_tako, 80, 64, 16, 32, this.tentacle_x, this.tentacle_y, 16, 32);
        }
    }

}
