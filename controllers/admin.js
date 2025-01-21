const { title } = require('node:process');
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);



  req.user.createProduct({
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description
  })
    .then(() => {
      console.log("Product added successfully");
      res.redirect('/admin/add-product');
    })
    .catch((err) => {
      console.error("Error adding product:", err);
      res.status(500).send("An error occurred while adding the product.");
    });

}
exports.getEditProduct = (req, res, next) => {

  const editMode = req.query.edit

  console.log(editMode)

  if (!editMode) {
    console.log("here")
    return res.redirect("/")
  }


  const prodId = req.params.productId


  Product.findByPk(prodId)

  req.user.getProducts({ where: { id: prodId } })

    .then(products => {

      const product = products[0]

      if (!product) {
        console.log("donw here")
        return res.redirect("/")
      }


      res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });

    }).catch(err => console.log(err))

};

exports.editProduct = (req, res, next) => {


  const prodId = req.body.productId
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;


  Product.findByPk(prodId).then((product) => {
    product.title = updatedTitle
    product.price = updatedPrice
    product.description = updatedDescription;
    product.imageUrl = updatedImageUrl
    product.save();


  }).then((result) => {

    console.log("UPDATED")
    return res.redirect('/products')

  }).catch(err => console.log(err))


  // const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedDescription, updatedPrice)
  // updatedProduct.save()
}

exports.getProducts = (req, res, next) => {

  Product.findAll().then(products => {

    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });

  }).catch(err => {
    console.log(err);
  })
};


exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;


  Product.destroy({ where: { id: prodId } }).then((product) => {
    console.log("Deleted");
    res.redirect('/admin/products');

  }).catch((err) => console.log())




}