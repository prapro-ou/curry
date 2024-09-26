//
//
//

//BGM
const treasure_box_sound = document.getElementById('treasure_box_sound');
treasure_box_sound.volume = 0.1;
var is_treasure_box_sound_played = false;


class ClearStage2
{
    constructor(){
        this.ox = boss.x + 48;
        this.oy = boss.y + 48;
        this.count = 0;

        //宝箱出現フラグ
        this.isapperBox = false;

        this.treasure_x = boss.x + 20;
        this.treasure_y = boss.y + 32;

        this.isgetTreasure = false;
        this.treasure_count = 0;

        this.localframeCount = 0;
        this.tani_count = 0;
        this.stop = 32;
    }

    isGetTreasure(obj){
        let isX = false;
        let isY = false;

        isX = (this.treasure_x >= obj.x && this.treasure_x <= obj.x + obj.width) || (this.treasure_x + 16 >= obj.x && this.treasure_x + 16 <= obj.x + obj.width);
        isY = (this.treasure_y >= obj.y && this.treasure_y <= obj.y + obj.height) || (this.treasure_y + 16 >= obj.y && this.treasure_y + 16 <= obj.y + obj.height);
    
        return (isX && isY);
    }

    //更新処理
    update(){
        if(this.count < 48){
            this.ox -= 0.5;
            this.oy -= 0.5;
            this.count += 0.5;
        }

        if(this.count == 48) this.isapperBox = true;

        if(this.isGetTreasure(rakutankun)) {
            this.isgetTreasure = true;
            if(!is_treasure_box_sound_played) {
                treasure_box_sound.play();
                is_treasure_box_sound_played = true;
                }
            }

        this.localframeCount++;
    }

    //描画処理
    draw(){
        let isdraw = frameCount % 3;
        if(isdraw > 1){
            vcon.drawImage(png_defeat_enemy_animation, 32, 16, 16, 16, this.ox, this.oy, this.count * 2, this.count * 2);
        }

        if(this.isapperBox) vcon.drawImage(png_treasure, 0, 48, 16, 32, this.treasure_x, this.treasure_y, 32, 64);

        if(this.isgetTreasure){
            vcon.drawImage(png_treasure, this.treasure_count * 16, 48, 16, 32, this.treasure_x, this.treasure_y, 32, 64);
            if((this.localframeCount % 4 == 0) && this.treasure_count < 4) this.treasure_count++;

            if(this.treasure_count == 4) vcon.drawImage(png_treasure, 48, 48, 16, 32, this.treasure_x, this.treasure_y, 32, 64);
            if (this.treasure_count == 4){
                if (this.tani_count < this.stop) this.tani_count++;
                vcon.drawImage(png_tani, 0, 0, 16, 16, this.treasure_x, this.treasure_y - this.tani_count, 32, 32);
            }
        }
    }
}