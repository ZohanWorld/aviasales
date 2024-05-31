/* eslint-disable react/no-array-index-key */
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import OfferCard from '../offer-card/offer-card'
import './main-content.scss'
import { increaseElemsPerPage, fetchSearchId, fetchTickets, changeTab } from '../../store/dataSlice'

function MainContent() {
  const dispatch = useDispatch()
  const searchId = useSelector((state) => state.data.searchId)
  const elemsPerPage = useSelector((state) => state.data.elemsPerPage)
  const tickets = useSelector((state) => state.data.data)
  const status = useSelector((state) => state.data.status)
  const tab = useSelector((state) => state.data.tab)
  const filterParameters = useSelector((state) => state.filter)
  // const error = useSelector((state) => state.data.error)
  let ticker = 0

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSearchId())
    }
  }, [status, dispatch])

  useEffect(() => {
    if (searchId && status === 'succeeded') {
      dispatch(fetchTickets(searchId))
    }
  }, [searchId, dispatch])

  function filterTickets() {
    const ticketsCopy = [...tickets]
    return ticketsCopy.sort((a, b) => {
      if (tab === 'cheapest') {
        return a.price - b.price
      }
      if (tab === 'fastest') {
        const durationA = a.segments[0].duration + a.segments[1].duration
        const durationB = b.segments[0].duration + b.segments[1].duration
        return durationA - durationB
      }
      if (tab === 'optimal') {
        const durationA = a.segments[0].duration + a.segments[1].duration
        const durationB = b.segments[0].duration + b.segments[1].duration
        const scoreA = a.price + durationA
        const scoreB = b.price + durationB
        return scoreA - scoreB
      }
      throw new Error('Unknown sorting criterion')
    })
  }

  function ticketMatchFilters(ticket, filters) {
    if (filters.all.active) {
      return true
    }

    return ticket.segments.every((segment) => {
      const stopsCount = segment.stops.length

      return (
        (stopsCount === 0 && filters.direct.active) ||
        (stopsCount === 1 && filters.oneStop.active) ||
        (stopsCount === 2 && filters.twoStops.active) ||
        (stopsCount === 3 && filters.threeStops.active)
      )
    })
  }

  return (
    <main className="main">
      <div className="sort-options">
        <label htmlFor="cheapest" className={`sort-option ${tab === 'cheapest' ? 'selected-option' : null}`}>
          <input
            type="radio"
            id="cheapest"
            name="radio"
            checked={tab === 'cheapest'}
            className="radio"
            onChange={() => dispatch(changeTab({ tab: 'cheapest' }))}
          />
          САМЫЙ ДЕШЕВЫЙ
        </label>
        <label htmlFor="fastest" className={`sort-option ${tab === 'fastest' ? 'selected-option' : null}`}>
          <input
            type="radio"
            id="fastest"
            name="radio"
            checked={tab === 'fastest'}
            className="radio"
            onChange={() => dispatch(changeTab({ tab: 'fastest' }))}
          />
          САМЫЙ БЫСТРЫЙ
        </label>
        <label htmlFor="optimal" className={`sort-option ${tab === 'optimal' ? 'selected-option' : null}`}>
          <input
            type="radio"
            id="optimal"
            name="radio"
            checked={tab === 'optimal'}
            className="radio"
            onChange={() => dispatch(changeTab({ tab: 'optimal' }))}
          />
          ОПТИМАЛЬНЫЙ
        </label>
      </div>
      {status !== 'succeeded' ? <span className="loader" /> : null}
      <ul>
        {filterTickets().map((value, index) => {
          if (!ticketMatchFilters(value, filterParameters)) {
            return null
          }
          if (ticker >= elemsPerPage) {
            return null
          }
          ticker += 1
          return (
            <li className="offer-card" key={index}>
              <OfferCard info={value} />
            </li>
          )
        })}
      </ul>
      {status === 'succeeded' ? (
        <button type="button" onClick={() => dispatch(increaseElemsPerPage())} className="increase-tickets">
          Показать еще 5 билетов
        </button>
      ) : null}
    </main>
  )
}

export default MainContent
