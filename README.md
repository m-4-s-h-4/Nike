# (Not) Nike Angular Store
Shoes store website that lets customers explore my wide range of NotNike Shoes and add them to cart. The app was created using the Angular framework and offers features like product display, item addition to the cart, total calculation, item removal from the basket, search bar with highlighting, item sorting by category, and pagination.  The app was created using the Angular framework and offers functionality  such as product display, product addition to the cart, total calculation, item removal from the cart, search bar with highlighting, item sorting by category, and pagination.
 
1. Clone the repository to your local machine using 
```git clone <repository-url>```

2. Go to the project's directory using ```cd Nike```

3. Install the dependencies using ```npm i```

4. Start server with ```ng serve -o```

## notNike Shoes Showroom

The program shows a paginated list of products along with information about each one, such as name, cost, and description on hoover.

## Place in Cart

By selecting the "Add to Cart" button located next to each item, customers can add items to their shopping basket.

## Calculate the total

The app calculates the total amount of all items in the cart.

## Remove from Cart

By using the "Remove" button next to each item in the cart, users may remove products out of their shopping cart.

## Searchbar

Users can look for products using the application's built-in search bar. The search bar highlights the matching results as the user types.

Function finds every instance of the search phrase in the title using the replace method and wraps it in a span element with the class "match".

## Order Products by Category

Users can sort the products that are presented by category by clicking on of the category options in the navigation menu at the top. They can return to home page with all products by clicking the logo.

The StoreService class's selectedCategory field, which indicates the currently selected category, is utilized in the category sorting process. The selectedCategory value is updated when the changeCategory method is called and a category is chosen. The StoreService's filteredProducts$ observable filters the items according to the chosen category before delivering the results for displaying. 

## Pagination

Pagination is used to display only 4 items per page. Users can click arrows that are located at the bottom of the page to navigate through the pages. 

Pagination is accomplished by splitting the array of filtered products based on the amount of items per page(4) and the current page number. The currentPage value can be updated using the nextPage and prevPage methods to move between pages.
