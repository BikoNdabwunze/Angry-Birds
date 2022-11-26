import State from "../../lib/State.js";
import GameStateName from "../enums/GameStateName.js";
import LevelMaker from "../services/LevelMaker.js";
import {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	context,
	images,
	keys,
	stateMachine
} from "../globals.js";
import Sprite from "../../lib/Sprite.js";
import ImageName from "../enums/ImageName.js";

export default class VictoryState extends State {
	/**
	 * Displays a game over screen where the player
	 * can press enter to go back to the title screen.
	 */
	constructor() {
		super();
		this.placeholder= new Sprite(images.get(ImageName.Starplaceholder), 0, 0, 558, 210);
    
		
	}
	

	enter(parameters) {
		this.background = parameters.background;
		this.level = parameters.level;
		this.stars = parameters.stars;
		this.starSprites=[]
		for(let i=0;i<this.stars;i++){
			this.starSprites.push(new Sprite(images.get(ImageName.Star), 0, 0, 130, 120))
		}
	}

	update() {
		if (keys.Enter) {
			keys.Enter = false;

			stateMachine.change(GameStateName.Play, {
				background: this.background,
				level: LevelMaker.createLevel(this.level + 1),
			});
		}
	}

	render() {
		this.background.render();

		context.save();
		context.font = '300px AngryBirds';
		context.fillStyle = 'black';
		context.textBaseline = 'middle';
		context.textAlign = 'center';
		context.fillText('Victory!', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 110);
		context.fillStyle = 'limegreen';
		context.fillText('Victory!', CANVAS_WIDTH / 2 + 10, CANVAS_HEIGHT / 2 - 100);
        this.placeholder.render(CANVAS_WIDTH / 2 - 250, CANVAS_HEIGHT / 2 + 10)
        if(this.starSprites.length==1){
			this.starSprites[0].render(CANVAS_WIDTH / 2 - 235, CANVAS_HEIGHT / 2 + 75,{x:1.1,y:1.1})
		}
		 else if(this.starSprites.length==2){
			this.starSprites[0].render(CANVAS_WIDTH / 2 - 235, CANVAS_HEIGHT / 2 + 75,{x:1.1,y:1.1})
			this.starSprites[1].render(CANVAS_WIDTH / 2 -52, CANVAS_HEIGHT / 2 + 30,{x:1.2,y:1.2})
	    } else{
		this.starSprites[0].render(CANVAS_WIDTH / 2 - 235, CANVAS_HEIGHT / 2 + 75,{x:1.1,y:1.1})
		this.starSprites[1].render(CANVAS_WIDTH / 2 -52, CANVAS_HEIGHT / 2 + 30,{x:1.2,y:1.2})
		this.starSprites[2].render(CANVAS_WIDTH / 2 + 152, CANVAS_HEIGHT / 2 + 75,{x:1.1,y:1.1})

		}
		context.font = '100px AngryBirds';
		context.fillStyle = 'white';
		context.fillText('Press Enter to Continue', CANVAS_WIDTH / 2, CANVAS_HEIGHT - 80);
		context.restore();
	}
}
