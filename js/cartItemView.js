/*
    createCartItemView()

    Creates a view for a single cart item. This exists
    so that we can attach the item to the remove button
    so that when it's clicked, we know what item to remove.
*/

function createCartItemView(config) {
	var view = createTemplateView(config);
	// will remove item if it's "X" button has been clicked;
	// this happens after cart item renders
	view.afterRender = function(clonedTemplate, model) {
		clonedTemplate.find('remove-item').click(function(){
			view.cartModel.removeItem(model);
		});
	}; //afterRender(template, model)

	return view;
} //createCartItemView()
