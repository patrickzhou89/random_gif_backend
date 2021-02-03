const { ApolloServer } = require('apollo-server');
const typeDefs = require('./datasources/Schema');
const GifAPI = require('./datasources/GifApi')
require('dotenv').config();

//In Memory Storage
let gifList =[];

const resolvers = {
	Query:{
		random: (_, __, {dataSources}) => {
			//If gifList longer than 10, return random gif
			//Testing favorite functionality, as it is highly unprobable a random gif from GIPHY API will give us the same gif 
			if(gifList.length > 10){
					let random = Math.floor(Math.random()*Math.floor(10));
					return gifList[random];
			}
			return dataSources.gifAPI.getRandom().then(gif=>{
				var exists = gifList.findIndex(x => x.id == gif.id);
				if(exists>-1){
					gifList[exists].isFavorite = exists.isFavorite;
				}else{
					gifList.push(gif);
				}
				
				return gif;
			});
		},
		favoriteGifList: () => gifList,

	},
	Mutation:{
		saveFavorite: (parent, args) => {
			const favoriteGif = {
				id: args.id,
				isFavorite: args.isFavorite
			}
			var exists = gifList.findIndex(gif => gif.id == args.id);
			if(exists>-1){
				gifList[exists].isFavorite = favoriteGif.isFavorite;
			}
			return gifList[exists];
		}
	}
}

const giphyApiKey = process.env.GIPHY_API_KEY;

const server = new ApolloServer({ 
	typeDefs,
	resolvers,
	dataSources:()=>({
		gifAPI: new GifAPI(giphyApiKey)
	}),
	introspection: true
});

server.listen().then(() => {
	console.log('Server is running!');
});