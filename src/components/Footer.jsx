import { useState } from 'react'

export default function Footer({ onOpenSearch }) {
  const [active, setActive] = useState('home')

  const navItems = [
    { id: 'home', icon: 'bi-house-fill' },
    { id: 'search', icon: 'bi-search', action: onOpenSearch },
    { id: 'reels', icon: 'bi-play-btn' },
    { id: 'shop', icon: 'bi-send' },
    { id: 'profile', icon: 'bi-person-circle' },
  ]

  return (
    <footer className="ig-footer d-lg-none">
      {navItems.map((item) => (
        <button
          key={item.id}
          className={
            'ig-footer__btn' + (active === item.id ? ' ig-footer__btn--active' : '')
          }
          onClick={() => {
            setActive(item.id)
            item.action?.()
          }}
          aria-label={item.id}
        >
          <i className={`bi ${item.icon}`} />
        </button>
      ))}
    </footer>
  )
}
