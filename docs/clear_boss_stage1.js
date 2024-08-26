//
//  でかタコ助教授のクリアクラス
//

//音源取得
const treasure_box_sound = document.getElementById('treasure_box_sound');
treasure_box_sound.volume = 0.1;

const fire_attack_sound = document.getElementById('fire_attack_sound');
fire_attack_sound.volume = 0.1;
var is_fire_attack_sound_played = false;

class Clear {
    constructor(){
        this.fireBall_x = rakutankun.x;
        this.fireBall_y = rakutankun.y - 32;
        this.isHit = false;
        this.hitCount = 0;

        this.istreasure_box = false;
        this.treasure_count = 0;

        this.treasure_x = boss.x + 43;
        this.treasure_y = 0;

        this.tani_count = 0;
        this.stop = 32;

    }

    isFireBallHit(){
        this.isHit = this.fireBall_y <= boss.y + 32;
    }

    update_fireBall(){
        this.fireBall_x = rakutankun.x;
        this.fireBall_y--;
    }

    update(){
        rakutankun.acou++;
        if (rakutankun.x < 1)   rakutankun.x++;
        if (rakutankun.x > 120) rakutankun.x--;

        rakutankun.updateAnim();

        if (boss.x != 96){
            if(boss.isLeft) boss.moveLeft();
            if(boss.isRight) boss.moveRight();
        }

        if ((fire.isStageClear) && ((rakutankun.x >= 119) && (rakutankun.x <= 121)) && (boss.x == 96)){
            this.update_fireBall();
            this.isFireBallHit();

            if(!is_fire_attack_sound_played){
                fire_attack_sound.play();
                is_fire_attack_sound_played = true;
                }    
        }

        fire.update();

        if(this.istreasure_box && (this.treasure_y + 20 != rakutankun.y)) {
            this.treasure_y++;
            boss_stage_bgm.pause();
            treasure_box_sound.play();
        }
    }

    draw_fireBall(){
        vcon.drawImage(png_boss_tako, 160, 64, 16, 32, this.fireBall_x, this.fireBall_y, 16, 32);
    }

    draw_bossHit(){
        vcon.drawImage(png_boss_tako, 32, 64, 32, 32, boss.x, boss.y, 64, 64);
    }

    draw(){
        rakutankun.draw();

        if (!this.isHit){
            boss.draw();

            if (fire.isStageClear){
                if (!(((rakutankun.x >= 119) && (rakutankun.x <= 121)) && (boss.x == 96))){
                    fire.draw();
                } else {
                    this.draw_fireBall();
                }
            }
        } else {
            this.draw_bossHit();

            this.hitCount++;
            if (this.hitCount < 5){
                vcon.drawImage(png_defeat_enemy_animation, 16, 0, 16, 16, boss.x, boss.y, 64, 64);
            } else if (this.hitCount < 7){
                vcon.drawImage(png_defeat_enemy_animation, 16, 16, 16, 16, boss.x - 16, boss.y - 16, 96, 96);
            } else if (this.hitCount < 15){
                vcon.drawImage(png_defeat_enemy_animation, 16, 32, 16, 16, boss.x - 32, boss.y - 32, 128, 128);
            } else if (this.hitCount < 23){
                vcon.drawImage(png_defeat_enemy_animation, 16, 16, 16, 16, boss.x -16, boss.y - 16, 96, 96);
            } else if (this.hitCount < 30){
                vcon.drawImage(png_defeat_enemy_animation, 16, 0, 16, 16, boss.x, boss.y, 64, 64);
            } else if (this.hitCount < 33){
                vcon.drawImage(png_defeat_enemy_animation, 0, 0, 16, 16, boss.x, boss.y, 64, 64);
                this.istreasure_box = true;
            }
        }

        if(this.istreasure_box){
            vcon.drawImage(png_treasure, this.treasure_count * 16, 48, 16, 32, this.treasure_x, this.treasure_y, 32, 64);
            if(this.treasure_y + 20 == rakutankun.y){
                if((frameCount % 4 == 0) && this.treasure_count < 4) this.treasure_count++;
                if(this.treasure_count == 4) vcon.drawImage(png_treasure, 48, 48, 16, 32, this.treasure_x, this.treasure_y, 32, 64);
            }
            if (this.treasure_count == 4){
                if (this.tani_count < this.stop) this.tani_count++;
                vcon.drawImage(png_tani, 0, 0, 16, 16, this.treasure_x, this.treasure_y - this.tani_count, 32, 32);
            }
        }
    }
}