var mongoose = require("mongoose");

var ItemSchema = new mongoose.Schema({
	name: 	  { 
		type: String, 
	 	required: true 
	},
    location: {
    	type: String,
    	required: true
    },
    description: {
        type: String,
        required: true
    },
    tradeFor:{ 	
    	type: String,
    	required: true
    },
   	ownedBy: {	
   		type: String,
   		required: true
    },
   	ownedById: {
   		type: mongoose.Schema.Types.ObjectId,
   		required: true 
   	},
    tradedCount: { 
    	type: Number,
    	required: true
    },
    accepted: {
        type: Boolean,
        default: false
    },
    bidsCurrentlyIn: {
        type: Number,
        default: 0
    },
    created: {
    	type: Date
    },
    updated: { 
    	type: Date, 
    	default: Date.now
    }

});

ItemSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        var returnJson = {
            id: ret._id,
            name: ret.name,
            location: ret.location,
            tradeFor: ret.tradeFor,
            description: ret.description,
            accepted: ret.accepted,
            bidsCurrentlyIn: ret.bidsCurrentlyIn,
            ownedBy: ret.ownedBy,
            ownedId: ret.ownedById,
            created: ret.created,
            updated: ret.updated
           };
        return returnJson;
    }
});


module.exports = mongoose.model('Item', ItemSchema);
