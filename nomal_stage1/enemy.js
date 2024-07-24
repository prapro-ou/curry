//
//  ノーマルステージの敵のクラス
//

class Enemy 
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
        if((frameCount%20) == 19) this.count++;     //ここは調整してOK
    }

    // 敵を表示
    // Input: start_x(スプライト開始点のx座標), start_y(スプライトの開始点のy座標), s_width(スプライトの横幅), s_height(スプライトの縦幅)
    drawEnemy(start_x, start_y, s_width, s_height){
        //敵がスクロールについてこないようにy座標を調整
        vcon.drawImage(png_enemy, start_x, start_y, s_width, s_height, this.x, this.y - field.scy, s_width, s_height);
    }

    //倒された時のアニメーション
    defeatEnemy(){
        vcon.drawImage(png_bakuhatsu, 0, 0, 512, 512, this.x, this.y - field.scy, 32, 32);
    }   

    draw(){
        if(this.isPanchi){
            this.defeatEnemy();
        }
    }

}

//
//  アンコウのクラス
//

class Anko extends Enemy
{
    constructor(x, y, direction){
        super(x, y, direction);
        this.width = 32;
        this.height = 32;
    }

    update(){
        super.update();
        if(this.dir == 0){
            if((frameCount%20) == 19) this.x -= 2;
        }
        else if((frameCount%20) == 19) this.x += 2;
    }

    animation(){
        let px = 0;
        if(this.dir == 0){
            if((frameCount%14) < 7) px = 32 * (this.count % 2);
            super.drawEnemy(px, 0, 32, 32);
        }
        else {
            if((this.count%14) < 7) px = 96 - 32 * (this.count % 2);
            else px = 96;
            super.drawEnemy(px, 0, 32, 32);
        }
    }

    draw(){
        this.animation(0, 0, 32, 32);
        super.draw();
    }
}

//
//  マンボウのクラス
//

class Manbo extends Enemy
{
    constructor(x, y, direction){
        super(x, y, direction);
        this.width = 32;
        this.height = 32;

    }

    update(){
        super.update();
        if(this.dir == 0){
            if((frameCount%20) == 19) this.x -= 2;
        }
        else if((frameCount%20) == 19) this.x += 2;
    }

    animation(){
        let px = 128;
        super.drawEnemy(px, 0, 32, 32);
    }

    draw(){
        this.animation();
        super.draw();
    }
}

//
//  ウニのクラス
//

class Uni extends Enemy
{
    constructor(x, y, direction){
        super(x, y, direction);
        this.width = 16;
        this.height = 32;

    }

    update(){
        super.update();
        if(this.dir == 0){
            if((frameCount%20) == 19) this.x -= 2;
        }
        else if((frameCount%20) == 19) this.x += 2;
    }

    draw(){
        super.drawEnemy(0, 32, 16, 32);
        super.draw();
    }
}

//
//  タコのクラス
//

class Tako extends Enemy
{
    constructor(x, y, direction){
        super(x, y, direction);
        this.width = 16;
        this.height = 16;

    }

    update(){
        super.update();
        if(this.dir == 0){
            if((frameCount%20) == 19) this.x -= 2;
        }
        else if((frameCount%20) == 19) this.x += 2;
    }

    draw(){
        super.drawEnemy(32, 48, 16, 16);
        super.draw();
    }
}

//
//  くらげのクラス
//

class Kurage extends Enemy
{
    constructor(x, y, direction){
        super(x, y, direction);
        this.rand = 0;
        this.width = 16;
        this.height = 16;

    }

    update(){
        super.update();

        //クラゲをランダムに移動させる
        if((frameCount%10) <= 5) this.rand = Math.floor(Math.random() * 100);
        if((this.rand%4) == 0) this.x -= 2;
        else if((this.rand%4) == 1) this.x += 2;
        else if((this.rand%4) == 2) this.y += 2;
        else if((this.rand%4) == 3) this.y -= 2;

    }

    draw(){
        super.drawEnemy(64, 48, 16, 16);
        super.draw();
    }
}

//
//  サメのクラス
//

class Same extends Enemy
{
    constructor(x, y, direction){
        super(x, y, direction);
        this.width = 32;
        this.height = 16;
    }

    update(){
        super.update();
        if(this.dir == 0){
            if((frameCount%20) == 19) this.x -= 2;
        }
        else if((frameCount%20) == 19) this.x += 2;
    }

    animation(){
        let px = 96;
        if(this.dir == 0){
            if((frameCount%14) < 7) px += 32 * (this.count % 2);
            super.drawEnemy(px, 48, 32, 16);
        }
        else {
            if((this.count%14) < 7) px = 192 - 32 * (this.count % 2);
            else px = 192;
            super.drawEnemy(px, 48, 32, 16);
        }
    }

    draw(){
        this.animation();
        super.draw();
    }
}

//
//  ウツボのクラス
//

class Utsubo extends Enemy
{
    constructor(x, y, direction){
        super(x, y, direction);
        this.width = 32;
        this.height = 32;
    }

    update(){
        super.update();
    }

    animation(){
        let px = 0;
        if((this.count%14) < 7) px = 32 * (this.count % 7);
        else px = 192 - 32 * (this.count % 7);
        super.drawEnemy(px, 64, 32, 32);
    }

    draw(){
        this.animation();
        super.draw();
    }
}