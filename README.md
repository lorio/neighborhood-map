# NYC Outdoor Sculpture Map

## Overview
This is my final project of the Grow With Google and Udacity Front End Nanodegree course. It fetches the locations of 30 permanant outdoor sculptures, statues, and monuments in the New York City area that Foursquare users logged to the Foursquare database.

## Instructions
The application is in development mode. Node version 6 or later is required. To run this app, clone or fork this repo, `cd` into its folder, `npm install` to load the dependencies, and then `npm start` to see it in localhost. Webpack enables live reloading if you make any changes. `npm run build` will build, minify, and optimize the app for production. Build will activate the service worker if the https deployment supports that. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) where you can find further instructions and tips for working with CRA. 

To look for sculptures, if a map marker is clicked, the sculpture name appears in its infowindow. Clicking on the scrollable sidebar list will pull up one venue at a time on the map which can zoom in for a more detailed look at its location. Inputting search text for a sculpture will pull up its location on the map. The list shows all venues again as the text input is deleted.

## Dependencies
[Create React App](https://github.com/facebook/create-react-app).
[Google Maps](https://developers.google.com/maps/documentation/javascript/tutorial)
npm [axios](https://www.npmjs.com/package/axios) aided in fetching the data
npm package [escape-string-regexp](https://www.npmjs.com/package/escape-string-regexp) helped the search function

## Contributing
I welcome pull requests 

## Thanks
Udacity coaches and students, especially drunkenkismet, Vasudeva, Doug Brown. Aside from lessons and previous projects and examples of the course,
I got started with this [5-step video](https://www.youtube.com/channel/UCcWSbBe_s-T_gZRnqFbtyIA)
I used this guide in making the [responsive sidebar](https://stackoverflow.com/questions/47032248/how-to-make-clicking-a-menu-button-toggle-show-hide-of-a-menu-sidebar-component)
I used tips on refs and focus from this [tutorial](https://dev.to/sage911/how-to-write-a-search-component-with-suggestions-in-react-d20)

