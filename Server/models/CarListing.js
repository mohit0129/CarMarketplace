// const mongoose = require('mongoose');

// const counterSchema = new mongoose.Schema({
//     _id: { type: String, required: false },
//     sequence_value: { type: Number, default: 0 }
// });
// const Counter = mongoose.model('Counter', counterSchema);

// const CarListingSchema = new mongoose.Schema({
//     listing_id: {
//         type: Number,
//         required: false,
//         unique: true,
//     },
//     user_id: {
//         type: Number,
//         required: false
//     },
//     owner: {
//         type: Number,
//         required: false
//     },
//     RentSell: {
//         type: String,
//         enum: ['Rent', 'Sell'],
//         required: false
//     },
//     make: {
//         type: String,
//         required: false
//     },
//     model: {
//         type: String,
//         required: false
//     },
//     year: {
//         type: Number,
//         required: false
//     },
//     mileage: {
//         type: Number,
//         required: false
//     },
//     price: {
//         type: mongoose.Types.Decimal128,
//         required: false
//     },
//     location: {
//         type: String,
//         required: false
//     },
//     condition: {
//         type: String,
//         enum: ['Excellent', 'Good', 'Fair'],
//         required: false
//     },
//     listing_status: {
//         type: String,
//         enum: ['active', 'sold', 'rented'],
//         default: 'active'
//     },
//     date_posted: {
//         type: Date,
//         default: Date.now
//     },
//     date_updated: {
//         type: Date,
//         default: Date.now
//     },
//     filename: {
//         type: String,
//         required: false
//       },
//       url: {
//         type: String,
//         required: false
//       },

//     certified: {
//         type: Boolean,
//         default: false,
//     },
//     priceBreakdown: {
//         taxRate: { type: Number, default: 0.08 },
//         registrationFee: { type: Number, default: 300 },
//     },
//     engine: {
//         type: String,
//         required: false,
//     },
//     transmission: {
//         type: String,
//         required: false,
//     },
//     fuelType: {
//         type: String,
//         required: false,
//     },
//     seatingCapacity: {
//         type: Number,
//         required: false,
//     },
//     interiorColor: {
//         type: String,
//         required: false,
//     },
//     exteriorColor: {
//         type: String,
//         required: false,
//     },
//     carType: {
//         type: String,
//         required: false,
//     },
//     vin: {
//         type: String,
//         required: false,
//     },
//     serviceHistory: {
//         recentServicing: { type: Boolean, default: false },
//         noAccidentHistory: { type: Boolean, default: false },
//         modifications: { type: Boolean, default: false },
//     },
//     extraFeatures: {
//         gps: { type: Boolean, default: false },
//         sunroof: { type: Boolean, default: false },
//         leatherSeats: { type: Boolean, default: false },
//         backupCamera: { type: Boolean, default: false },
//     },
//     certificationReport: {
//         type: String,
//         default: null
//     },
//     description: {
//         type: String,
//         default: null
//     }
// });

// // Pre-save middleware to set the listing_id automatically
// CarListingSchema.pre('save', async function(next) {
//     if (this.isNew) {
//         const counter = await Counter.findByIdAndUpdate(
//             { _id: 'listing_id' },
//             { $inc: { sequence_value: 1 } },
//             { new: true, upsert: true }
//         );
//         this.listing_id = counter.sequence_value;
//     }
//     next();
// });

// const CarListing = mongoose.model('CarListing', CarListingSchema);
// module.exports = CarListing;


const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
    _id: { type: String, required: false },
    sequence_value: { type: Number, default: 0 }
});
const Counter = mongoose.model('Counter', counterSchema);

const CarListingSchema = new mongoose.Schema({
    listing_id: {
        type: Number,
        required: false,
        unique: true,
    },
    listing_status: {
        type: String,
        enum: ['active', 'sold', 'rented','requested'],
        default: 'active'
    },
    user_id: {
        type: String,
        required: false
    },
    owner: {
        type: Number,
        required: false
    },
    RentSell: {
        type: String,
        enum: ['Rent', 'Sell'],
        required: false
    },
    make: {
        type: String,
        required: false
    },
    model: {
        type: String,
        required: false
    },
    year: {
        type: Number,
        required: false
    },
    mileage: {
        type: Number,
        required: false
    },
    price: {
        type: mongoose.Types.Decimal128,
        required: false
    },
    location: {
        type: String,
        required: false
    },
    condition: {
        type: String,
        enum: ['Excellent', 'Good', 'Fair'],
        required: false
    },
    date_posted: {
        type: Date,
        default: Date.now
    },
    date_updated: {
        type: Date,
        default: Date.now
    },
    certified: {
        type: Boolean,
        default: false,
    },
    priceBreakdown: {
        taxRate: { type: Number, default: 0.08 },
        registrationFee: { type: Number, default: 300 },
    },
    engine: {
        type: String,
        required: false,
    },
    transmission: {
        type: String,
        required: false,
    },
    fuelType: {
        type: String,
        required: false,
    },
    seatingCapacity: {
        type: Number,
        required: false,
    },
    interiorColor: {
        type: String,
        required: false,
    },
    exteriorColor: {
        type: String,
        required: false,
    },
    carType: {
        type: String,
        required: false,
    },
    vin: {
        type: String,
        required: false,
    },
    serviceHistory: {
        recentServicing: { type: Boolean, default: false },
        noAccidentHistory: { type: Boolean, default: false },
        modifications: { type: Boolean, default: false },
    },
    extraFeatures: {
        gps: { type: Boolean, default: false },
        sunroof: { type: Boolean, default: false },
        leatherSeats: { type: Boolean, default: false },
        backupCamera: { type: Boolean, default: false },
    },
    certificationReport: {
        type: String,
        default: null
    },
    description: {
        type: String,
        default: null
    },
    images: [
        {
            url: { type: String, required: false },
            filename: { type: String, required: false },
        },
    ],
});

// Pre-save middleware to set the listing_id automatically
CarListingSchema.pre('save', async function (next) {
    if (this.isNew) {
        const counter = await Counter.findByIdAndUpdate(
            { _id: 'listing_id' },
            { $inc: { sequence_value: 1 } },
            { new: true, upsert: true }
        );
        this.listing_id = counter.sequence_value;
    }
    next();
});

const CarListing = mongoose.model('CarListing', CarListingSchema);
module.exports = CarListing;

