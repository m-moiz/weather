import React, { Component } from 'react';
import Scene from '../babylon/babylonscene.component';
import * as BABYLON from 'babylonjs';
import './weather-card.styles.css';

class WeatherCard extends Component {
	constructor(props) {
		super(props);
	}

	fahrenheitToCelsius(temp) {
		return ((parseInt(temp) - 32) * 5 / 9).toFixed(1);
	}

	renderSnow = (e) => {
		const { canvas, scene, engine } = e;

		// Add a camera to the scene and attach it to the canvas
		const camera = new BABYLON.ArcRotateCamera(
			'Camera',
			Math.PI / 2,
			Math.PI / 2,
			2,
			new BABYLON.Vector3(0, 0, 5),
			scene
		);
		camera.applyGravity = true;

		const particleSystem = new BABYLON.ParticleSystem('pSystem', 800, scene);
		particleSystem.particleTexture = new BABYLON.Texture(
			'https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
			scene
		);
		particleSystem.textureMask = new BABYLON.Color4(0.1, 0.9, 0.8, 1.0);
		particleSystem.emitter = new BABYLON.Vector3(1, 1, 0);
		particleSystem.minEmitBox = new BABYLON.Vector3(-6, 3, 1);
		particleSystem.maxEmitBox = new BABYLON.Vector3(6, 3, 1);
		particleSystem.start();

		particleSystem.direction2 = new BABYLON.Vector3(0, -50, 0);
		particleSystem.direction2 = new BABYLON.Vector3(-50, 0, 0);
		particleSystem.direction2 = new BABYLON.Vector3(-20, 0, 0);
		particleSystem.direction2 = new BABYLON.Vector3(-3, 0, 0);
		particleSystem.direction2 = new BABYLON.Vector3(-42, 0, 0);
		particleSystem.direction2 = new BABYLON.Vector3(23, 0, 0);
		particleSystem.direction2 = new BABYLON.Vector3(9, 0, 0);
		particleSystem.direction2 = new BABYLON.Vector3(-61, 0, 0);
		particleSystem.maxLifeTime = 1.8;
		particleSystem.minLifeTime = 0.04;
		particleSystem.minScaleY = 0.03;
		particleSystem.maxScaleY = 0.07;
		particleSystem.minScaleX = 0.08;
		particleSystem.maxScaleX = 0.12;
		particleSystem.minAngularSpeed = 0;
		particleSystem.maxAngularSpeed = Math.PI;

		var noiseTexture = new BABYLON.NoiseProceduralTexture('perlin', 256, scene);
		noiseTexture.animationSpeedFactor = 7;
		noiseTexture.persistence = 1;
		noiseTexture.brightness = 0.1;
		noiseTexture.octaves = 7;

		particleSystem.noiseTexture = noiseTexture;
		particleSystem.noiseStrength = new BABYLON.Vector3(0, 25, 0);

		particleSystem.minEmitPower = 0.03;
		particleSystem.maxEmitPower = 0.09;
		particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

		particleSystem.minSize = 0.1;
		particleSystem.maxSize = 0.3;
		particleSystem.emitRate = 2000;
		particleSystem.addDragGradient(0, 0.5);
		particleSystem.addSizeGradient(0, 0.5, 0.6);

		engine.runRenderLoop(() => {
			if (scene) {
				scene.render();
			}
		});
	};

	renderRain = (e) => {
		const { canvas, scene, engine } = e;

		const camera = new BABYLON.ArcRotateCamera(
			'Camera',
			Math.PI / 2,
			Math.PI / 2,
			2,
			new BABYLON.Vector3(0, 0, 5),
			scene
		);
		camera.applyGravity = true;

		const particleSystem = new BABYLON.ParticleSystem('pSystem', 800, scene);
		particleSystem.particleTexture = new BABYLON.Texture(
			'https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
			scene
		);
		particleSystem.textureMask = new BABYLON.Color4(1.0, 1.0, 1.0, 0.5);
		particleSystem.emitter = new BABYLON.Vector3(1, 1, 0);
		particleSystem.minEmitBox = new BABYLON.Vector3(-6, 3, 1);
		particleSystem.maxEmitBox = new BABYLON.Vector3(6, 3, 1);
		particleSystem.start();

		particleSystem.direction2 = new BABYLON.Vector3(0, -50, 0);
		particleSystem.maxLifeTime = 1.6;
		particleSystem.minLifeTime = 0.1;
		particleSystem.minScaleY = 0.2;
		particleSystem.maxScaleY = 0.2;

		particleSystem.minEmitPower = 0.7;
		particleSystem.maxEmitPower = 0.7;

		particleSystem.minScaleX = 0.02;
		particleSystem.maxScaleX = 0.02;
		particleSystem.minSize = 0.1;
		particleSystem.maxSize = 0.3;
		particleSystem.emitRate = 2000;
		particleSystem.addDragGradient(0, 0.5);
		particleSystem.addSizeGradient(0, 0.3);

		engine.runRenderLoop(() => {
			if (scene) {
				scene.render();
			}
		});
	};

	render() {
		const { summary, temperature, humidity, windSpeed, pressure, visibility } = this.props;
		return (
			<div>
				<Scene onSceneMount={this.renderRain} id="renderCanvas" />
				<div className="weather-card">
					<div className="card">
						<div className="current-weather">
							<h1> {summary} </h1>
						</div>

						<div className="container">
							<p className="element"> Temperature: {this.fahrenheitToCelsius(temperature)} </p>
							<p className="element"> Outlook: {summary} </p>
							<p className="element"> Humidity: {humidity}</p>
							<p className="element"> Pressure: {pressure} </p>
							<p className="element"> Wind Speed: {windSpeed} </p>
							<p className="element"> Visibility: {visibility} </p>
						</div>
					</div>
					<button className="next-button one">28</button>
					<button className="next-button two">29</button>
					<button className="next-button three">30</button>
					<button className="next-button four">31</button>
					<button className="next-button five">1</button>
				</div>
			</div>
		);
	}
}

export default WeatherCard;
