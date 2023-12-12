import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function BeerList() {

  // Using useState to change and appoint the state of Beers and Beer Seacrh. 
  // It will help in the front and optimizing the seacrh

  const [beers, setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  // Fetching the api data as Json

  useEffect(() => {
    fetch("https://api.punkapi.com/v2/beers")
      .then((response) => response.json())
      .then((data) => setBeers(data))
      .catch((error) => console.error(error));
  }, []);

  //filtering the seacrhed beer

  const filteredBeers = beers.filter((beer) =>
    beer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //function to handle the search input

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    // returning the front-end
    <>
      <div className="container beer-list">
        <div className=" header">
          <div className="text-center">
            <h1>Beer Catalog</h1>
          </div>

          <div className="input-group mb-3 search mt-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search Beers"
              value={searchTerm}
              onChange={handleSearch}
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>

        <div className="beer-container my-5">
          {filteredBeers.map((beer) => (
            <div key={beer.id} className="beer-card">
              <img src={beer.image_url} alt={beer.name} />
              <h2>{beer.name}</h2>
              <p>{beer.tagline}</p>
              <Link to={`/beer/${beer.id}`}>
                <button type="button" className="btn">
                  Read More
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default BeerList;
