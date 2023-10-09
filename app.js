// regular js function
function getRandomValue(min, max){
    return Math.floor(Math.random() * (max-min))+min;
}

const app = Vue.createApp({
    data(){
        return{
            playerHealt: 100,
            monsterHealt: 100,
        }
    },
    computed:{
        monsterBarStyles(){
            return {width: this.monsterHealt+ '%'};
        },
        playerBarStyles(){
            return {width: this.playerHealt+ '%'};
        }
    },
    methods:{
        //actions
        attackMonster(){
            this.monsterHealt -= getRandomValue(5,12);
            // attack player, we can access to methods
            this.attackPlayer();
        },
        attackPlayer(){
            this.playerHealt -= getRandomValue(8,15);
        }
    }
});

app.mount('#game');