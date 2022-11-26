import { keys } from "../globals.js";
import Bird from "./Bird.js";
import { matter } from "../globals.js";
import BodyType from "../enums/BodyType.js";
import Circle from "./Circle.js";
import { oneInXChance } from "../../lib/RandomNumberHelpers.js";
import GameEntity from "./GameEntity.js";

export default class YellowBird extends Circle {

    static SPRITE_MEASUREMENTS = [
        { x: 668, y: 879, width: 58, height: 54 }
    ];
    static radius = 27;
    

    constructor(x, y) {
        super(x, y, YellowBird.radius, {
            label: BodyType.Bird,density: 0.008,
			restitution: 0.4,
			collisionFilter: {
				group: -1,
			}});

        this.sprites = GameEntity.generateSprites(YellowBird.SPRITE_MEASUREMENTS);
        this.isWaiting =true;
		this.isJumping = false;
        this.renderOffset = { x: -27, y: - 27};
        this.hasPropelled = false;
     
    }   


    update(dt) {


        super.update(dt);
        if(keys[' '] && !this.isWaiting && !this.hasPropelled  )
        {
         
            this.Propel();
        }
        
		if (this.isWaiting) {
			this.randomlyJump();
		}

        
    }

    randomlyJump() {
        if (!this.isJumping && oneInXChance(1000)) {
			this.jump();
		}

		if (this.isOnGround()) {
			this.isJumping = false;
		}
    }

    jump() {
		this.isJumping = true;

		// https://brm.io/matter-js/docs/classes/Body.html#method_applyForce
		matter.Body.applyForce(this.body, this.body.position, { x: 0.0, y: -1 });
	}

    Propel()
    {
        matter.Body.applyForce(this.body, this.body.position, { x: .5, y: .2 });
       
    }



}