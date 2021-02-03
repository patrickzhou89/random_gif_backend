const {gql} = require('apollo-server');

const typeDefs = gql`

	type Gif {
		id: ID!
		image_url: String
		width: String
		height: String
		isFavorite: Boolean
	}

	type FavoriteGif{
		id: ID!
		isFavorite: Boolean!
	}

	type Query {
		random: Gif,
		favoriteGifList: [Gif!]!
		favoriteGif(id: ID!): Boolean!
	}

	type Mutation {
		saveFavorite(id: ID!, isFavorite: Boolean!): FavoriteGif!
	}

	type FavoriteUpdateResponse {
		success: Boolean!
		message: String
		gif: Gif
	}
`;

module.exports = typeDefs;
