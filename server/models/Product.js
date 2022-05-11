const { Schema, model } = require('mongoose');
//const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true
    },
    quantity: {
      type: Number,
      min: 0,
      default: 0
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    image: {
      type: String,
    },
    description: {
      type: String
    },
    price: {
      type: Number,
      required: true,
      min: 0.99,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ],
  },
  {
    toJSON: {
      getters: true
    }
  }
);


const Product = model('Product', productSchema);

module.exports = Product;
