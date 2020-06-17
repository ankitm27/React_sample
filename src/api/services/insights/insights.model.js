const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const insightsSchema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	id: { type: String, required: true, unique : true },

	source_name: {
		type: String
	},
	duplicates: {
		type: Array
	},
	topics: {
		type: [
			Number
		]
	},
	custom_topics: {
		type: Array
	},
	source_url: {
		type: String
	},
	previews: {
		type: Array
	},
	pub_date: {
		type: Date
	},
	industries: {
		type: [
			mongoose.Schema.Types.Mixed
		]
	},
	duplicate_count: {
		type: Number
	},
	title: {
		type: String
	},
	locations: {
		type: Array
	},
	companies: {
		type: [
			mongoose.Schema.Types.Mixed
		]
	},
	summary: {
		type: String
	},
	content_types: {
		type: [
			mongoose.Schema.Types.Mixed
		]
	},
	image_url: {
		type: String
	}
});

insightsSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('insights', insightsSchema);
