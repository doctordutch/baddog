   <div className="card-body">
              <Link to={`/product/${product._id}`}>
              <p>{product.img}</p>
              <p>{product.description}</p>
              <p className="mb-0">
                Comments: {product.commentCount} || Click to{' '}
                {product.commentCount ? 'see' : 'start'} share your thoughts!
              </p>
              </Link>
            </div>

            <div>
                    {Products().map((product) => (
                    <SingleProduct
                    key={product._id}
                    _id={product._id}
                    image={product.image}
                    productName={product.productName}
                    price={product.price}
                    quantity={product.quantity}
                    description={product.description}
                    createdAt={product.createdAt}
                    />
            ))}
        </div>


        </p><Link to={`/profile/${product}`}
          style={{ fontWeight: 700 }}
              className="text-light">
        </Link>{' '}

        <img src={require('../../images/${product.image}.jpg')} alt="product image"/>