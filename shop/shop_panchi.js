//
// ショップのパンチクラス
//

//アイテム取得上限
const MAX_RECOVERY_ITEM = 1;
const MAX_PEN = 10;
const MAX_SAKE = 10;
const MAX_NOTE = 10;
const MAX_DUMBBELL = 10;

class shop_Panchi
{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.nextline = false;
        this.count = 0;
        
        this.itemType = [0,1,2,3,4,5,6,7,8,9,10,11];

        this.next = false;

        //アイテム取得数 
        this.makuraCount = 0;
        this.energyCount = 0;
        this.waterCount = 0;
        this.drinkCount = 0;
        this.juiceCount = 0;

        this.penCount = 0;
        this.sakeCount = 0;
        this.dumbbellCount = 0;
        this.noteCount = 0;    
    }
    
    //画面遷移のアニメーション
    startSlideAnimation(url){
        const overlay = document.getElementById('overlay');
        overlay.classList.add('active');
        setTimeout(() => {
            window.location.href = url;
        }, 3000);   //次画面への待ち時間3秒
    }

    //ダイアログを表示させる
    showDialog(url, message){
        const modal = document.getElementById('customModal');
        const modalMessage = document.getElementById('modalMessage');
        const modalYes = document.getElementById('modalYes');
        const modalNo = document.getElementById('modalNo');

        modalMessage.textContent = message;
        modal.style.display = 'block';

        modalYes.onclick = () => {
            modal.style.display = 'none';
            this.startSlideAnimation(url);
        }

        modalNo.onclick = () => {
            modal.style.display = 'none';
        
        }

        keyboard.Get = false;
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
            case 0:
                this.x = 15, this.y = 25;
                break;
            case 1: 
                this.x = 15, this.y = 25;
                if(keyboard.Get && tani && shop_hp.hitPoint != 4){
                    if(this.makuraCount < MAX_RECOVERY_ITEM){
                        shop_hp.hitPoint += 1;
                        this.makuraCount++;
                        tani--;
                    }
                    keyboard.Get = false;
                }
            break;
            
            case 2:
                this.x = 65, this.y = 25;
                if(keyboard.Get && tani && shop_hp.hitPoint != 4){
                    if(this.energyCount < MAX_RECOVERY_ITEM){
                        shop_hp.hitPoint += 1;
                        this.energyCount++;
                        tani--;
                    }
                        keyboard.Get = false;
                }
            break;
            
            case 3:
                this.x = 115, this.y = 25;
                if(keyboard.Get && tani && shop_hp.hitPoint != 4){
                    if(this.waterCount < MAX_RECOVERY_ITEM){
                        shop_hp.hitPoint += 1;
                        this.waterCount++;
                        tani--;
                    }
                    keyboard.Get = false;
                }
            break;
            
            case 4:
                this.x = 165, this.y = 25;
                if(keyboard.Get && tani && shop_hp.hitPoint != 4){
                    if(this.drinkCount < MAX_RECOVERY_ITEM){
                        shop_hp.hitPoint += 1;
                        this.drinkCount++;
                        tani--;
                    }
                        keyboard.Get = false;
                }
            break;
            
            case 5:
                this.x = 215, this.y = 25;
                if(keyboard.Get && tani && shop_hp.hitPoint != 4){
                    if(this.juiceCount < MAX_RECOVERY_ITEM){
                        shop_hp.hitPoint += 1;
                        this.juiceCount++;
                        tani--;
                    }
                    keyboard.Get = false;
                }
            break;

            case 6:
                this.x = 15, this.y = 80;
                if(keyboard.Get && tani){
                    if(this.penCount < MAX_PEN){
                        this.penCount++;
                        tani--;
                   }
                keyboard.Get = false;
                }
            break;

            case 7:/*要変更*/
                this.x = 65, this.y = 80;
                // if(keyboard.Get && tani){
                //     if(this.sakeCount < MAX_SAKE){
                //         this.sakeCount++;
                //         tani--;
                //     }
                // }
                // keyboard.Get = false;
            break;

            case 8:/*要変更*/
                this.x = 117, this.y = 80;
                // if(keyboard.Get && tani){
                //     if(this.dumbbellCount < MAX_DUMBBELL){
                //         this.dumbbellCount++;
                //         tani--;
                //     }
                // }
                // keyboard.Get = false;
            break;

            case 9:/*要変更*/
                this.x = 172, this.y = 80;
                // if(keyboard.Get && tani){
                //     if(this.noteCount < MAX_NOTE){
                //         this.noteCount++;
                //         tani--;
                //     }
                // keyboard.Get = false;
                // }
            break;

            case 10:
                this.x = 229, this.y = 90;
                if(keyboard.Get) this.showDialog('normal_stage1.html', 'Let\'s go boss stage!');
                break;

            case 11:
                this.next = true;
                break;

        }

        if(this.next) {
            this.count = 1;
            this.x = 15;
            this.y = 25;
            this.next = false;
        }        
    }

    draw(){
        let px = this.x - 12;
        let py = this.y + 6;

        //吹き出し
        vcon.drawImage(speach, 0, 0, 96, 64, 43, 110, 144, 96);
        
        //吹き出し内のコメント
        switch(this.count){
        case 0: vcon.drawImage(comment, 0, 0, 128, 24, 57, 138, 128, 24);
                break;
        case 1: vcon.drawImage(comment, 0, 24, 128, 16, 60, 140, 128, 16);
                break;
        case 2: vcon.drawImage(comment, 0, 40, 128, 8, 63, 145, 128, 8);
                break;
        case 3: vcon.drawImage(comment, 0, 48, 128, 16, 57, 140, 128, 16);
                break;
        case 4: vcon.drawImage(comment, 0, 64, 128, 16, 56, 140, 128, 16);
                break;
        case 5: vcon.drawImage(comment, 0, 80, 128, 16, 56, 140, 128, 16);
                break;
        case 6: vcon.drawImage(comment, 0, 96, 128, 16, 68, 140, 128, 16);
                break;
        case 7: vcon.drawImage(comment, 0, 160, 128, 8, 100, 145, 128, 8);
                // vcon.drawImage(comment, 0, 112, 128, 16, 52, 140, 128, 16); /*要変更*/
                break;
        case 8: vcon.drawImage(comment, 0, 160, 128, 8, 100, 145, 128, 8);
                // vcon.drawImage(comment, 0, 128, 128, 16, 56, 140, 128, 16); /*要変更*/
                break;
        case 9: vcon.drawImage(comment, 0, 160, 128, 8, 100, 145, 128, 8);
                // vcon.drawImage(comment, 0, 144, 128, 16, 68, 140, 128, 16); /*要変更*/
                break;
        case 10: vcon.drawImage(comment, 0, 168, 128, 8, 62, 145, 128, 8);
                break;
    }

        vcon.font = "10px 'Impact'"; 
        vcon.fillStyle = "White";
        //残数表示
        //一段目
        vcon.fillText(MAX_RECOVERY_ITEM - this.makuraCount + "/" + MAX_RECOVERY_ITEM, 5, 65);
        vcon.fillText(MAX_RECOVERY_ITEM - this.energyCount + "/" + MAX_RECOVERY_ITEM, 55, 65);
        vcon.fillText(MAX_RECOVERY_ITEM - this.waterCount + "/" + MAX_RECOVERY_ITEM, 105, 65);
        vcon.fillText(MAX_RECOVERY_ITEM - this.drinkCount + "/" + MAX_RECOVERY_ITEM, 155, 65);
        vcon.fillText(MAX_RECOVERY_ITEM - this.juiceCount + "/" + MAX_RECOVERY_ITEM, 205, 65);
        //二段目
        vcon.fillText(MAX_PEN - this.penCount + "/" + MAX_PEN, 5, 117);
        vcon.fillText("？/？", 57, 117);
        // vcon.fillText(MAX_SAKE - this.sakeCount + "/" + MAX_SAKE, 57, 117); /*要変更*/
        vcon.fillText("？/？", 110, 117);
        // vcon.fillText(MAX_DUMBBELL - this.dumbbellCount + "/"+ MAX_DUMBBELL, 110, 117); /*要変更*/
        vcon.fillText("？/？", 165, 117);
        // vcon.fillText(MAX_NOTE - this.noteCount + "/" + MAX_NOTE, 165, 117); /*要変更*/
       
        //ボスステージアイテム取得数
        vcon.fillText(this.penCount, 5, 85);
        vcon.fillText(this.sakeCount, 57, 85);
        vcon.fillText(this.dumbbellCount, 110, 85);
        vcon.fillText(this.noteCount, 165, 85);

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