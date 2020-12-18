function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
    data(){
        return{
            playerHealth: 100,
            monsterHealth: 100,
            counterAttack: 0,
            winner: null,
            battleLog: []
        }
    },
    watch:{
        playerHealth(value){
            if (value <= 0 && this.monsterHealth <= 0) {
                this.winner = 'draw';
            } else if (value <= 0) {
                this.winner = 'monster';
            }
        },
        monsterHealth(value){
            if (value <= 0 && this.playerHealth <= 0) {
                this.winner = 'draw';
            } else if (value <= 0)  {
                this.winner = 'player';
            }
        }
    },
    computed:{
        monsterBarStyle(){
            if (this.monsterHealth < 0) {
                return {width : '0%'};
            }
            return {width : this.monsterHealth + '%'}
        },
        playerBarStyle(){
            if (this.playerHealth < 0) {
                return {width : '0%'};
            }
            return {width : this.playerHealth + '%'}

        },
    },
    methods:{
        startNewGame(){
            this.playerHealth= 100,
            this.monsterHealth= 100,
            this.counterAttack= 0,
            this.winner= null,
            this.battleLog = []
        },
        attackMonster(){
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
            this.counterAttack++;
            this.battleLog.push('Player Attack Damage: ' + attackValue);
        },
        attackPlayer(){
            const attackValue = getRandomValue(8, 15);
            this.playerHealth -= attackValue;
            this.battleLog.push('Monster Attack Damage: ' + attackValue);
            
        },
        specialAttackMonster(){
            if (this.counterAttack > 2) {
                const attackValue = getRandomValue(10, 25);
                this.monsterHealth -= attackValue;
                this.attackPlayer();
                this.counterAttack = 0;
                this.battleLog.push('Special Attack Damage: ' + attackValue);
            }
        },
        healPlayer(){
            const healValue = getRandomValue(8, 20)
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100
            } else {
                this.playerHealth += healValue;
            }
            this.attackPlayer();
            this.battleLog.unshift('You cure yourself: ' + healValue);
        },
        surrender(){
            this.playerHealth = 0;
        }
    }
});

app.mount('#game');