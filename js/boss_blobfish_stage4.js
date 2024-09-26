//
//  ブロブフィッシュ博士のクラス
//
const boss2_foot_sound = document.getElementById('boss2_foot_sound');
boss2_foot_sound.volume = 0.5;

const boss2_run_sound = document.getElementById('boss2_run_sound');
boss2_run_sound.volume = 0.1;

class Boss_blobfish
{
    constructor(x, y){
        this.x = x;
        this.y = y;

        //ボスのサイズ
        this.width = 96;
        this.height = 96;

        //酒が当たったら立つフラグ
        this.isDrink = false;

        //
        this.count = 0;

        //ミニブロブ生成フラグ
        this.isCreateMini = false;

        //肉弾生成フラグ
        this.isCreateMeat = false;

        //突進フラグ
        this.ischarge = false;
        this.chargeanim = false;
        this.cp = 0;

        //攻撃選択のための乱数格納変数
        this.random = 0;

        //帽子
        this.hat_width = 16;
        this.hat_height = 16;
        this.isHatDamaged = false;

        //踏みつけた回数（3になればクリア）
        this.trampCount = 0;

        this.invincibleCount = 0;

        //ステージクリアフラグ
        this.stageClear = false;

        //
        this.damageCount = 0;
    }

    //突進
    charge(){
        this.cp++;
        if(this.cp < 50) this.x -= 0;
        if(this.cp >= 50 && this.cp < 150) {
            this.x -= 5;
            boss2_run_sound.play();
        }

        if(this.cp == 150){
            this.x = 240;
            this.y = 0;
            this.ischarge = false;
            boss2_foot_sound.play();
        }
        if(this.cp > 150 && this.cp < 300){
            this.y += 5;
        }

        if(this.cp == 300){
            this.cp = 0;
            this.chargeanim = false;
        }
    }

    //攻撃選択
    selectAttack(){
        switch(this.random){
            case 0:
                break;
            case 1:
                this.isCreateMini = true;
                
                break;
            case 2:
                this.isCreateMeat = true;
                break;
            case 3:
                this.ischarge = true;
                this.chargeanim = true;
        }
    }

    //帽子を踏まれてダメージを受ける
    damaged(){
        if(this.isHatDamaged && this.invincibleCount == 0){
            panchi_sound.play();
            this.trampCount++;
            this.isHatDamaged = false;
            this.invincibleCount = 179;
        }

        //フレーム経過ごとにデクリメント
        if(this.invincibleCount > 0) this.invincibleCount--;

        //無敵残フレームが0のときフラグ処理
        if(this.invincibleCount == 0) this.isHatDamaged = false;
    }

    animationDamage(){
        let animation = [1,0,1,0,1,0,1];

        this.damageCount++;
        if(this.damageCount >= animation.length) this.damageCount = 0;  //リセットanimation
        if(animation[this.damageCount] == 0) return false;  //0のときはfalseを返す→落単くん非表示
        else return true;                        //1のときはtrueを返す→落単くん表示           
    }

    //更新処理
    update(){
        this.damaged();

        if(this.trampCount == 3) this.stageClear = true;

        if(this.isDrink){
            this.count++;
            if(this.count == 500){
                this.isDrink = false;   
                this.count = 0;
            }
        }

        if(!this.isDrink){
            //次の攻撃の選択
            if(!this.chargeanim && frameCount % 50 == 0){
                let min = 0;
                let max = 7;
                let weight = [1,3,3,1]; //出現頻度設定
                let sum = 0; //重みの累積
                let random_tmp = Math.floor(Math.random() * (max - min + 1)) + min;

                //random_tmpが0であれば    this.random = 0
                //random_tmpが1～3であれば this.random = 1
                //random_tmpが4～6であれば this.random = 2
                //random_tmpが7であれば    this.random = 3
                for(this.random = 0; this.random < weight.length; this.random++){
                    sum += weight[this.random];
                    if(random_tmp < sum) break;
                }

                console.log(this.random);
                this.selectAttack();
            }
        }

        //突進攻撃
        if(this.chargeanim) this.charge();

        //床との当たり判定
        if(!field.isBlock(this.x >> 4, (this.y + 96) >> 4)){
            this.y    = (this.y + 5) >> 4 << 4;
        }
    }

    //突進描画
    draw_charge(){
        if(this.cp < 150){
            if(frameCount % 2 == 0) vcon.drawImage(png_boss_blobfish, 96, 96, 96, 96, this.x, this.y, 96, 96);
            else vcon.drawImage(png_boss_blobfish, 192, 96, 96, 96, this.x, this.y, 96, 96);
        }
        if(this.cp > 150 && this.cp < 175) vcon.drawImage(png_boss_blobfish, 0, 288, 96, 96, this.x, this.y, 96, 96);
        if(this.cp >= 175 && this.cp < 280) vcon.drawImage(png_boss_blobfish, 0, 192, 96, 96, this.x, this.y, 96, 96);
        if(this.cp >= 280) vcon.drawImage(png_boss_blobfish, 0, 0, 96, 96, this.x, this.y, 96, 96);
    }

    //描画処理
    draw(){
        let isdraw = true;

        if(this.isHatDamaged) isdraw = this.animationDamage();

        if(isdraw){
            if(!this.isDrink){
                switch(this.random){
                    case 0:
                        vcon.drawImage(png_boss_blobfish, 0, 0, 96, 96, this.x, this.y, 96, 96);
                        break;
                    case 1:
                        vcon.drawImage(png_boss_blobfish, 288, 0, 96, 96, this.x, this.y, 96, 96);
                        break;
                    case 2:
                        vcon.drawImage(png_boss_blobfish, 192, 0, 96, 96, this.x, this.y, 96, 96);
                        break;
                    case 3:
                        this.draw_charge();
                        break;
                }
            }
            else if(this.isDrink){
                vcon.drawImage(png_boss_blobfish, 288, 96, 96, 96, this.x, this.y, 96, 96);
            }
        }
    }
}

//
//
//

class MeatBall extends Boss_blobfish
{
    constructor(x, y){
        super(x, y);
        this.meat_x = this.x;
        this.meat_y = this.y;

        //サイズ
        this.width = 16;
        this.height = 16;

        //らくたん君との当たり判定フラグ
        this.isHitMeatBall = false;

        //生成してからの時間を記録
        this.cbtime = performance.now();

    }

    isHitRakutankun(obj){
        let isX = false;
        let isY = false;

        isX = (this.meat_x >= obj.x && this.meat_x <= obj.x + obj.width) || (this.meat_x + this.width >= obj.x && this.meat_x + this.width <= obj.x + obj.width);
        isY = (this.meat_y >= obj.y && this.meat_y <= obj.y + obj.height) || (this.meat_y + this.height >= obj.y && this.meat_y + this.height <= obj.y + obj.height);
        
        return isX && isY;
    }

    //更新処理
    update(){
        /*****らくたん君を追跡する
        難しすぎるかも……変更OK******/
        if(rakutankun.x > this.meat_x) this.meat_x++;
        else this.meat_x--;

        if(rakutankun.y > this.meat_y) this.meat_y++;
        else this.meat_y--;
        /***ここまで***/


        if(this.isHitRakutankun(rakutankun)){
            this.isHitMeatBall = true;
            damage_received_sound.play();
        }
        else this.isHitMeatBall = false;
        
    }

    //描画処理
    draw(){
        vcon.drawImage(png_boss_blobfish, 32, 384, 16, 16, this.meat_x, this.meat_y, 16, 16);
    }
}

//
// ミニブロブフィッシュのクラス
//

class Mini_blobfish extends Boss_blobfish
{
    constructor(x, y){
        super(x,y);
        //口から生成するので＋40
        this.mini_x = this.x + 40;
        this.mini_y = this.y + 40;

        //サイズ
        this.width = 16;
        this.height = 16;

        //らくたん君との当たり判定フラグ
        this.isHitMiniblob = false;

        //床との当たり判定フラグ
        this.isFloor = false;


        //横移動のための変数たち
        let min = 50;
        let max = 100;
        this.random = Math.floor(Math.random() * (max - min + 1)) + min;
        this.istrans = false;
        this.count = 0;

        //生成してからの時間を記録
        this.cbtime = performance.now();

        this.damageCount = 0;

    }

    checkBlock(){
        //まず左の判定
        if(!field.isBlock((this.mini_x - 1)>> 4, (this.mini_y + 1) >> 4) || !field.isBlock((this.mini_x - 1)>> 4, (this.mini_y + 8 + 1) >> 4)){
            this.mini_x += 10;
        }   


        //次に右の判定
        if(!field.isBlock((this.mini_x + 1 + 13) >> 4, (this.mini_y + 1) >> 4) || !field.isBlock((this.mini_x + 1 + 13) >> 4, (this.mini_y + 8 + 1) >> 4)){
            this.mini_x -= 3;
        }

        //次に床の判定
        if(!field.isBlock(this.mini_x >> 4, (this.mini_y + 16) >> 4)){
            this.mini_y    = this.mini_y >> 4 << 4;
            this.isFloor = true;
        }
    }

    isHitRakutankun(obj){
        let isX = false;
        let isY = false;

        isX = (this.mini_x >= obj.x && this.mini_x <= obj.x + obj.width) || (this.mini_x + this.width >= obj.x && this.mini_x + this.width <= obj.x + obj.width);
        isY = (this.mini_y >= obj.y && this.mini_y <= obj.y + obj.height) || (this.mini_y + this.height >= obj.y && this.mini_y + this.height <= obj.y + obj.height);
        
        return isX && isY;
    }

    //更新処理
    update(){

        if(this.isHitRakutankun(rakutankun)){
            this.isHitMiniblob = true;
            damage_received_sound.play();
        }
        else this.isHitMiniblob = false;

        this.checkBlock();

        if(!this.isFloor){
            this.mini_x --;
            this.mini_y += 0.5;
        }
        else{
            if(frameCount % this.random == 0 && !this.istrans) this.istrans = true;
            if(++this.count == this.random){
                this.istrans = false;
                this.count = 0;
            }

            if(this.istrans) this.mini_x++;
            else this.mini_x--;
        }

    }

    //描画処理
    draw(){
        vcon.drawImage(png_boss_blobfish, 16, 384, 16, 16, this.mini_x, this.mini_y, 16, 16);
    }
}
