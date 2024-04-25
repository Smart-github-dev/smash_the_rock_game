let _jumpScore = 0
let jumpScoreUsed = false
let _runtime = null

//for Demo
let reviveGameScore = 0
let isGameRevive = false

function sendMessageToParent(messageData) {
    window.parent.postMessage(messageData, "*");
}

function onStart(runtime) {
    _runtime = runtime
    const message = {
        command_type: 'start_level'
    }
    sendMessageToParent(message)
    if (!jumpScoreUsed && _jumpScore > 0) {
        jumpScoreUsed = true
    }
	
	if(isGameRevive){
		_runtime.globalVars.Score = reviveGameScore
	}
}

function onGameStartEvent() {
    const message = {
        command_type: 'game_start'
    }
    sendMessageToParent(message)
}

function onGameOver(runtime) {
     console.log('onGameOver');
    _runtime = runtime
    const Score = runtime.globalVars.Score
    const message = {
        command_type: 'score',
        data: {
            score: Score
        }
    }
    sendMessageToParent(message)
    _jumpScore = Score
}

window.addEventListener("message", function(event) {
    if (event && event.data && event.data.type === 'revive') {
        _runtime.goToLayout(0);
    } else if (event && event.data && event.data.type === 'jumpStart') {
        _jumpScore = event.data.jumpScore;
        setTimeout(() => {
            _runtime.globalVars.Score = _jumpScore;
        }, 1000)
    }else if (event && event.data && event.data.type === 'DO_REVIVE'){
		const score = event.data.value;
		reviveGameScore = score;
		jumpScoreUsed = false;
		isGameRevive = true;
		
		_runtime.goToLayout('Game')
  	}
})


const scriptsInEvents = {

	async Game_Event4_Act10(runtime, localVars)
	{
		onStart(runtime)
	},

	async Score_Event1_Act7(runtime, localVars)
	{
		onGameOver(runtime)
	},

	async Splash_Event4_Act5(runtime, localVars)
	{
		onGameStartEvent()
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

