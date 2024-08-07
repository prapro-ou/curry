//
// ショップのパンチクラス
//

const MAX_PEN = 10;
const MAX_NOTE = 10;

class shop_Panchi
{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.nextline = false;
        this.count = 0;
        
        this.itemType = [1,2,3,4,5,6,7,8,9];

        this.next = false;

        this.penCount = 0;
        this.noteCount = 0;
    }

    update(){

        if(keyboard.Right){
            // this.x += 50;
            this.count++;
            keyboard.Right = false;
        }

        // if(this.count == 5) {
        //     this.count++;
        //     this.nextline = true;
        // }

        // if(this.nextline){
        //     this.x = 2;
        //     this.y += 52;
        //     this.nextline = false;
        // }

        switch(this.itemType[this.count]){
            case 1: 
                this.x = 15, this.y = 25;
                if(keyboard.Get){
                    shop_hp.hitPoint += 1;
                    keyboard.Get = false;
                }
            break;
            
            case 2:
                this.x = 65, this.y = 25;
                if(keyboard.Get){
                    shop_hp.hitPoint += 1;
                    keyboard.Get = false;
                }
            break;
            
            case 3:
                this.x = 115, this.y = 25;
                if(keyboard.Get){
                    shop_hp.hitPoint += 1;
                    keyboard.Get = false;
                }
            break;
            
            case 4:
                this.x = 165, this.y = 25;
                if(keyboard.Get){
                    shop_hp.hitPoint += 1;
                    keyboard.Get = false;
                }
            break;
            
            case 5:
                this.x = 215, this.y = 25;
                if(keyboard.Get){
                    shop_hp.hitPoint += 1;
                    keyboard.Get = false;
                }
            break;

            case 6:
                this.x = 15, this.y = 75;
                if(keyboard.Get){
                    if(this.penCount < MAX_PEN) this.penCount++;
                    keyboard.Get = false;
                }
                console.log("penCount = ", this.penCount);
            break;

            case 7:
                this.x = 65, this.y = 75;
            break;

            case 8:
                this.x = 115, this.y = 75;
            break;

            case 9:
                this.x = 165, this.y = 75, this.next = true;
            break;

        }

        if(this.next) {
            this.count = 0;
            this.x = 15;
            this.y = 25;
            this.next = false;
        }
        
    }

    draw(){
        let px = this.x - 12;
        let py = this.y + 6;

        vcon.drawImage(rakutankun_kun_v2, 160, 64, 16, 16, px, py, 12, 12);
    }
}


// //一段目
//     //枕
//     vcon.drawImage(item, 0, 0, 16, 16, 15, 25, 32, 32);
//     //エナジードリンク
//     vcon.drawImage(item, 16, 0, 16, 16, 65, 25, 32, 32);
//     //水
//     vcon.drawImage(item, 0, 16, 32, 32, 115, 25, 32, 32);
//     //酒
//     vcon.drawImage(item, 32, 16, 32, 32, 165, 25, 32, 32);
//     //ジュース
//     vcon.drawImage(item, 64, 16, 32, 32, 215, 25, 32, 32);
////二段目
//     //鉛筆
//     vcon.drawImage(item, 32, 0, 16, 16, 15, 75, 32, 32);
//     //酒
//     vcon.drawImage(item, 32, 16, 32, 32, 65, 75, 32, 32);
//     //ジュース
//     vcon.drawImage(item, 64, 16, 32, 32, 115, 75, 32, 32);