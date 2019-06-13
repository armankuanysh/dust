import * as PIXI from 'pixi.js';
import Particle from './Particle';


class ParticleText {
  constructor() {
		this.myContainer = document.querySelector('.myContainer');
		this.myContainerWidth = this.myContainer.offsetWidth;
		this.myContainerHeight = this.myContainer.offsetHeight;
    this.app = new PIXI.Application(this.myContainerWidth, this.myContainerHeight, {
    	resolution: window.devicePixelRatio,
			autoResize:true,
			transparent:true
		});
    this.myContainer.appendChild(this.app.view);
    this.particleSize = 2;
    this.rows = 72;
    this.cols = 531;
    this.particles = [];
		// this.mouse();
		
		this.myContainerX = this.myContainerWidth / this.cols * this.particleSize;
		this.myContainerY = this.myContainerHeight / this.rows * this.particleSize;
		console.log(`${this.myContainerY  } and ${  this.myContainerX}`);
		this.container = new PIXI.ParticleContainer(15000);

		this.app.stage.addChild(this.container);
		
		// this.container.x = this.app.screen.width / 2;
		// this.container.y = this.app.screen.height / 2;
		// this.container.pivot.x = this.container.width / 2;
		// this.container.pivot.y = this.container.height / 2;

    this.addObjects();
  }

  addObjects() {

    // load the texture we need
    PIXI.loader.add('bunny', 'img/logo.png').load((loader, resources) => {
		  // this.particleSize

		  const canvas = document.createElement('canvas');
			canvas.classList.add('myCanvas');
			const ctx = canvas.getContext('2d', { alpha: false });
			
		  canvas.width = this.cols*this.particleSize;
			canvas.height = this.rows*this.particleSize;
			ctx.drawImage(resources.bunny.data,0,0);

		  // console.log(resources.bunny.data);

		  function hasFill(x,y, size) {
		  	for (let i = 0; i < size; i+=1) {
		  		for (let j = 0; j < size; j+=1) {
		  			if(ctx.getImageData(x+i, y+i,1,1).data[2]>0) return true;
		  		}
		  	}
		  	return false;
		  }


		  for (let i = 0; i < this.cols; i+=1) {
		  	for (let j = 0; j < this.rows; j+=1) {
		  		// i, i, size
		  		if(hasFill(i*this.particleSize, j*this.particleSize, this.particleSize)) {
		  			const p = new Particle(i*this.particleSize, j*this.particleSize, resources.bunny.texture, this.particleSize, this.myContainerX, this.myContainerY);
		  			this.particles.push(p);
		  			this.container.addChild(p.sprite);
		  		}
		  		
		  		
		  	}
		  }

		  this.animate();
    });

  }

  animate() {
    this.app.ticker.add(() => {
    	this.mouse = this.app.renderer.plugins.interaction.mouse.global;
    	this.particles.forEach(p => {
    		p.update(this.mouse);
    	});
    });
  }
}


const PT = new ParticleText();

