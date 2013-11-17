/*
    createCartView()

    Creates a view for the whole shopping cart, using TemplateListView
    as the prototype. It overrides the render() function to update the
    total price, and register click event handlers for the remove item
    buttons.
*/

function createCartView(config) {
    config.cartModel = config.model; // the cart model
    config.templateView = createCartItemView(config); // the cart template
    var view = createTemplateListView(config);

    // renders total price of cart as items are added
    view.afterRender = function() {
    	this.totalPrice.html(this.model.getTotalPrice());
    }; //afterRender()
    return view;
} //createCartView()
