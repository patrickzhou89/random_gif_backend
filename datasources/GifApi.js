const { RESTDataSource} = require('apollo-datasource-rest');

class GifAPI extends RESTDataSource {

	constructor(apiKey){
		super();
		this.apiKey = apiKey;
		this.baseUrl = 'https://api.giphy.com/v1/gifs/';
	}

	async getRandom(){
		const response = await this.get(`https://api.giphy.com/v1/gifs/random?api_key=${this.apiKey}&tag=&rating=g`);
		return this.gifReducer(response);
	}

	gifReducer(response){
		const data = response.data;
		return {
			id: data.id,
			image_url: data.image_url,
			width: data.image_width,
			height: data.image_height,
			isFavorite: false
		};
	}
}

module.exports = GifAPI;