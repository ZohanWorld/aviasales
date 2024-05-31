/* eslint-disable react/destructuring-assignment */
import { add, format } from 'date-fns'
import './offer-card.scss'

function OfferCard({ info }) {
  const directions = info.segments

  function formatMinutes(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    return `${hours}ч ${minutes}м`
  }

  function formatTime(date, minutes) {
    const firstTime = format(new Date(date), 'HH:mm')
    const secondTime = format(add(new Date(date), { minutes }), 'HH:mm')
    return `${firstTime}-${secondTime}`
  }

  // if (directions)
  //   return (
  //     <div className="card-body">
  //       <p className="offer-price">{info.price} P</p>
  //       <img src={`https://pics.avs.io/99/36/${info.carrier}.png`} alt="" className="airline-logo" />
  //       <div className="direction-block">
  //         <p className="direction heading">{`${directions[0].origin}-${directions[0].destination}`}</p>
  //         <p className="direction-time content">{formatTime(directions[0].date, directions[0].duration)}</p>
  //         <p className="direction heading">{`${directions[1].origin}-${directions[1].destination}`}</p>
  //         <p className="direction-time content">{formatTime(directions[1].date, directions[1].duration)}</p>
  //       </div>
  //       <div className="travel-time-block">
  //         <p className="travel-time heading">В ПУТИ</p>
  //         <p className="travel-time content">{formatMinutes(directions[0].duration)}</p>
  //         <p className="travel-time heading">В ПУТИ</p>
  //         <p className="travel-time content">{formatMinutes(directions[1].duration)}</p>
  //       </div>
  //       <div className="transfers-block">
  //         <p className="transfers heading">{`${directions[0].stops.length} ПЕРЕСАДКИ`}</p>
  //         <p className="transfers content">{directions[0].stops.join(', ')}</p>
  //         <p className="transfers heading">{`${directions[1].stops.length} ПЕРЕСАДКИ`}</p>
  //         <p className="transfers content">{directions[1].stops.join(', ')}</p>
  //       </div>
  //     </div>
  //   )

  return (
    <div className="card-body">
      <div className="mainInfo">
        <p className="offer-price">{info.price} P</p>
        <img src={`https://pics.avs.io/99/36/${info.carrier}.png`} alt="" className="airline-logo" />
      </div>
      <div className="firstDirection">
        <div>
          <p className="direction heading">{`${directions[0].origin}-${directions[0].destination}`}</p>
          <p className="direction-time content">{formatTime(directions[0].date, directions[0].duration)}</p>
        </div>
        <div>
          <p className="travel-time heading">В ПУТИ</p>
          <p className="travel-time content">{formatMinutes(directions[0].duration)}</p>
        </div>
        <div>
          <p className="transfers heading">{`${directions[0].stops.length} ПЕРЕСАДКИ`}</p>
          <p className="transfers content">{directions[0].stops.join(', ')}</p>
        </div>
      </div>
      <div className="secondDirection">
        <div>
          <p className="direction heading">{`${directions[1].origin}-${directions[1].destination}`}</p>
          <p className="direction-time content">{formatTime(directions[1].date, directions[1].duration)}</p>
        </div>
        <div>
          <p className="travel-time heading">В ПУТИ</p>
          <p className="travel-time content">{formatMinutes(directions[1].duration)}</p>
        </div>
        <div>
          <p className="transfers heading">{`${directions[1].stops.length} ПЕРЕСАДКИ`}</p>
          <p className="transfers content">{directions[1].stops.join(', ')}</p>
        </div>
      </div>
    </div>
  )
}

export default OfferCard
