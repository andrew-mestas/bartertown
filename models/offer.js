var mongoose = require("mongoose");

var OfferSchema = new mongoose.Schema({
   	ownedById: {
   		type: mongoose.Schema.Types.ObjectId,
   		required: true
   	},
    offerTo: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    itemWantedId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    itemOfferedId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }, 
    accepted: {
        type: Boolean,
        default: false
    }
});

OfferSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        var returnJson = {
            ownedId: ret.ownedById,
            offerTo: ret.offerTo,
            itemWantedId: ret.itemWantedId,
            itemOfferedId: ret.itemOfferedId
           };
        return returnJson;
    }
});


module.exports = mongoose.model('Offer', OfferSchema);
