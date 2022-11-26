import { matter } from "../globals.js";
import BodyType from "../enums/BodyType.js";
import Circle from "./Circle.js";
import { oneInXChance } from "../../lib/RandomNumberHelpers.js";
import GameEntity from "./GameEntity.js";
import Bird from "./Bird.js";
import Egg from "./Egg.js";
import { keys } from "../globals.js";

export default class WhiteBird extends Circle{
 
        static SPRITE_MEASUREMENTS = [
            { x: 410, y: 542, width: 80, height: 93 },
            { x: 410, y: 353, width: 80, height: 93 },
            { x: 410, y: 448, width: 80, height: 93 },
            { x: 493, y: 353, width: 85, height: 93 },
            { x: 667, y: 752, width: 50, height: 65 },
            { x: 668, y: 820, width: 45, height: 57 },
        ];
    
    static radius = 40;


    constructor(x, y) {
        super(x, y,WhiteBird.radius, {
            label: BodyType.Bird,density: 0.008,
			restitution: 0.4,
			collisionFilter: {
				group: -1,
			}});

        this.sprites = GameEntity.generateSprites(WhiteBird.SPRITE_MEASUREMENTS);
        this.isWaiting =true;
		this.isJumping = false;
        this.renderOffset = { x: -40, y: - 46};
        this.hasPropelled = false;
        this.wasLaunched = false;
        this.egg=null;
    
    }   


    update(dt) {

        super.update(dt)

        if(keys[' '] && !this.isWaiting  && !this.hasPropelled )
        {
          
            this.Propel();
        }

        if (this.isWaiting) {
            this.randomlyJump();
        }

        if(this.egg!=null)
        {
            this.egg.update(dt);
           
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
        matter.Body.applyForce(this.body, this.body.position, {
            x: 0,
            y: -0.2,
        });
    }

    Propel() {
        //go through the animation of the bird and then drop the egg
      
        this.currentFrame=4;
        this.radius=28.5;
        this.renderOffset = { x: -28.5, y: - 28.5};
        this.hasPropelled = true;
        this.egg= new Egg(this.body.position.x+this.radius, this.body.position.y-(this.radius*2));
        matter.Body.applyForce(this.body, this.body.position, {x:.25,  y:-4});
        

    }


    render(){
        super.render();
        if(this.egg!=null)
        {
            this.egg.render();
        }
    }

    didGoOffScreen() {

        if (this.egg!=null){
            if(!this.egg.didStop())
            {
              this.shouldCleanUp=false
            }
            else{
                return super.didGoOffScreen();
            }

        }
        else{
            return super.didGoOffScreen();
        }

    
      
    }

}

