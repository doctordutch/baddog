const db = require('../config/connection');
const { User, Product, Comment} = require('../models');

db.once('open', async () => {
  //await Comment.deleteMany({});
  await Product.deleteMany();


  // create products
  const products = await Product.insertMany([
    {
      
      productName: 'Charcuterie Board',
      description:
        'Beautiful chartuterie board in hickory wood with horseshoe inlay.  Custom wood species and inlay items available!',
      image: 'char-board-horseshoe.jpg',
      price: 75.00,
      quantity: 5
    },
    {
      productName: 'Bath vanity in cherrywood',
      description:
        'Custom fit to specifications, vanity with drawers, mirrors.',
      image: 'cherrywood-vanity.jpg',
      price: 1500.00,
      quantity: 2
    },
    {
      productName: 'Coffee table',
      description:
        'Live edge table from maple, "Honolulu blue" epoxy fill, variation and customization upon request.',
      image: 'coffee-table-in-blue.jpg',
      price: 450.00,
      quantity: 1
    },
    {
      productName: 'Home office design per hour',
      description:
        'Full home office layout includes custom design printed with onsite measurement.',
      image: 'design-home-office.jpg',
      price: 40.00,
      quantity: 1
    },
    {
      productName: 'Kitchen table design per hour',
      description:
        'Kitchen table design layout includes custom design printed with onsite measurement.',
      image: 'design-kitchen-table.jpg',
      price: 40.00,
      quantity: 1
    },
    {
      productName: 'Vanity design per hour',
      description:
        'Bath vanity layout includes custom design printed with onsite measurement.',
      image: 'design-vanity.jpg',
      price: 40.00,
      quantity: 1
    },
       {
      productName: 'Dining table',
      description:
        'Dining table, 8 feet in length with custom design and welded steel base.  Custom species, length and width available.',
      image: 'dining-table.jpg',
      price: 12000.00,
      quantity: 1
    },
    {
      productName: 'Residential doors',
      description: 'Standard size solid wood doors.  Custom design, species and sizes available.',
      image: 'hickory-vanity 2.jpg',
      price: 250.00,
      quantity: 6
    },
    {
      productName: 'Bath vanity in hickory',
      description:
        'Vanity for residential bath in custom side and species.',
      image: 'hickory-vanity.jpg',
      price: 1200.00,
      quantity: 2,
      commentBody: 'The product arrived in perfect conditions',
      username: 'maria123',
    },
    ]);

  console.log('products seeded');

  await Comment.deleteMany();

  const comments = await Comment.insertMany([
    {
      commentBody: 'The product arrived in perfect conditions',
      username: 'maria123',
      image: 'hickory-vanity 2.jpg'
    },
    {
      commentBody: 'Love the product',
      username: 'ruby78',
      image: 'dining-table.jpg'
    }, 
    {
      commentBody: 'Looks exactly how I ordered it.',
      username: 'lucyh',
      image: 'design-vanity.jpg',
    },
  ]);
  
  console.log('comments seeded')


  await User.deleteMany();
  
    await User.create({
        username: 'kat',
        email: 'kat@test.com',
        password: '123456',
        orders: [
            {
                products: [products[0]._id, products[1]]
            }
        ]
    });

    await User.create({
        username: 'lala',
        email: 'lala@test.com',
        password: '123456'
    });

    console.log('users seeded');

    process.exit();
});

  

  // create comments
  // for (let i = 0; i < 100; i += 1) {
  //   const commentBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

  //   const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
  //   const { username } = createdUsers.ops[randomUserIndex];

  //   // const randomProductIndex = Math.floor(Math.random() * createdProducts.length);
  //   // const { _id: CommentId } = createdComments[randomCommentIndex];

  //   await Product.updateOne(
  //     { _id: productId },
  //     { $push: { comments: { commentBody, username } } },
  //     { runValidators: true }
  //   );
  // }

