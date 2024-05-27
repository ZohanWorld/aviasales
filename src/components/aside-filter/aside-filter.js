/* eslint-disable jsx-a11y/label-has-associated-control */
import { useDispatch, useSelector } from 'react-redux'

import { toggleAll, toggleFilter } from '../../store/filterSlice'
import './aside-filter.scss'

function AsideFilter() {
  const filters = useSelector((state) => state.filter)
  const dispatch = useDispatch()

  const handleToggleAll = () => {
    dispatch(toggleAll())
  }

  const handleToggleFilter = (filter) => {
    dispatch(toggleFilter(filter))
  }

  return (
    <aside className="aside-filter">
      <p className="aside-filter__heading">Количество пересадок</p>
      <label className="aside-filter__label">
        <input type="checkbox" className="check-box" checked={filters.all.active} onChange={handleToggleAll} />
        <span className={`visual-checkbox ${filters.all.active ? 'checked-visual-checkbox' : null}`} />
        Все
      </label>
      <label className="aside-filter__label">
        <input
          type="checkbox"
          className="check-box"
          checked={filters.direct.active}
          onChange={() => handleToggleFilter('direct')}
        />
        <span className={`visual-checkbox ${filters.direct.active ? 'checked-visual-checkbox' : null}`} />
        Без пересадок
      </label>
      <label className="aside-filter__label">
        <input
          type="checkbox"
          className="check-box"
          checked={filters.oneStop.active}
          onChange={() => handleToggleFilter('oneStop')}
        />
        <span className={`visual-checkbox ${filters.oneStop.active ? 'checked-visual-checkbox' : null}`} />1 пересадка
      </label>
      <label className="aside-filter__label">
        <input
          type="checkbox"
          className="check-box"
          checked={filters.twoStops.active}
          onChange={() => handleToggleFilter('twoStops')}
        />
        <span className={`visual-checkbox ${filters.twoStops.active ? 'checked-visual-checkbox' : null}`} />2 пересадки
      </label>
      <label className="aside-filter__label">
        <input
          type="checkbox"
          className="check-box"
          checked={filters.threeStops.active}
          onChange={() => handleToggleFilter('threeStops')}
        />
        <span className={`visual-checkbox ${filters.threeStops.active ? 'checked-visual-checkbox' : null}`} />3
        пересадки
      </label>
    </aside>
  )
}

export default AsideFilter
