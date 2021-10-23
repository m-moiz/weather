import React from 'react';
import './search-bar.styles.scss';

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.handleSearch();
	};

	render() {
		return (
			<div className="searchbar">
				<form onSubmit={this.handleSubmit} className="searchbar-form">
					<div className="searchbar-guide hint"> Find </div>
					<input
						onChange={this.props.handleChange}
						className="searchbar-search"
						name="city"
						type="text"
						placeholder="City"
					/>
					<button type="submit" className="searchbar-guide btn">
						<i className="fas fa-search" />
					</button>
				</form>
			</div>
		);
	}
}

export default SearchBar;
