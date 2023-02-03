import React from 'react'
import { useState, useEffect } from 'react'
import './SearchResults.css'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import {
  selectToken,
  selectFavorites,
  setFavoritesList,
} from '../features/flowrSlice'

interface SearchProps {
  allFlowers: {
    favorite: boolean
    id: number
    latin_name: string
    name: string
    profile_picture: string
    sightings: number
  }[]
  search: string
  favoritesClicked: boolean
}

const SearchResults: React.FC<SearchProps> = (props) => {
  const [renderComponent, setRenderComponent] = useState<boolean>(false)
  const [favoriteId, setFavoriteId] = useState<any>([])
  const [removeId, setRemoveId] = useState<any>([])
  const token = useAppSelector(selectToken)
  const favoritesList = useAppSelector(selectFavorites)
  const dispatch = useAppDispatch()

  const arrayFav: number[] = []
  const arrayRemoveId: number[] = []
  useEffect(() => {
    fetch('https://flowrspot-api.herokuapp.com/api/v1/flowers/favorites', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        dispatch(setFavoritesList(data.fav_flowers))
        favoritesList!.forEach((fav: any) => {
          arrayRemoveId.push(fav.id)
          console.log(arrayFav)
          arrayFav.push(fav.flower.id)
          setFavoriteId(arrayFav)
          setRemoveId(arrayRemoveId)
        })
      })
  }, [token, renderComponent])

  function handleFavorites(flw_id: number) {
    if (favoriteId.includes(flw_id)) {
      const index = favoriteId.indexOf(flw_id)
      fetch(
        `https://flowrspot-api.herokuapp.com/api/v1/flowers/${flw_id}/favorites/${removeId[index]}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        },
      )
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setRenderComponent(!renderComponent)
          } else {
            alert(data.error)
          }
        })
    } else {
      fetch(
        `https://flowrspot-api.herokuapp.com/api/v1/flowers/${flw_id}/favorites`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        },
      )
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setRenderComponent(!renderComponent)
          } else {
            alert(data.error)
          }
        })
    }
  }

  function renderContentWithSearch() {
    return props.allFlowers
      .filter((flw: any) => flw.name.toLowerCase().includes(props.search))
      .map((flw: any) => {
        return (
          <div key={flw.id} className="flower-box">
            <img src={flw.profile_picture} alt="" className="flower-img" />
            {token &&
              favoritesList?.map((fav: any) => {
                if (fav.flower.id === flw.id) {
                  return (
                    <img
                      key={fav.id}
                      onClick={() => handleFavorites(flw.id)}
                      className="star-logo"
                      src="https://freesvg.org/img/star2.png"
                    />
                  )
                }
              })}
            {token && (
              <img
                onClick={() => handleFavorites(flw.id)}
                className="star-logo"
                src={
                  favoriteId.includes(flw.id)
                    ? 'https://freesvg.org/img/star2.png'
                    : 'https://freesvg.org/img/star1.png'
                }
              />
            )}
            <h1 className="flower-name">
              {flw.name.length > 10 ? flw.name.split(' ')[0] : flw.name}
            </h1>
            <h2 className="flower-name-latin">{flw.latin_name.slice(0, 15)}</h2>
            <h2
              className={
                token && favoriteId.includes(flw.id)
                  ? 'flower-sightings-favorite'
                  : 'flower-sightings'
              }
            >
              {flw.sightings !== 1
                ? `${flw.sightings} sightings`
                : `${flw.sightings} sighting`}
            </h2>
          </div>
        )
      })
  }

  function renderContentWithoutSearch() {
    return (
      props.allFlowers &&
      props.allFlowers.map((flw: any) => {
        return (
          <div key={flw.id} className="flower-box">
            <img src={flw.profile_picture} alt="" className="flower-img" />
            {token && (
              <img
                onClick={() => handleFavorites(flw.id)}
                className="star-logo"
                src={
                  favoriteId.includes(flw.id)
                    ? 'https://freesvg.org/img/star2.png'
                    : 'https://freesvg.org/img/star1.png'
                }
              />
            )}
            <h1 className="flower-name">
              {flw.name.length > 10 ? flw.name.split(' ')[0] : flw.name}
            </h1>
            <h2 className="flower-name-latin">{flw.latin_name.slice(0, 15)}</h2>
            <h2
              className={
                token && favoriteId.includes(flw.id)
                  ? 'flower-sightings-favorite'
                  : 'flower-sightings'
              }
            >
              {flw.sightings !== 1
                ? `${flw.sightings} sightings`
                : `${flw.sightings} sighting`}
            </h2>
          </div>
        )
      })
    )
  }

  function renderContentFavorites() {
    return props.search
      ? props.allFlowers
          .filter(
            (flw: any) =>
              flw.name.toLowerCase().includes(props.search) &&
              favoriteId.includes(flw.id),
          )
          .map((flw: any) => {
            return (
              <div key={flw.id} className="flower-box">
                <img src={flw.profile_picture} alt="" className="flower-img" />
                {token &&
                  favoritesList?.map((fav: any) => {
                    if (fav.flower.id === flw.id) {
                      return (
                        <img
                          key={fav.id}
                          onClick={() => handleFavorites(flw.id)}
                          className="star-logo"
                          src="https://freesvg.org/img/star2.png"
                        />
                      )
                    }
                  })}
                {token && (
                  <img
                    onClick={() => handleFavorites(flw.id)}
                    className="star-logo"
                    src={
                      favoriteId.includes(flw.id)
                        ? 'https://freesvg.org/img/star2.png'
                        : 'https://freesvg.org/img/star1.png'
                    }
                  />
                )}
                <h1 className="flower-name">
                  {flw.name.length > 10 ? flw.name.split(' ')[0] : flw.name}
                </h1>
                <h2 className="flower-name-latin">
                  {flw.latin_name.slice(0, 15)}
                </h2>
                <h2
                  className={
                    token && favoriteId.includes(flw.id)
                      ? 'flower-sightings-favorite'
                      : 'flower-sightings'
                  }
                >
                  {flw.sightings !== 1
                    ? `${flw.sightings} sightings`
                    : `${flw.sightings} sighting`}
                </h2>
              </div>
            )
          })
      : props.allFlowers &&
          props.allFlowers
            .filter((flw: any) => favoriteId.includes(flw.id))
            .map((flw: any) => {
              return (
                <div key={flw.id} className="flower-box">
                  <img
                    src={flw.profile_picture}
                    alt=""
                    className="flower-img"
                  />
                  {token && (
                    <img
                      onClick={() => handleFavorites(flw.id)}
                      className="star-logo"
                      src={
                        favoriteId.includes(flw.id)
                          ? 'https://freesvg.org/img/star2.png'
                          : 'https://freesvg.org/img/star1.png'
                      }
                    />
                  )}
                  <h1 className="flower-name">
                    {flw.name.length > 10 ? flw.name.split(' ')[0] : flw.name}
                  </h1>
                  <h2 className="flower-name-latin">
                    {flw.latin_name.slice(0, 15)}
                  </h2>
                  <h2
                    className={
                      token && favoriteId.includes(flw.id)
                        ? 'flower-sightings-favorite'
                        : 'flower-sightings'
                    }
                  >
                    {flw.sightings !== 1
                      ? `${flw.sightings} sightings`
                      : `${flw.sightings} sighting`}
                  </h2>
                </div>
              )
            })
  }

  return (
    <div id="search-results-wrapper">
      {props.favoritesClicked
        ? renderContentFavorites()
        : props.search
        ? props.allFlowers && renderContentWithSearch()
        : renderContentWithoutSearch()}
    </div>
  )
}

export default SearchResults
