//
// HPのクラス
//

//一回攻撃食らった後の無敵時間
const invincibleTime = 10;

class HP
{
    constructor(){

        //ハートの表示位置
        this.x = 4;
        this.y = 32;

        //ダメージ量管理
        //敵にあたるとダメージ食らう
        this.hitPoint = 2;

        //無敵になったときの無敵状態の残り時間（カウント）を格納
        this.invincibleCount = 0;
    }

    damaged(){
        /*frameCount使っているのは，無敵時間のイメージ．
        　これ無かったら，hitPointがフレーム毎にデクリメントされて一瞬でゲームオーバーになってしまう．
        　無敵時間の実装は他にもやり方あるだろうから模索中……今はいったんこれで．
        
        ----> 解決！*/

        if(rakutankun.isDamage && this.invincibleCount == 0){
            this.hitPoint--;
            rakutankun.isDamage = false;
            //ここから180フレーム無敵  ---> ちょっと長いかなと思ったので60フレームに変更
            //難しすぎたらまた調整する
            this.invincibleCount = 59;
        }

        //フレーム経過ごとにデクリメント
        if(this.invincibleCount > 0) this.invincibleCount--;

        //無敵残フレームが0のときフラグ処理
        if(this.invincibleCount == 0) rakutankun.isDamage = false;
    }

    recover(rcvAmount){
        //HPが減っていたら回復
        if(rakutankun.isRecover && this.hitPoint < 4) this.hitPoint += rcvAmount;
        //HPが4以上回復した場合，強制的に4にする
        if(this.hitPoint > 4)   this.hitPoint = 4;
        //HPが0以下になった場合，強制的に0にする
        if(this.hitPoint < 0)   this.hitPoint = 0;
        rakutankun.isRecover = false;
    }

    //更新処理
    update(){
        //ダメージ処理
        this.damaged();
        
        //回復処理
        //this.recover();

        if(this.hitPoint == 0) isGameOver = true;
    }

    //描画処理
    draw(){

        //どのハートを表示するか
        switch(this.hitPoint){
            case 4: vcon.drawImage(png_hp1, 0, 0, 1024, 420, this.x, this.y, 32, 16);
            break;
            case 3: vcon.drawImage(png_hp1, 0, 421, 1024, 512, this.x, this.y, 32, 16);
            break;
            case 2: vcon.drawImage(png_hp2, 0, 0, 1024, 420, this.x, this.y, 32, 16);
            break;
            case 1: vcon.drawImage(png_hp2, 0, 420, 1024, 512, this.x, this.y, 32, 16);
            break;
            case 0: vcon.drawImage(png_hp3, 0, 0, 1024, 512, this.x, this.y, 32, 16);
            break;
        }
    }
}
