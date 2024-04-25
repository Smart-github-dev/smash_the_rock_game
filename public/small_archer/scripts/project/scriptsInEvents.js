// Put any global functions etc. here

let reviveScore = 0;
let jumpScore = 0;
let isRevive = false;
let isJumpStart = false;
let runtime_ = null

let isGameRevive = false;
let reviveGameScore = 0;

function gameStartLevel() {
  const message = { command_type: 'start_level' };
  sendEventToParent(message)
}

function gameStart(runtime) {
  if (isRevive) {
    runtime.globalVars.Score = reviveScore;
  } else if (isJumpStart) {
    runtime.globalVars.Score = jumpScore;
  }else if(isGameRevive){
 	 runtime.globalVars.Score = reviveGameScore;
	 runtime.globalVars.Arrow = 5
  }
}

function onGameStartEvent() {
    const message = {
        command_type: 'game_start'
    }
    sendEventToParent(message)
}

function gameOver(runtime) {
  const message = {
    command_type: "score",
    data: { score: runtime.globalVars.Score },
  };
  sendEventToParent(message);
  runtime_ = runtime
}

function sendEventToParent(message) {
  window.parent.postMessage(message, '*');
}

window.addEventListener('message', function (event) {
  if (event && event.data && event.data.type === 'revive') {
    const score = event.data.value;
   	reviveScore = score;
    isRevive = true;
    isJumpStart = false;
    runtime_.goToLayout(0)
	runtime_.globalVars.Arrow = 5
  } else if (event && event.data && event.data.type === 'jumpStart') {
    jumpScore = event.data.jumpScore;
    isJumpStart = true;
    isRevive = false;
  } else if (event && event.data && event.data.type === 'DO_REVIVE'){
		const score = event.data.value;
		reviveGameScore = score;
		isRevive = false;
		isJumpStart = false;
		isGameRevive = true;
		runtime_.goToLayout(0)
		
  }
});



const scriptsInEvents = {

	async Gameevent_Event2_Act13(runtime, localVars)
	{
		gameStart(runtime)
	},

	async Overevent_Event10_Act1(runtime, localVars)
	{
		gameOver(runtime)
	},

	async Startevent_Event8_Act7(runtime, localVars)
	{
		onGameStartEvent()
	},

	async Startevent_Event9_Act3(runtime, localVars)
	{
		gameStartLevel()
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

