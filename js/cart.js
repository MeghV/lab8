/*
    createCartModel()

    Creates a model for the shopping cart. This uses the ListModel
    as the prototype, but adds a few specific methods.

    The config parameter can contain the following properties:
    - items (array of objects) initial items for the cart (optional)
*/

function createCartModel(config) {
	var model = createListModel(config);

	// returns the total price of the items in cart 
	model.getTotalPrice = function() {
		var idx;
		var totalPrice = 0;
		for (idx = 0; idx < this.items.length; ++idx) {
		    totalPrice += this.items[idx].price;
		}
		return totalPrice.toFixed(2);
	}; //getTotalPrice()

	// creates JSON string of each object in cart
	model.toJSON = function() {
		return JSON.stringify(this.items);
	}; //toJSON()

	return model;
} //createCartModel()