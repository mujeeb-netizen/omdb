OMDB Browser
----
https://www.omdbapi.com/

----
Design a webapp for browsing OMDB. A bare-bones nextjs project is provided. You have the following implementation tasks:

- **Design a search page for movies.** It should show a limited number of movies matching the search keyword. Use the
  pagination API interface to implement pagination. Each movie should be shown in its own component with at least its
  thumbnail and name. You can add any other little details that you would like to show for each movie.
- **Design a movie view page.** It should show a detailed view of a single movie. Include all the relevant information
  including the plot.
- **Recommendations of the day.** A recommendation page containing at least five recommendations which are refreshed
  every day. Similar to the search page, include at least the thumbnail and the name of the movie, leaving the rest up
  to your creativity. :)

The bare-bones page source for the search page and the recommendations page are provided in the project. For the movie
view, you are supposed to create a new page (Hint: use the nextjs router!). For all your other components, make sure to
arrange them in their proper directories (inside `src/components`).

Finally, there are bonuses for every task. Usage of important nextjs/react concepts like server-side rendering,
functional components, etc. will net you bonus points. There is some bonus for using just enough CSS and of course for
good coding practices! The list, however, isn't complete so you can be a little creative. :D

NOTE: You will need to get your free OMDB api key (generate at https://www.omdbapi.com/apikey.aspx). You can include it
in the project in an `.env` file if you want but it is not a necessity.