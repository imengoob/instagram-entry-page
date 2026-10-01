import { useMemo, useState } from 'react'
import stories from '../data/stories'
import suggestions from '../data/suggestions'

export default function SearchPanel({ open, onClose }) {
  const [query, setQuery] = useState('')

  const accounts = useMemo(() => {
    const all = [
      ...stories.filter((s) => !s.isOwn).map((s) => ({ username: s.username, avatar: s.avatar })),
      ...suggestions,
    ]
    if (!query.trim()) return all.slice(0, 6)
    return all.filter((a) =>
      a.username.toLowerCase().includes(query.trim().toLowerCase())
    )
  }, [query])

  return (
    <>
      <div
        className={'ig-panel-backdrop' + (open ? ' ig-panel-backdrop--show' : '')}
        onClick={onClose}
      />
      <div className={'ig-panel' + (open ? ' ig-panel--open' : '')}>
        <div className="ig-panel__head">
          <h2>Recherche</h2>
          <button className="ig-icon-btn d-lg-none" onClick={onClose}>
            <i className="bi bi-x-lg" />
          </button>
        </div>
        <div className="ig-panel__search">
          <i className="bi bi-search" />
          <input
            type="text"
            autoFocus={open}
            placeholder="Rechercher"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button className="ig-icon-btn" onClick={() => setQuery('')}>
              <i className="bi bi-x-circle-fill" />
            </button>
          )}
        </div>
        <div className="ig-panel__list">
          {accounts.length === 0 && (
            <p className="ig-text-secondary text-center mt-4">Aucun résultat</p>
          )}
          {accounts.map((a) => (
            <div key={a.username} className="ig-panel__row">
              <img src={a.avatar} alt={a.username} />
              <div>
                <strong>{a.username}</strong>
                <div className="ig-text-secondary small">Compte Instagram</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
