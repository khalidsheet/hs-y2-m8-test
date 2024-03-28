"use client";
import { useState } from "react";
import { Card, Skeleton } from "@nextui-org/react";
import Image from "next/image";

export default function Cocktails() {
  const [cocktails, setCocktails] = useState<any>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    const { props } = await getCocktails(search);
    console.log(props.cocktails);
    setCocktails(props.cocktails.drinks);
  };
  return (
    <main>
      <header className="site-header site-menu-header cocktails">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 col-12 mx-auto">
              <h1 className="text-white">Cocktails</h1>

              <strong className="text-white">
                Perfect for any occasion, these cocktails are sure to impress.
              </strong>
            </div>
          </div>
        </div>

        <div className="overlay"></div>
      </header>
      <section className="container my-4">
        <div className="input-group mb-3 search-form">
          <input
            type="text"
            placeholder="Search for a cocktail"
            className="form-control search-input"
            id="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="btn btn-primary search-button"
            id="search-button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        {/* <Card
          className="w-[200px] space-y-5 p-4 border-0 shadow-none"
          radius="lg"
        >
          <Skeleton className="rounded-lg" isLoaded={false}>
            <div className="h-24 rounded-lg bg-gray-300"></div>
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-gray-200"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-4/5 rounded-lg bg-gray-200"></div>
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
              <div className="h-3 w-2/5 rounded-lg bg-gray-300"></div>
            </Skeleton>
          </div>
        </Card> */}

        <div className="row">
          {cocktails.map((cocktail: any) => (
            <div className="col-lg-4 col-md-6 col-12" key={cocktail.idDrink}>
              <Card className="cocktail-card" radius="lg">
                <Image
                  src={cocktail.strDrinkThumb}
                  alt={cocktail.strDrink}
                  className="card-img-top"
                  width={100}
                  height={100}
                />
                <div className="card-body">
                  <h5 className="card-title">{cocktail.strDrink}</h5>
                  <div>
                    <div className="flex gap-x-2 flex-wrap gap-y-2">
                      {Object.keys(cocktail)
                        .filter(
                          (key) =>
                            key.includes("strIngredient") && cocktail[key]
                        )
                        .map((key) => (
                          <div
                            key={key}
                            className="text-nowrap text-sm bg-gray-100 rounded-full px-2"
                          >
                            {cocktail[key]}
                          </div>
                        ))}
                    </div>
                  </div>
                  <p className="card-text min-h-32">
                    {
                      // show the first 100 characters of the instructions
                      cocktail.strInstructions.substring(0, 100)
                    }
                    ...
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

// get cocktails from the API
async function getCocktails(search: string) {
  const res = await fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + search
  );
  const cocktails = await res.json();
  return {
    props: {
      cocktails,
    },
  };
}
