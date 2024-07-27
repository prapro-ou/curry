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
        this.isgetItem = false;
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
        vcon.drawImage(png_item, start_x, start_y, s_width, s_height, this.x, this.y - field.scy, s_width, s_height);
    }

    //アイテム取得した時のアニメーション
    getItem(){
        vcon.drawImage(png_bakuhatsu, 0, 0, 512, 512, this.x, this.y - field.scy, 32, 32);
    }   

    draw(){
        if(this.isgetItem){
            this.getItem();
        }
    }

}

//
// 枕のクラス
//

class Makura extends Item
{
    constructor(x, y){
        super(x, y);
    }

    update(){

    }

    draw(){
        super.drawItem();
    }
}

//
// エナジードリンクのクラス
//

class Energy extends Item
{
    constructor(x, y){
        super(x, y);
    }

    update(){

    }

    draw(){
        super.drawItem();
    }
}

//
// 鉛筆のクラス
//

class Pen extends Item
{
    constructor(x, y){
        super(x, y);
    }

    update(){

    }

    draw(){
        super.drawItem();
    }
}

//
// ノートのクラス
//

class Note extends Item
{
    constructor(x, y){
        super(x, y);
    }

    update(){

    }

    draw(){
        super.drawItem();
    }
}

//
// 水のクラス
//

class Water extends Item
{
    constructor(x, y){
        super(x, y);
    }

    update(){

    }

    draw(){
        super.drawItem();
    }
}

//
// 酒のクラス
//

class Drink extends Item
{
    constructor(x, y){
        super(x, y);
    }

    update(){

    }

    draw(){
        super.drawItem();
    }
}

//
// ジュースのクラス
//

class Juice extends Item
{
    constructor(x, y){
        super(x, y);
    }

    update(){

    }

    draw(){
        super.drawItem();
    }
}

//
// 人魚のクラス
//

class Mermaid extends Item
{
    constructor(x, y){
        super(x, y);
    }

    update(){

    }

    draw(){
        super.drawItem();
    }
}