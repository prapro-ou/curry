//
// ボスステージ２の落単くんクラス
//

const RIGHT     = 0;
const LEFT      = 1;

const ACCEL     = 0.015625;
const MAX_SPEED = 1; //左右に移動する速度

const SPRITE_SPEED = 5; //数が小さくなれば高速描写
const GRAVITY   = 0.1;

//音取得
const damage_received_sound = document.getElementById('damage_received_sound');
damage_received_sound.volume = 0.05;

const sake_attack_sound = document.getElementById('sake_attack_sound');
sake_attack_sound.volume = 0.5;

const panchi_sound = document.getElementById('panchi_sound');
panchi_sound.volume = 0.5;


class Rakutankun
{
    constructor(x, y){
        this.x     = x;
        this.y     = y;
        this.vx    = 0;
        this.vy    = 0;

        this.jump  = 0;

        this.spx   = 0;
        this.spy   = 96;
        this.sx    = 32;

        this.isFloor = true;
        this.isDamage = false;

        //ダメージカウント
        this.damageCount = 0;

        //サイズ
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

        //次に床の判定
        if(!field.isBlock(this.x >> 4, (this.y + 32) >> 4)){
            this.vy = 0; 
            this.jump = 0;
            this.y    = (this.y + this.vy) >> 4 << 4;
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

        this.x += this.vx;
    }

    //ジャンプ処理
    updateJump(){
        if(keyboard.Jump){
            this.isFloor = false;
            this.jump = 1;
        }

        if(!this.isFloor){
            let v0 = -2;  //初速
            this.vy = v0 + GRAVITY * this.jump;

            if(this.jump){
                this.jump++;
                this.y += this.vy;
            }
        }
    }

    //ブロブフィッシュとの当たり判定
    isHitBlob(obj){
        let isX = false;
        let isY = false;

        let isx = false;
        let isy = false;

        isX = (this.x >= obj.x && this.x <= obj.x + obj.width) || (this.x + this.width >= obj.x && this.x + this.width <= obj.x + obj.width);
        isY = (this.y >= obj.y && this.y <= obj.y + obj.height) || (this.y + this.height >= obj.y && this.y + this.height <= obj.y + obj.height);
        
        isx = (this.x <= obj.x && obj.x <= this.x + 16) || (this.x <= obj.x + obj.width && obj.x + obj.width <= this.x + 16)
        isy = (this.y <= obj.y && obj.y <= this.y + 32) || (this.y <= obj.y + obj.height && obj.y + obj.height <= this.y + 32) 

        return (isX && isY) || (isx && isy);

    }


    //ダメージを受けたときの落単くんが点滅するアニメーション
    animationDamage(){
        let animation = [1,0,1,0,1,0,1];

        this.damageCount++;
        if(this.damageCount >= animation.length) this.damageCount = 0;  //リセットanimation
        if(animation[this.damageCount] == 0) return false;  //0のときはfalseを返す→落単くん非表示
        else return true;                        //1のときはtrueを返す→落単くん表示           
    }

    istrampHat(){
        let hat_x = boss.x + 48;
        let hat_y = boss.y;

        let isX = false;
        let isY = false;

        isX = (this.x >= hat_x && this.x <= hat_x + boss.hat_width) || (this.x + this.width >= hat_x && this.x + this.width <= hat_x + boss.hat_width);
        isY = (this.y >= hat_y && this.y <= hat_y + boss.hat_height) || (this.y + this.height >= hat_y && this.y + this.height <= hat_y + boss.hat_height);
        
        return (isX && isY);
    }

    update(){
        this.acou++;
        this.updateJump();
        this.update_x();

        //重力
        if(this.vy < 64) this.vy += GRAVITY;        

        this.checkBlock();

        if((!boss.isDrink) && this.isHitBlob(boss)){
            this.isDamage = true;
            damage_received_sound.play();
        }
        if((!boss.ischarge) && this.istrampHat() && boss.isDrink){
            panchi_sound.play();
            boss.isHatDamaged = true;
        }        
    }

    draw(){
        let isdraw = true;

        if(this.isDamage){
            isdraw = this.animationDamage();
        }

        if(isdraw) vcon.drawImage(png_rakutankun, this.spx, this.spy, 16, 32, this.x, this.y, 16, 32);
    }
}

//
// ブロブフィッシュに投げつける酒クラス
//

class Drink extends Rakutankun
{
    constructor(x,y){
        super(x, y);
        this.drinkCount = 10;

        this.drink_x = this.x + 16;
        this.drink_y = this.y;

        this.isAttack = false;
    }

    deleteSelf(){
        let index = drink_array.indexOf(this);
        if (index !== -1) {
            drink_array.splice(index, 1);
        }
    }

    //当たり判定
    //敵の各クラスにサイズを持たせたので，それを使って判定を行うようにする
    isDrinkHit(obj){
        let isX = false;
        let isY = false;

        let isx = false;
        let isy = false;

        isX = this.drink_x >= obj.x && this.drink_x <= obj.x + obj.width;
        isY = this.drink_y >= obj.y && this.drink_y <= obj.y + obj.height;

        isx = (this.drink_x <= obj.x && obj.x <= this.drink_x + 16) || (this.drink_x <= obj.x + obj.width && obj.x + obj.width <= this.drink_x + 16)
        isy = (this.drink_y <= obj.y && obj.y <= this.drink_y + 32) || (this.drink_y <= obj.y + obj.height && obj.y + obj.height <= this.drink_y + 32) 


        return isX && isY;
    }

    //更新処理
    update(){
        this.drink_x += 4;
        if (boss.ischarge && this.isDrinkHit(boss)){
            sake_attack_sound.play();
            boss.isDrink = true;
            this.isAttack = true;
        }
    }

    //描画処理
    draw(){
        if(boss.Drink){
            vcon.drawImage(png_bakuhatsu, 0, 0, 512, 512, this.x, this.y, 32, 32);
        }
        else vcon.drawImage(png_item2, 0, 0, 16, 32, this.drink_x, this.drink_y, 16, 32);
    }
}