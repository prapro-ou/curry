//
//  ノーマルステージの落単くんクラス
//

const RIGHT      = 0;
const LEFT       = 1;
const DOWN       = 2;

const ANIME_STOP = 1;
const MAX_SPEED  = 5;

class Rakutankun
{
    constructor(x, y){
        this.x     = x;
        this.y     = y;

        this.vy    = 0;
        this.vy    = 0;

        this.anim  = 0;
        this.snum  = 0;
        this.acou  = 0;
        this.dirc  = 0;

        this.jump  = 0;
    }

    //左右移動の処理
    updateSwimSub_x(direction){
        if(direction == 0) this.x += 2;
        else this.x -= 2 ;
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

    drawRakutankun(){
        this.updateSwim_x();
        this.updateSwim_y();
    }

    update(){
        this.acou++;
        if (Math.abs(this.vx) == MAX_SPEED) this.acou++;
    }

    draw(){
        let px = this.x;
        let py = this.y;
    
        vcon.drawImage(png_rakutankun, 32, 32, 16, 32, px, py, 16, 32);
        this.drawRakutankun();
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
        if(keyboard.Left){
            this.direction = LEFT;
            this.panchi_x = this.x + 0;
            this.panchi_y = this.y + 15;

        }
        else if(keyboard.Right){
            this.direction = RIGHT;
            this.panchi_x = this.x + 16;
            this.panchi_y = this.y + 15;
        }
        else{
            this.direction = DOWN;
            this.panchi_x = this.x + 2;
            this.panchi_y = this.y + 25;
        }
    }

    update(){
        switch(this.direction){
            case LEFT: this.panchi_x -= 4; break;
            case RIGHT: this.panchi_x += 4; break;
            case DOWN: this.panchi_y += 4; break;
        }

    }

    //攻撃のアニメーション
    attackAnime(){
        switch(this.direction){
            //下向きに動く時の左向きの時のパンチ
            case LEFT:
                vcon.drawImage(png_rakutankun, 160, 48, 16, 16, this.panchi_x, this.panchi_y, 16, 16);
                break;

            //下向きに動く時の右向きの時のパンチ
            case RIGHT:
                vcon.drawImage(png_rakutankun, 160, 64, 16, 16, this.panchi_x, this.panchi_y, 16, 16);
                break;

            //帽子左の右向きの時のパンチ
            case DOWN:
                vcon.drawImage(png_rakutankun, 160, 0, 16, 16, this.panchi_x, this.panchi_y, 16, 16);
                break;
        }
    }

    draw(){        
        this.attackAnime();
    }
}
