//
// クジラのクラス
//

class Whale
{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.width = 64;
        this.height = 64;
        this.type = 'Whale';
        this.exp = 0;
        this.ox = this.x + 96;
        this.oy = this.y + 96;
        this.count = 0;

        //最大まで拡大されると立つフラグ→クジラの口が閉まる
        this.isEat = false;

        //このフラグがたつ＝らくたん君が消える
        this.isToNext = false;
    }

    update(){
        if(this.count < 96){
            this.ox--;
            this.oy--;
            this.count++;
        }

        if(this.count >= 96) this.isEat = true;
    }

    //だんだん大きくなって最後口を閉じると同時にらくたん君が消える
    draw(){
        if(!this.isEat){
            vcon.drawImage(png_enemy, 0, 96, this.width, this.height, this.ox, this.oy - field.scy, this.count * 2, this.count * 2);
        }

        if(this.isEat){
            vcon.drawImage(png_enemy, 64, 96, this.width, this.height, this.ox, this.oy - field.scy, this.count * 2, this.count * 2);
            this.isToNext = true;
        }
    }

}