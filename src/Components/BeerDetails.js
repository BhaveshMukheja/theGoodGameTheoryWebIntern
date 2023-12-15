import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

function BeerDetails() {
  const { id } = useParams();
  const [beer, setBeer] = useState(null);
 const [loading, setLoading] = useState(true); //setState for the react loading bar

 //fetching the data and setting up the loading bar
  useEffect(() => {
    setLoading(true);
    fetch(`https://api.punkapi.com/v2/beers/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setBeer(data[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);



  if (!beer) {
    return <LoadingBar color="#f11946" progress={100} height={3} />;
  }


  
  return (
    // returning the front-end

    // Header
    <div className="beer-details container">
       <LoadingBar color="#f11946" progress={loading ? 50 : 100} height={3} />
      <div className="text-center">
        <h1>{beer.name}</h1>
      </div>

        {/* The page is divded into three flex-boxes left, middle, and right */}

        {/* The Left flex-box including the image, Name, Tagline, first-brewed, tip, and contributed by */}

      <div className="d-flex flex-row py-3">
        <div className="d-flex flex-column left">
          <div className="p-2 beer-image">
            <img src={beer.image_url} alt={beer.name} />
          </div>
          <div className="p-2 beer-name">{beer.name}</div>
          <div className="p-2 beer-tagline">{beer.tagline}</div>
          <div className="p-2">
            <span>First Brewed: </span>
            <p>{beer.first_brewed}</p>
          </div>
          <div className="p-2 beer-tip">
            <span>Brewers Tip: </span>
            <p>
              {` "`}
              {beer.brewers_tips}
              {`" `}
            </p>
          </div>
          <div className="p-2 tip-contri">
            <span>Contributed By: </span>
            <p>{beer.contributed_by}</p>
          </div>
        </div>

        {/* The middle flex-box with description, method, ingredients, and food pairing*/}

        <div className="d-flex flex-column middle ">
          <div className="d-flex flex-row">
            <div className="p-2 intro">
              <h3>Description</h3>
              {beer.description}
            </div>
          </div>

          <div className="p-2">
            <h3>Method:</h3>
            <p>
              Mash Temperature:{" "}
              {beer.method.mash_temp.map((temp, index) => (
                <span key={index}>
                  {temp.temp.value} {temp.temp.unit} -{" "}
                  {temp.duration
                    ? `Duration: ${temp.duration} minutes`
                    : "No specific duration"}
                  <br />
                </span>
              ))}
            </p>
            {beer.method.fermentation && (
              <p>
                Fermentation: {beer.method.fermentation.temp.value}{" "}
                {beer.method.fermentation.temp.unit}
              </p>
            )}
            {beer.method.twist && <p>Twist: {beer.method.twist}</p>}
          </div>

          <div className="p-2">
            <h3>Ingredients:</h3>
            <p>
              Malt:{" "}
              {beer.ingredients.malt
                .map(
                  (malt, index) =>
                    `${malt.name} (${malt.amount.value} ${malt.amount.unit})${
                      index !== beer.ingredients.malt.length - 1 ? ", " : ""
                    }`
                )
                .join("")}
            </p>
            <p>
              Hops:{" "}
              {beer.ingredients.hops
                .map(
                  (hop, index) =>
                    `${hop.name} (${hop.amount.value} ${hop.amount.unit})${
                      index !== beer.ingredients.hops.length - 1 ? ", " : ""
                    }`
                )
                .join("")}
            </p>
            <p>Yeast: {beer.ingredients.yeast}</p>
            {/* Other details */}
          </div>
          <div className="p-2">
            <h3>Food Pairing:</h3>
            <p>{beer.food_pairing.join(", ")}</p>
            {/* Other details */}
          </div>
        </div>

        {/* The right Flex-box with a table consisting of rest of the info */}

        <div className="d-flex right">
          <table classname="table">
            <tbody>
              <tr className="table-color">
                <td className="heading">abv:</td>
                <td>{beer.abv}</td>
              </tr>
              <tr>
                <td className="heading">ebu:</td>
                <td>{beer.ebu}</td>
              </tr>
              <tr className="table-color">
                <td className="heading">srm:</td>
                <td>{beer.srm}</td>
              </tr>
              <tr>
                <td className="heading">ph:</td>
                <td>{beer.ph}</td>
              </tr>
              <tr className="table-color">
                <td className="heading">Attenuation level:</td>
                <td>{beer.attenuation_level}</td>
              </tr>
              <tr>
                <td className="heading">Target Fg:</td>
                <td>{beer.target_fg}</td>
              </tr>
              <tr className="table-color">
                <td className="heading">Target Og:</td>
                <td>{beer.target_og}</td>
              </tr>
              <tr>
                <td className="heading">Volume:</td>
                <td>
                  {beer.volume.value} {beer.volume.unit}
                </td>
              </tr>
              <tr className="table-color">
                <td className="heading">Boil Voume:</td>
                <td>
                  {beer.boil_volume.value} {beer.boil_volume.unit}{" "}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BeerDetails;
