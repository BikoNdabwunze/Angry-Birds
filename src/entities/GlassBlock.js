import { pickRandomElement } from "../../lib/RandomNumberHelpers.js";
import Sprite from "../../lib/Sprite.js";
import BodyType from "../enums/BodyType.js";
import ImageName from "../enums/ImageName.js";
import Size from "../enums/Size.js";
import SoundName from "../enums/SoundName.js";
import { images, sounds } from "../globals.js";
import Rectangle from "./Rectangle.js";
import Block from "./Block.js";

export default class GlassBlock extends Rectangle{
    static ANGLE_VERTICAL = 0;
    static ANGLE_HORIZONTAL = Math.PI / 2;
    static ANGLE_RIGHT_DIAGONAL = Math.PI / 4;
    static ANGLE_LEFT_DIAGONAL = 3 * Math.PI / 4;
    static SPRITE_MEASUREMENTS = {
        [Size.Small]: { x: 390, y: 0, width: 35, height: 70 },
    [Size.Medium]: { x: 355, y: 105, width: 35, height: 110 },
    [Size.Large]: { x: 390, y: 70, width: 35, height: 220 },
    };

    constructor(x, y, size, angle = GlassBlock.ANGLE_VERTICAL) {
		super(x, y, GlassBlock.SPRITE_MEASUREMENTS[size].width, GlassBlock.SPRITE_MEASUREMENTS[size].height, {
			angle: angle,
			label: BodyType.Block,
			isStatic: false,
			frictionStatic: 1,
			friction: 1,
            density:.001,
		});
      
		this.size = size;
		this.currentFrame = size;
		this.blockSprites = GlassBlock.generateBlockSprites();
		this.sprites = this.blockSprites;
		this.wasSoundPlayed = false;
	}

	update(dt) {
		super.update(dt);
     
		if (this.shouldCleanUp) {
			this.playRandomBreakSound();
		}
	}

	static generateBlockSprites() {
		return [
			new Sprite(
				images.get(ImageName.Glass),
				GlassBlock.SPRITE_MEASUREMENTS[Size.Small].x,
				GlassBlock.SPRITE_MEASUREMENTS[Size.Small].y,
				GlassBlock.SPRITE_MEASUREMENTS[Size.Small].width,
				GlassBlock.SPRITE_MEASUREMENTS[Size.Small].height
			),
			new Sprite(
				images.get(ImageName.Glass),
				GlassBlock.SPRITE_MEASUREMENTS[Size.Medium].x,
				GlassBlock.SPRITE_MEASUREMENTS[Size.Medium].y,
				GlassBlock.SPRITE_MEASUREMENTS[Size.Medium].width,
				GlassBlock.SPRITE_MEASUREMENTS[Size.Medium].height
			),
			new Sprite(
				images.get(ImageName.Glass),
				GlassBlock.SPRITE_MEASUREMENTS[Size.Large].x,
				GlassBlock.SPRITE_MEASUREMENTS[Size.Large].y,
				GlassBlock.SPRITE_MEASUREMENTS[Size.Large].width,
				GlassBlock.SPRITE_MEASUREMENTS[Size.Large].height
			),
		];
	}

	playRandomBreakSound() {
		if (this.wasSoundPlayed) {
			return;
		}

		const sound = pickRandomElement([
			SoundName.Break1,
			SoundName.Break2,
			SoundName.Break3,
			SoundName.Break4,
			SoundName.Break5,
		]);

		sounds.play(sound);

		this.wasSoundPlayed = true;
	}
}