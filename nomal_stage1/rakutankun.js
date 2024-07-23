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
            this.y += 10;
        }
    }

    updateRakutankun(){
        this.updateSwim_x();
        this.updateSwim_y();
    }

    //敵に当たったらtrueを返す
    //このtrueを使って点滅処理・ダメージを受ける処理をする
    isHitEnemy(obj){
        this.x;
        this.y;
        let isX = false;
        let isY = false;

        if(obj instanceof Anko || Manbo || Utsubo){
            isX = (this.x >= obj.x && this.x <= obj.x + 32) || (this.x + 16 >= obj.x && this.x + 16 <= obj.x + 32);
            isY = (this.y >= obj.y && this.y <= obj.y + 32) || (this.y + 32 >= obj.y && this.y + 32 <= obj.y + 32);
        }
        else{
            isX = (this.x >= obj.x && this.x <= obj.x + 16) || (this.x + 16 >= obj.x && this.x + 16 <= obj.x + 16);
            isY = (this.y >= obj.y && this.y <= obj.y + 16) || (this.y + 32 >= obj.y && this.y + 32 <= obj.y + 16);
        }
        
        return isX && isY;
    }

    //ダメージを受けたときの落単くんが点滅するアニメーション
    animationDamage(){
        let animation = [1,0,1,0,1,0,1];

        if((frameCount%4) == 2) this.damageCount++;
        if(this.damageCount >= animation.length) this.damageCount = 0;  //リセットa
        if(animation[this.damageCount] == 0) return false;  //0のときはfalseを返す→落単くん非表示
        else return true;                        //1のときはtrueを返す→落単くん表示           
    }

    update(){
        this.acou++;
        if (Math.abs(this.vx) == MAX_SPEED) this.acou++;
        this.updateRakutankun();
        //敵にあたったかどうか判定
        //この判定は，HPを減らす処理でも使える this.isDamage = true ならHPを減らす
        enemy_array.forEach(Enemy => {
            if (this.isHitEnemy(Enemy)) this.isDamage = true;  //ダメージを受けていたらフラグを立てる
        });
    }

    draw(){
        let px = this.x - field.scx;
        let py = this.y - field.scy;
        let isdraw = true;
        
        if(this.isDamage){
            isdraw = this.animationDamage();
            if(this.damageCount == 0) this.isDamage = false;
        }

        if(isdraw) vcon.drawImage(png_rakutankun, 32, 32, 16, 32, px, py, 16, 32);

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
            this.panchi_y = this.y + 15;

        }
        else if(keyboard.RPanchi){
            this.direction = P_RIGHT;
            this.panchi_x = this.x + 16;
            this.panchi_y = this.y + 15;
        }
        else{
            this.direction = P_DOWN;
            this.panchi_x = this.x + 2;
            this.panchi_y = this.y + 25;
        }
    }

    isPanchiHit(obj){
            let isX = false;
            let isY = false;

            if(obj instanceof Anko || Manbo || Utsubo){
                isX = this.panchi_x >= obj.x && this.panchi_x <= obj.x + 32;
                isY = this.panchi_y >= obj.y && this.panchi_y <= obj.y + 32;
            }
            else{
                isX = this.panchi_x >= obj.x && this.panchi_x <= obj.x + 16;
                isY = this.panchi_y >= obj.y && this.panchi_y <= obj.y + 16;
            }
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
        })

    }

    //攻撃のアニメーション
    attackAnime(){
        switch(this.direction){
            //下向きに動く時の左向きの時のパンチ
            case P_LEFT:
                vcon.drawImage(png_rakutankun, 160, 48, 16, 16, this.panchi_x, this.panchi_y, 16, 16);
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
