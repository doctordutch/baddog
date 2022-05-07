const { User, Comment, Product, Order } = require('../models');
//this will notify a user of a login issue:
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');


const resolvers = {
    Query: {
      me: async (parent, args, context) => {
          if (context.user) {
          const userData = await User.findOne({ _id: context.user._id })
          .select('__v -password')
          .populate('comments')
       
          return userData;
          }
          throw new AuthenticationError('Not logged in, sorry!');
      },
      comments: async (parent, { username }) => {
          const params = username ? { username } : {};
          return Comment.find(params).sort({ createdAt: -1 });
        },
      comment: async(parent, { _id }) => {
          return Comment.findOne({ _id });
      },
      products: async (parent, { product, productName }) => {
        const params = {}; 
        if (product) {
          params.product = product;
        }
            if (productName) {
            params.productName = {
            $regex: productName
          }; 
        }
        return await Product.find(params).populate('product');
      },
      product: async (parent, { _id }) => {
        return await Product.findById(_id).populate('product');
      },
      order: async ( parent, { _id }, context) => {
        if(context.user) {
          const user = await User.findById(context.user._id).populate({
            path: 'orders.products',
            populate: 'products'
  
          });
          return user.orders.id(_id);
        }
        throw new AuthenticationError('You are not logged in');
  
    },
    checkout: async (parent, args, context) => {
      const order = new Order({products: args.products});

      const line_items = [];
      const {products} = order.populate('produts');

      for (let i = 0; i < products.length; i++) {
        const product = await stripe.products.create({
          name: products[i].productName,
          description: products[i].description
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: 'usd',

        });
        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'https://example.com/cancel'

      });

      return { session: session.id};
      
    },
    
      //get all users
      users: async () => {
          return User.find()
          .select('__v -password')
           .populate('comments');
      },
      //get a certain user
      user: async (parent, args, context) => {
        if (context.user) {
          const user = await User.findById(context.user._id).populate({
            path: 'orders.products',
            populate: 'products',
           

          });
          user.orders.sort((a,b) => b.purchaseDate -a.purchaseDate);
          return user;
        }
        throw new AuthenticationError('You are not logged in!')
        
      }
    },

  
 
    Mutation: {
        addUser:  async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        addOrder: async (parent, {products }, context) => {
          console.log(context);
          if(context.user) {
            const order = new Order({products});

            await User.findByIdAndUpdate(context.user._id, {$push: { orders: order} });

            return order;
          }
          throw new AuthenticationError('You are not logged in')
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Incorrect credentials, try again please.');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials, give it another try!');
            }
            const token = signToken(user);
            return { token, user };
        },
        updateProduct: async (parent, { _id, quantity }) => {
          const decrement = Math.abs(quantity) * -1;
          return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
        },
        addComment: async (parent, args, context) => {
            if (context.user) {
                const comment = await Comment.create({ ...args, username: context.user.username });
                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { comments: comment._id } },
                    { new: true }
                );
                return comment;
            }
            throw new AuthenticationError('You need to login first please!');
        },
        updateUser: async (parent, args, context) => {
          if(context.user) {
            return await User.findByIdAndUpdate(context.user._id, args, {new: true});

          }
          throw new AuthenticationError('You are not logged in!')
        }
    }
       
  
  };
  
  module.exports = resolvers;