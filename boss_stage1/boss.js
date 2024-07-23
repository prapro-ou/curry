//
//  ボスステージの敵のクラス
//

class Boss
{
    constructor(x, y, direction){
        this.x = x;
        this.y = y;
        this.count = 0;
        this.dir = direction;       //  アニメーションの遷移を調整するためのカウント
        this.isPanchi = 0;
    }
    
    deleteSelf(){
        let index = enemy_array.indexOf(this);
        if (index !== -1) {
            enemy_array.splice(index, 1);
        }
    }

    update(){
        if((frameCount%20) == 19) this.count++;
    }

    // 敵を表示
    // Input: start_x(スプライト開始点のx座標), start_y(スプライトの開始点のy座標), s_width(スプライトの横幅), s_height(スプライトの縦幅)
    drawEnemy(start_x, start_y, s_width, s_height){
        vcon.drawImage(png_enemy, start_x, start_y, s_width, s_height, this.x, this.y, s_width, s_height);
    }

    //倒された時のアニメーション
    defeatEnemy(){
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
        vcon.drawImage(png_bakuhatsu, 0, 0, 512, 512, this.x, this.y, 32, 32);

    }   

    draw(){
        if(this.isPanchi){
            this.defeatEnemy();
        }
    }

}

//
//  でかタコ助教授のクラス
//

class Boss_Tako extends Boss
{
    constructor(){

    }

    update(){

    }

    draw(){

    }
}

//
//  ブロブフィッシュ博士のクラス
//

class Blob extends Boss
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

class RobotShark extends Boss
{
    constructor(){

    }

    update(){

    }

    draw(){

    }
}

//
//  口頭試問女神のクラス
//

class Liberty extends Boss
{
    constructor(){

    }

    update(){

    }

    draw(){

    }
}
