// regular js function
function getRandomValue(min, max){
    return Math.floor(Math.random() * (max-min))+min;
}

const app = Vue.createApp({
    data(){
        return{
            playerHealt: 100,
            monsterHealt: 100,
            currentRound:0
        }
    },
    computed:{
        monsterBarStyles(){
            return {width: this.monsterHealt+ '%'};
        },
        playerBarStyles(){
            return {width: this.playerHealt+ '%'};
        },
        useSpecialAttack(){
            return this.currentRound % 3 !==0 ;
        }
    },
    methods:{
        //actions
        attackMonster(){
            this.currentRound++;
            this.monsterHealt -= getRandomValue(5,12);
            // attack player, we can access to methods
            this.attackPlayer();
        },
        attackPlayer(){
            this.playerHealt -= getRandomValue(8,15);
        },
        specialAttack(){
            this.currentRound++;
            this.monsterHealt -= getRandomValue(10,25);
            this.attackPlayer();
        }
    }
});

app.mount('#game');