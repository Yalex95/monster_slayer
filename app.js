// regular js function
function getRandomValue(min, max){
    return Math.floor(Math.random() * (max-min))+min;
}

const app = Vue.createApp({
    data(){
        return{
            playerHealt: 100,
            monsterHealt: 100,
            currentRound:0,
            winner:null,
            logMessage:[]
        }
    },
    watch:{
        playerHealt(value){
            if(value <= 0 && this.monsterHealt <= 0){
                //draw
                this.winner='draw'
            }else if(value <= 0){
                //player lost
                this.winner='monster'
            }
        },
        monsterHealt(value){
            if(value <= 0 && this.playerHealt <= 0){

                this.winner='draw'
            }else if(value <= 0){
                //player win
                this.winner='player'
            }
        }
    },
    computed:{
        monsterBarStyles(){
            if(this.monsterHealt < 0){
                return {width: this.monsterHealt +'%'}
            }
            return {width: this.monsterHealt+ '%'};
        },
        playerBarStyles(){
            if(this.playerHealt < 0){
                return {width: this.playerHealt +'%'}
            }
            return {width: this.playerHealt+ '%'};
        },
        useSpecialAttack(){
            return this.currentRound % 3 !==0 ;
        }
    },
    methods:{
        //actions
        startGame(){
            //restart values
            this.playerHealt= 100;
            this.monsterHealt= 100;
            this.currentRound=0;
            this.winner=null;
            this.logMessage=[];

        },
        attackMonster(){
            this.currentRound++;
            const attackValue = getRandomValue(5,12);
            this.monsterHealt -= attackValue;
            this.addLogMessage('Player','attacked',attackValue);
            // attack player, we can access to methods
            this.attackPlayer();
        },
        attackPlayer(){
            const attackValue = getRandomValue(8,15);
            this.playerHealt -= attackValue;
            this.addLogMessage('Monster','attacked',attackValue);
        },
        specialAttack(){
            this.currentRound++;
            const attackValue=getRandomValue(10,25);
            this.monsterHealt -= attackValue;
            this.addLogMessage('Player','attacked',attackValue);
            this.attackPlayer();
        },
        healPlayer(){
            this.currentRound++;
            const healValue = getRandomValue(8,20);
            if(this.playerHealt + healValue >100){
                this.playerHealt=100;
            }else{
                this.playerHealt+=healValue;
            }
            this.addLogMessage('Player','heal',healValue);
            this.attackPlayer();
        },
        surrender(){
            this.winner='monster';
            this.addLogMessage('Player','surender','');
        },
        addLogMessage(who, what, value){
            this.logMessage.unshift({
                actionBy: who,
                actionType:what,
                actionValue:value
            })
        }
    }
});

app.mount('#game');