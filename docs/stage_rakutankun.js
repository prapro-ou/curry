//
//  落単君のクラス
//

//アニメーションの定義
const ANIMATION_RUN1 = 1;
const ANIMATION_RUN2 = 2;
const ANIMATION_RUN3 = 3;

class Stage_Rakutankun
{
    constructor(){
        switch(stage){
            case '0':
                this.x = 10;
                this.y = 30;
                break;
            case '1':
                this.x = 77;
                this.y = 24;
                break;
            case '2':
                this.x = 154;
                this.y = 45;
                break;
            case '3':
                this.x = 46;
                this.y = 92;
                break;
            case '4':
                this.x = 147;
                this.y = 129;
                break;
        }
        

        this.animation = 0;
        this.sp_num = 0;
    }

    //スプライトを変える処理
    updateAnimation(){
        //スプライトの決定
        switch (this.animation){
            case ANIMATION_RUN1:
                this.sp_num = 1;
                break;
            case ANIMATION_RUN2:
                this.sp_num = 2;
                break;
            case ANIMATION_RUN3:
                this.sp_num = 3;
                break;
        }
    }

    //歩く・走る処理
    updateRun(){
        if(keyboard.Left){
            this.x -= 1;
        }
        if(keyboard.Right){
            this.x += 1;
        }
        if(keyboard.Up){
            this.y += 1;
        }
        if(keyboard.Down){
            this.y -= 1;
        }
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

        keyboard.Go = false;
    }

    //渦の前かどうかをチェック
    checkNextStage(){
        if((this.x + 4) > 80-10 && (this.x + 4) < 90+10){
            if((this.y + 32) > 50-10 && (this.y + 32) < 60+10){
                if(keyboard.Go){
                    // if(confirm('Let\'s go stage1')){
                    //     window.location.href = 'normal_stage1.html'; 
                    // }
                    this.showDialog('normal_stage1.html', 'Let\'s go stage1');
                    localStorage.setItem('stage', '1');
                }
                keyboard.Go = false;
            }
        }

        if((this.x + 4) > 156-10 && (this.x + 4) < 166+10){
            if((this.y + 32) > 72-10 && (this.y + 32) < 82+10){
                if(keyboard.Go){
                    // if(confirm('Let\'s go stage2')){
                    //     window.location.href = 'normal_stage1.html'; 
                    // }
                    this.showDialog('normal_stage2.html', 'Let\'s go stage2');
                    localStorage.setItem('stage', '2');
                }
                keyboard.Go = false;
            }
        }

        if((this.x + 12) > 51-10 && (this.x + 12) < 61+10){
            if((this.y + 32) > 120-10 && (this.y + 32) < 130+10){
                if(keyboard.Go){
                    // if(confirm('Let\'s go stage3')){
                    //     window.location.href = 'normal_stage1.html'; 
                    // }
                    this.showDialog('normal_stage3.html', 'Let\'s go stage3');
                    localStorage.setItem('stage', '3');
                }
                keyboard.Go = false;
            }
        }

        if((this.x + 12) > 156-10 && (this.x + 12) < 166+10){
            if((this.y + 32) > 155-10 && (this.y + 32) < 165+10){
                if(keyboard.Go){
                    // if(confirm('Let\'s go stage4')){
                    //     window.location.href = 'normal_stage1.html'; 
                    // }
                    this.showDialog('normal_stage4.html', 'Let\'s go stage4');
                    localStorage.setItem('stage', '4');
                }
                keyboard.Go = false;
            }
        }


    }

    //壁かどうかを判定
    checkWall(){

    }

    //毎フレームごとの更新処理
    update()
    {    

        // //debug
        // console.log("Update called for Rakutankun");

        if((frameCount%60) <= 20) this.animation = ANIMATION_RUN1;
        else if((frameCount%60) > 20 && (frameCount%60) <= 40) this.animation = ANIMATION_RUN2;
        else this.animation = ANIMATION_RUN3;

        this.updateAnimation();
        this.updateRun();
        this.checkNextStage();

        this.checkWall();

    }

    //毎フレームごとの描画処理
    draw()
    {
        // let px = (this.x >> 4) - Stage_Select_Field.scx;
        // let py = (this.y >> 4) - Stage_Select_Field.scy;

        // //debug
        // console.log("Draw called for Rakutankun");

        let px = this.x;
        let py = this.y;
        let sx = (this.sp_num - 1) << 4;
        let sy = 0;

        //実画面に表示するときのサイズ
        let w  = 16;
        let h  = 32;

        // //debug
        // console.log(`Drawing Rakutankun at (${px}, ${py}) with sprite (${sx}, ${sy}, ${w}, ${h})`);

        vcon.drawImage(rakutankun_kun, sx, sy, w, h, px, py, w, h);
    }


}