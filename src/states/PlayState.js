import State from "../../lib/State.js";
import GameStateName from "../enums/GameStateName.js";
import SoundName from "../enums/SoundName.js";
import LevelMaker from "../services/LevelMaker.js";
import {
	engine,
	matter,
	sounds,
	stateMachine,
	world
} from "../globals.js";

const {
	Composite,
	Engine,
} = matter;

export default class PlayState extends State {
	constructor() {
		super();
	}

	enter(parameters = {}) {
		// sounds.play(SoundName.Music);
		this.level = parameters.level ?? LevelMaker.createLevel();
		this.totalBirds=this.level.birdQueue.birds.length+1
	
	}

	exit() {
		// Remove all Matter bodies from the world before exiting this state.
		Composite.allBodies(world).forEach((body) => Composite.remove(world, body));
	}

	update(dt) {
		/**
		 * Update the Matter world one step/frame. By calling it here,
		 * we can be sure that the Matter world will be updated at the
		 * same rate as our canvas animation.
		 *
		 * @see https://brm.io/matter-js/docs/classes/Engine.html#method_update
		 */
		Engine.update(engine);

		this.level.update(dt);

		this.checkWinOrLose();
	}

	render() {
		this.level.render();
	}

	checkWinOrLose() {
		if (this.level.didWin()) {

			stateMachine.change(GameStateName.Victory, {
				background: this.level.background,
				level: this.level.number,
				stars: this.countStars(),
			});
		}
		else if (this.level.didLose()) {
			stateMachine.change(GameStateName.GameOver, {
				background: this.level.background,
			});
		}
	}

	countStars(){


       let stars=0
		if(this.level.birdQueue.birds.length/this.totalBirds>.66)
		{
			stars= 3
			console.log(this.level.birdQueue.birds.length/this.totalBirds)
			console.log(this.level.birdQueue.birds.length)
			console.log(this.totalBirds)
		}
		else if(this.level.birdQueue.birds.length/this.totalBirds>.33)
		{
			stars= 2
			console.log(this.level.birdQueue.birds.length/this.totalBirds)
			console.log(this.level.birdQueue.birds.length)
			console.log(this.totalBirds)
		}
		else{
			stars=1
			console.log(this.level.birdQueue.birds.length/this.totalBirds)
			console.log(this.level.birdQueue.birds.length)
			console.log(this.totalBirds)
		}

       return stars
		
	}
	
}
