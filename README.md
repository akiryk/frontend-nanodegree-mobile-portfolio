# Website Performance Optimization portfolio project

##How to run this project

1. Clone it onto your machine: `git clone https://github.com/akiryk/frontend-nanodegree-mobile-portfolio.git`
2. If you don't already have grunt installed, [get it now](http://gruntjs.com/).
3. cd into the frontend-nanodegree-mobile-portfolio directory
4. Run `npm install` from command line to install grunt modules. 
5. Run `grunt` from command line to start a local server at http://localhost:8000
6. Go to localhost:8000/prod to view portfolio.

**Important** Go to /prod to see the production version of the site; otherwise, you won't see the steps taken to improve performance.

##Steps taken to improve performance

###For portfolio index.html file:
 
* Removed render-blocking CSS by inlining it at top of index.html
* Removed render-blocking print styles by using a media query
* Removed render-blocking JS by inlining critical scripts
* Removed other render-blocking JS by making it async
* Minified and uglified JS and CSS
* Used a script called [loadCSS.js](https://github.com/filamentgroup/loadCSS/) from the Filament Group to load webfonts asynchronously. 
* Used a font loading script called [fontfaceObserver.js](https://github.com/bramstein/fontfaceobserver) that uses promises to add a class to page once fonts are ready to be used. This enables site to be readable even before fonts have downloaded. 
* Optimized image files to reduce overall file sizes. 
* Used grunt plugins to facilitate work, especially grunt-inline and grunt-postCSS

With these steps, I get a Pagespeed Insights score of:
*Mobile* 94/100
*Desktop* 95/100

###For pizza.html project

(Note: make sure you're looking at localhost:8000/prod/views/pizza.html) 

* Optimized updatePositions() function to reduce how much work happens on every iteration of for-loops
* Minimized number of pizzas that must be moved by only rendering the required number to fill screen
* Changed changePizzaSizes() function: instead of adding new styles to every single pizza, I add a class to the container and let css handle the styles. 