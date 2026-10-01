import { useState } from 'react'
import suggestions from '../data/suggestions'

export default function RightPanel() {
  const [followed, setFollowed] = useState({})

  const toggleFollow = (id) =>
    setFollowed((f) => ({ ...f, [id]: !f[id] }))

  return (
    <aside className="ig-rightpanel">
      <div className="ig-rightpanel__profile">
        <img src="https://i.pravatar.cc/150?img=44" alt="Votre profil" />
        <div>
          <strong>Imen Goob</strong>
          <div className="ig-text-secondary">Imen</div>
        </div>
        <button className="ig-link-btn">Changer</button>
      </div>

      <div className="ig-rightpanel__header">
        <span className="ig-text-secondary">Suggestions pour vous</span>
        <button className="ig-link-btn">Tout voir</button>
      </div>

      <ul className="ig-rightpanel__list">
        {suggestions.map((s) => (
          <li key={s.id} className="ig-rightpanel__item">
            <img src={s.avatar} alt={s.username} />
            <div className="ig-rightpanel__meta">
              <strong>{s.username}</strong>
              <span className="ig-text-secondary">{s.subtitle}</span>
            </div>
            <button
              className={
                'ig-follow-btn' + (followed[s.id] ? ' ig-follow-btn--active' : '')
              }
              onClick={() => toggleFollow(s.id)}
            >
              {followed[s.id] ? 'Suivi(e)' : 'Suivre'}
            </button>
          </li>
        ))}
      </ul>

      <p className="ig-rightpanel__footer">
        © 2026 Instagram Clone · Projet de démonstration React + Vite
      </p>
    </aside>
  )
}
