//
// アイテムのクラス
//

class Item
{
    constructor(x, y){

        //ワールド座標系
        this.x = x;
        this.y = y;
        
        this.count = 0;

        //アイテム獲得時に立てるフラグ
        this.isGetItem = false;
        // 回復する量
        this.rcvAmount = 0;
        this.type = 'type';
        //
        this.isMakura      = false;
        this.isEnergy      = false;
        this.isPen         = false;
        this.isNote        = false;
        this.isShussekiten = false;
        this.isWater       = false;
        this.isDrink       = false;
        this.isJuice       = false;
    }

    deleteSelf(){
        let index = item_array.indexOf(this);
        if (index !== -1) {
            item_array.splice(index, 1);
        }
    }

    update(){
        if((frameCount%20) == 19) this.count++;     //ここは調整してOK
    }

    // アイテムを表示
    // Input: start_x(スプライト開始点のx座標), start_y(スプライトの開始点のy座標), s_width(スプライトの横幅), s_height(スプライトの縦幅)
    drawItem(start_x, start_y, s_width, s_height){
        //アイテムがスクロールについてこないようにy座標を調整
        vcon.drawImage(png_item, start_x, start_y, s_width, s_height, this.x, this.y - field.scy, 16, 16);
    }


    /**************** ここは編集↓ **********************/

    //アイテム取得した時のアニメーション
    //敵を倒したときと同じ爆発アニメーションになってる → ほかにいいのないかな？
    getItem(){
        vcon.drawImage(png_bakuhatsu, 0, 0, 512, 512, this.x, this.y - field.scy, 32, 32);
    }   

    /**************** ここは編集↑ **********************/


    draw(){
        if(this.isGetItem){
            this.getItem();
        }
    }

}

//
// 枕のクラス
//

class Makura extends Item
{
    constructor(x, y, isMakura, type, rcvAmount){
        super(x, y, isMakura, type, rcvAmount);
        this.width = 16;
        this.height = 16;
        this.type = 'Makura';
    }

    update(){
        if(this.isMakura){
            rakutankun.isRecover = true;
            this.rcvAmount = 4;
            hp.recover(this.rcvAmount);

            this.rcvAmount = 0;
            // this.isMakura  = false;
        }
    }

    draw(){
        if(!this.isMakura){
            super.drawItem(0, 0, 16, 16);
        }
        else{
            vcon.drawImage(png_item, 0, 0, 0, 0, this.x, this.y, 0, 0);
            super.draw();
        }
    }
}

//
// エナジードリンクのクラス
//

class Energy extends Item
{
    constructor(x, y, isEnergy, type, rcvAmount){
        super(x, y,  isEnergy, type, rcvAmount);
        this.width = 16;
        this.height = 16;
        this.type = 'Energy';
    }

    update(){
        if(this.isEnergy){
            rakutankun.isRecover = true;
            this.rcvAmount = 2;
            hp.recover(this.rcvAmount);

            this.rcvAmount = 0;
            // this.isEnergy  = false;
        }
    }

    draw(){
        if(!this.isEnergy){
            super.drawItem(16, 0, 16, 16);
        }
        else {
            vcon.drawImage(png_item, 0, 0, 0, 0, this.x, this.y, 0, 0);
            super.draw();
        }
    }
}

//
// 鉛筆のクラス
//

class Pen extends Item
{
    constructor(x, y, isPen, type, rcvAmount){
        super(x, y, isPen, type, rcvAmount);
        this.width = 16;
        this.height = 16;
        this.type = 'Pen';
      
    }

    update(){
    }

    draw(){
        if(!this.isPen) super.drawItem(32, 0, 16, 16);
        else {
            vcon.drawImage(png_item, 0, 0, 0, 0, this.x, this.y, 0, 0);
            super.draw();
        }
    }
}

//
// ノートのクラス
//

class Note extends Item
{
    constructor(x, y, isNote, type, rcvAmount){
        super(x, y, isNote, type, rcvAmount);
        this.width = 16;
        this.height = 16;
        this.type = 'Note';
    }

    update(){
    }

    draw(){
        if(!this.isNote) super.drawItem(48, 0, 16, 16);
        else {
            vcon.drawImage(png_item, 0, 0, 0, 0, this.x, this.y, 0, 0);
            super.draw();
        }
    }   
}

//
// 出席点
//

class Shussekiten extends Item
{
    constructor(x, y, isShussekiten, type, rcvAmount){
        super(x, y, isShussekiten, type, rcvAmount);
        this.width = 16;
        this.height = 16;
        this.type = 'Shussekiten';
    }

    update(){

    }

    draw(){
        if(!this.isShussekiten){
            super.drawItem(64, 0, 16, 16);
        }
        else {
            vcon.drawImage(png_item, 0, 0, 0, 0, this.x, this.y, 0, 0);
            super.draw();
        }
    }
}

//
// 水のクラス
//

class Water extends Item
{
    constructor(x, y, isWater, type, rcvAmount){
        super(x, y, isWater, type, rcvAmount);
        this.width = 32;
        this.height = 32;
        this.type = 'Water';
    }

    update(){
    }

    draw(){
        if(!this.isWater)   super.drawItem(0, 16, 32, 32);
        else{
            vcon.drawImage(png_item, 0, 0, 0, 0, this.x, this.y, 0, 0);
            super.draw();
        }
    }
}

//
// 酒のクラス
//

class Drink extends Item
{
    constructor(x, y, isDrink, type, rcvAmount){
        super(x, y, isDrink, type, rcvAmount);
        this.width = 32;
        this.height = 32;
        this.type = 'Drink';
        // 回復量をランダムで指定
        this.rand =  Math.floor(Math.random()* 128) % 5;
    }


    update(){
        if(this.isDrink){
            rakutankun.isRecover = true;
            //回復量0の時はHPが1減る
            if(this.rand == 0)  this.rcvAmount = -1;
            else this.rcvAmount = this.rand;

            hp.recover(this.rcvAmount);
            // HPが0にならないように調整
            if(hp.hitPoint == 0){
                hp.recover(1);
            }
            this.isDrink = false;

            this.rcvAmount = 0;
            // this.isEnergy  = false;
        }
    }

    draw(){
        if(!this.isDrink) super.drawItem(32, 16, 32, 32);
        else{
            con.drawImage(png_item, 0, 0, 0, 0, this.x, this.y, 0, 0);
            super.draw();
        }    
    }
}

//
// ジュースのクラス
//

class Juice extends Item
{
    constructor(x, y, isJuice, type, rcvAmount){
        super(x, y, isJuice, type, rcvAmount);
        this.width = 32;
        this.height = 32;
        this.type = 'Juice';
    }

    update(){
        if(this.isJuice){
            rakutankun.isRecover = true;
            this.rcvAmount = 3;
            hp.recover(this.rcvAmount);

            this.isDrink = false;
            this.rcvAmount = 0;
        }
    }

    draw(){
        if(!this.isJuice)   super.drawItem(64, 16, 32, 32);
        else{
            con.drawImage(png_item, 0, 0, 0, 0, this.x, this.y, 0, 0);
            super.draw();
        }
    }
}


//
// 人魚のクラス
//

class Mermaid extends Item
{
    constructor(x, y){
        super(x, y);
        this.width = 32;
        this.height = 32;
    }

    update(){

    }

    draw(){
        super.drawItem(0, 48, 32, 32);
        super.draw();
    }
}