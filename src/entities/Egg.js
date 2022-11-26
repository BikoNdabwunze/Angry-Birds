
import { matter } from "../globals.js";
import BodyType from "../enums/BodyType.js";
import Circle from "./Circle.js";
import { oneInXChance } from "../../lib/RandomNumberHelpers.js";
import GameEntity from "./GameEntity.js";

export default class Egg extends Circle {


    static SPRITE_MEASUREMENTS = [  
        { x: 668, y: 820, width: 45, height: 57 }
    ]

  static  radius = 26;

    constructor(x, y) {
        super(x, y, Egg.radius, {
            label: BodyType.Egg,
            density: 0.008,
            restitution: 0.8,
            collisionFilter: {
                group: -1,
            }
        });

        this.sprites = GameEntity.generateSprites(Egg.SPRITE_MEASUREMENTS);
        this.isWaiting = true;
        this.isJumping = false;
        this.renderOffset = { x: -20, y: - 20};
        this.currentFrame = 0;
    }


    update(dt) {
        super.update(dt)

            //apply force to make it fall straight down
            matter.Body.applyForce(this.body, this.body.position, { x: 0, y: 0.0001 });

    }

   render() {
        super.render();
   }

}