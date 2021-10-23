import React from 'react';
import * as BABYLON from 'babylonjs';
import Scene from '../../components/babylon/babylonscene.component';
import Geocode from 'react-geocode';
import SearchBar from '../../components/search-bar/search-bar.component';
import WeatherCard from '../../components/weather-card/weather-card.component';

class Homepage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			city: '',
			showWeather: false,
			currentWeather: {}
		};
	}

	onSceneMount = (e) => {
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

		engine.runRenderLoop(() => {
			if (scene) {
				scene.render();
			}
		});
	};

	handleChange = (e) => {
		this.setState({ city: e.target.value });
	};

	handleSearch = () => {
		Geocode.setApiKey('AIzaSyATYG7ofAnCN865EGxkPdjrAY5fbxQ7s8I');
		Geocode.fromAddress(this.state.city).then(
			(response) => {
				const { lat, lng } = response.results[0].geometry.location;
				fetch(
					`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/2c09b43e1d6ead95955bd120a252ab52/${lat},${lng}`
				)
					.then((response) => response.json())
					.then((data) => {
						this.setState({ showWeather: true });
						this.setState({
							currentWeather: data.currently
						});
						console.log(data);
					})
					.catch((err) => console.log(err));
			},
			(error) => {
				console.log(error);
			}
		);
	};

	render() {
		const { summary, temperature, humidity, windSpeed, pressure, visibility } = this.state.currentWeather;
		if (!this.state.showWeather) {
			return (
				<div>
					<Scene onSceneMount={this.onSceneMount} id="renderCanvas" />
					<SearchBar handleSearch={this.handleSearch} handleChange={this.handleChange} />
				</div>
			);
		} else {
			return (
				<div>
					{this.state.currentWeather && (
						<WeatherCard
							summary={summary}
							temperature={temperature}
							humidity={humidity}
							windSpeed={windSpeed}
							pressure={pressure}
							visibility={visibility}
						/>
					)}
				</div>
			);
		}
	}
}

export default Homepage;
