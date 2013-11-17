/* controller.js
    Controller for Shopping Cart page
*/

$(function(){

	// translates format codes into properly formatted labels
	var formatLabels = {
		dvd: 'DVD',
		bluray: 'Blu-Ray'
	};

	// variable referencing newly created cart model
	var cartModel = createCartModel();

	// variable referencing newly created cart view;
	// cart view includes cart model, and the template in the DOM,
	// items container in the DOM, and total price label in the DOM
	var cartView = createCartView({
		model: cartModel,
		template: $('.cart-item-template'),
		container: $('.cart-items-container'),
		totalPrice: $('.total-price')
	});

	// if cart has already been created and stored to local storage 
	// in a previous session, populates cart items based on that
	var cartJSON = localStorage.getItem('cart');
	if(cartJSON && cartJSON.length > 0) {
		cartModel.setItems(JSON.parse(cartJSON));
	}
	// variable referencing the JSON movies file
	var moviesModel = createMoviesModel({
		url: 'https://courses.washington.edu/info343/ajax/movies/'
	});

	// variable referencing newly created movie view;
	// also sets the template to the movie template in the DOM 
	// and sets container to movie container in the DOM
	var moviesView = createMoviesView({
		model: moviesModel,
		template: $('.movie-template'),
		container: $('.movies-container')
	});

	//refresh to get movies from server
	moviesModel.refresh();

	//when the movies view triggers 'addToCart'
	//add a new item to the cart, using the supplied
	//movieID and format
	moviesView.on('addToCart', function(data) {
		var movie = moviesModel.getItem(data.movieID); 
		if(!movie) 
			throw 'Invalid movie ID "' + movieID + '"!';
		
		// adds the id, title, format, movie format type, and price
		// as JSON to the cart
		cartModel.addItem({
	        id: movie.id,
	        title: movie.title,
	        format: data.format,
	        formatLabel: formatLabels[data.format],
	        price: movie.prices[data.format]
    	});
	}); //addToCart event

	// POSTs user's cart order as JSON, removing the cart items after successful post
	$('.place-order').click(function(){
		$.ajax({
			url: 'https://courses.washington.edu/info343/ajax/movies/orders/',
			type: 'POST',
			data: cartModel.toJSON(),
			contentType: 'application/json',
			success: function(responseData) {
				//code to run after successful post
				alert(responseData.message);
				cartModel.setItems([]);
			},
			error: function(jqXHR, status, errorThrown) {
				//error with post--alert user
				alert(errorThrown || status);
			}
		}); //ajax()
	});

	// if the cart changes, adds new item into key 'cart' into local storage
	cartModel.on('change', function() {
		localStorage.setItem('cart', cartModel.toJSON());
	});
}); //doc ready()

