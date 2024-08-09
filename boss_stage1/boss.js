//
//  ボスステージの敵のクラス
//


    //倒された時のアニメーション
    // defeatEnemy(){
        // if((frameCount%200) <= 20) vcon.drawImage(defeat_enemy_animation, 0, 0, 16, 16, 100, 100, 32, 32);
        // else if((frameCount%200) > 20 && (frameCount%200) <= 40) vcon.drawImage(defeat_enemy_animation, 16, 0, 16, 16, 100, 100, 32, 32);
        // else if((frameCount%200) > 40 && (frameCount%200) <= 60) vcon.drawImage(defeat_enemy_animation, 32, 0, 16, 16, 100, 100, 32, 32);
        // else if((frameCount%200) > 60 && (frameCount%200) <= 80) vcon.drawImage(defeat_enemy_animation, 48, 0, 16, 16, 100, 100, 32, 32);
        // else if((frameCount%200) > 80 && (frameCount%200) <= 100) vcon.drawImage(defeat_enemy_animation, 0, 16, 16, 16, 100, 100, 32, 32);
        // else if((frameCount%200) > 100 && (frameCount%200) <= 120) vcon.drawImage(defeat_enemy_animation, 16, 16, 16, 16, 100, 100, 32, 32);
        // else if((frameCount%200) > 120 && (frameCount%200) <= 140) vcon.drawImage(defeat_enemy_animation, 32, 16, 16, 16, 100, 100, 32, 32);
        // else if((frameCount%200) > 140 && (frameCount%200) <= 160) vcon.drawImage(defeat_enemy_animation, 48, 16, 16, 16, 100, 100, 32, 32);
        // else if((frameCount%200) > 160 && (frameCount%200) <= 180) vcon.drawImage(defeat_enemy_animation, 0, 32, 16, 16, 100, 100, 32, 32);
        // else vcon.drawImage(defeat_enemy_animation, 16, 32, 16, 16, 100, 100, 32, 32);
    //     vcon.drawImage(png_bakuhatsu, 0, 0, 512, 512, this.x, this.y, 32, 32);

    // }   

//
//  でかタコ助教授のクラス
//

let defeat = false;

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

        //最初右に行けるように設定→変更してもいいよ
        this.isRight = true;
        this.isLeft = false;

        //鉛筆が当たったら立つフラグ
        this.isPen = false;

        this.width = 64;
        this.height = 64;
    }

    moveLeft(){
        this.x -= 0.5;
        if(this.x < 32) {
            this.isRight = true;
            this.isLeft = false;
        }
    }

    moveRight(){
        this.x += 0.5;
        if(this.x > 128){
            this.isLeft = true;
            this.isRight = false;
        }
    }

    update(){
        if(this.isLeft)  this.moveLeft();
        if(this.isRight)  this.moveRight();
        else this.x += 0;
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

        // if (defeat = true){
        // if((frameCount%200) <= 20) vcon.drawImage(png_defeat_enemy_animation, 0, 0, 16, 16, 100, 100, 64, 64);
        // else if((frameCount%200) > 20 && (frameCount%200) <= 40) vcon.drawImage(png_defeat_enemy_animation, 16, 0, 16, 16, 100, 100, 64, 64);
        // else if((frameCount%200) > 40 && (frameCount%200) <= 60) vcon.drawImage(png_defeat_enemy_animation, 32, 0, 16, 16, 100, 100, 64, 64);
        // else if((frameCount%200) > 60 && (frameCount%200) <= 80) vcon.drawImage(png_defeat_enemy_animation, 48, 0, 16, 16, 100, 100, 64, 64);
        // else if((frameCount%200) > 80 && (frameCount%200) <= 100) vcon.drawImage(png_defeat_enemy_animation, 0, 16, 16, 16, 100, 100, 64, 64);
        // else if((frameCount%200) > 100 && (frameCount%200) <= 120) vcon.drawImage(png_defeat_enemy_animation, 16, 16, 16, 16, 100, 100, 64, 64);
        // else if((frameCount%200) > 120 && (frameCount%200) <= 140) vcon.drawImage(png_defeat_enemy_animation, 32, 16, 16, 16, 100, 100, 64, 64);
        // else if((frameCount%200) > 140 && (frameCount%200) <= 160) vcon.drawImage(png_defeat_enemy_animation, 48, 16, 16, 16, 100, 100, 64, 64);
        // else if((frameCount%200) > 160 && (frameCount%200) <= 180) vcon.drawImage(png_defeat_enemy_animation, 0, 32, 16, 16, 100, 100, 64, 64);
        // }
        }
  }
}

//
//  ブロブフィッシュ博士のクラス
//

class Blob
{
    constructor(){

    }

    update(){

    }

    draw(){

    }
}

//
//  ロボットシャーク教授のクラス
//

class RobotShark 
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
    }
    

    update(){

        this.updateRakutankun();


    }

    draw(){

    }
}

//
//  口頭試問女神のクラス
//

class Liberty 
{
    constructor(){

    }

    update(){

    }

    draw(){

    }
}
