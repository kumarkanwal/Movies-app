const form = document.querySelector("form");
const formInput = document.querySelector("form input");
const movie_wrapper = document.querySelector(".movie-wrapper");

form.addEventListener('submit', (e) => {

    e.preventDefault();
    const movieName = formInput.value.trim();
    formInput.value = "";

    if (movieName != '') {
        // getting APIs data based on user input
        errorMsg("Fetching movie information....");
        getApiData(movieName);
    } else {
        errorMsg(`Enter movie name to get movie Information. `);
    }
})

// func to get movie details using API
async function getApiData(movieName) {

    try {

        const myAPIKey = "a9e57115";
        const URL = `https://www.omdbapi.com/?apikey=${myAPIKey}&t=${movieName}`;
        let apiData = await fetch(URL);
        let response = await apiData.json();

        if (!apiData.ok) {
            throw new Error("Unable to fetch movie data.");
        }

        showMovieData(response);
    }
    catch (error) {

        errorMsg("No Movie Found!!!")

    }
}



// func to show movie data to the Frontend
function showMovieData(movieDetails) {
    const { Title, imdbRating, Genre, Released, Actors, Poster, Runtime, Plot } = movieDetails;

    movie_wrapper.innerHTML = "";

    let movieCard = document.createElement('div');
    let moviePoster_cont = document.createElement('div');
    let movieDetails_cont = document.createElement('div');

    movieCard.classList.add("movieCard");
    movieDetails_cont.classList.add("movieDetails_cont");
    moviePoster_cont.classList.add("moviePoster_cont");


    // movie poster
    let posterImg = document.createElement('img');
    posterImg.src = Poster;
    moviePoster_cont.appendChild(posterImg);

    // movie title 
    let title = document.createElement('h1');
    title.innerText = Title;
    movieDetails_cont.appendChild(title)

    // movie rating 
    catogaryInShowMovie("Rating:⭐", imdbRating, "rating");

    // movie genre 
    let genre = document.createElement('div');
    genre.classList.add('movieGenre')

    Genre.split(",").forEach(element => {
        let p = document.createElement('p');
        p.innerText = element;
        genre.appendChild(p);
    });
    movieDetails_cont.appendChild(genre)

    // movie Realease Date 
    catogaryInShowMovie("Realease Date: ", Released);

    // duration
    catogaryInShowMovie("Duration: ", Runtime);

    // duration
    catogaryInShowMovie("Cast: ", Actors);

    // duration
    catogaryInShowMovie("plot: ", Plot);

    movieCard.appendChild(moviePoster_cont);
    movieCard.appendChild(movieDetails_cont);
    movie_wrapper.appendChild(movieCard);

    // catogories function
    function catogaryInShowMovie(value, textNode, className) {
        let element = document.createElement('p');
        element.classList.add(className);
        let strong = document.createElement('strong');
        strong.innerText = value;
        element.appendChild(strong);
        element.appendChild(document.createTextNode(textNode));
        movieDetails_cont.appendChild(element)
    }

}


// error message 
function errorMsg(message) {
    movie_wrapper.innerHTML = `<h2>${message}</h2>`;
}