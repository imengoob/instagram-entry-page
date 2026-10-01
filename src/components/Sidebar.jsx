import { useTheme } from '../context/ThemeContext'

export default function Sidebar({
  active,
  onNavigate,
  onOpenSearch,
  onOpenNotifications,
  onOpenCreate,
  hasUnread,
}) {
  const { theme, toggleTheme } = useTheme()

  const items = [
    { id: 'home', label: 'Accueil', icon: 'bi-house', activeIcon: 'bi-house-fill' },
    { id: 'search', label: 'Recherche', icon: 'bi-search', action: onOpenSearch },
    { id: 'explore', label: 'Explorer', icon: 'bi-compass', activeIcon: 'bi-compass-fill' },
    { id: 'reels', label: 'Reels', icon: 'bi-camera-reels', activeIcon: 'bi-camera-reels-fill' },
    { id: 'messages', label: 'Messages', icon: 'bi-send' },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'bi-heart',
      activeIcon: 'bi-heart-fill',
      action: onOpenNotifications,
      badge: hasUnread,
    },
    { id: 'create', label: 'Créer', icon: 'bi-plus-square', action: onOpenCreate },
    { id: 'profile', label: 'Profil', icon: 'bi-person-circle', isAvatar: true },
  ]

  return (
    <aside className="ig-sidebar">
      <div className="ig-sidebar__logo">Instagram</div>
      <nav className="ig-sidebar__nav">
        {items.map((item) => (
          <button
            key={item.id}
            className={
              'ig-sidebar__link' +
              (active === item.id ? ' ig-sidebar__link--active' : '')
            }
            onClick={() => (item.action ? item.action() : onNavigate?.(item.id))}
          >
            <span className="ig-sidebar__icon-wrap">
              <i
                className={`bi ${
                  active === item.id && item.activeIcon ? item.activeIcon : item.icon
                }`}
              />
              {item.badge && <span className="ig-badge-dot" />}
            </span>
            <span className="ig-sidebar__label">{item.label}</span>
          </button>
        ))}
      </nav>

      <button className="ig-sidebar__link ig-sidebar__theme" onClick={toggleTheme}>
        <span className="ig-sidebar__icon-wrap">
          <i className={theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon-stars'} />
        </span>
        <span className="ig-sidebar__label">
          {theme === 'dark' ? 'Mode clair' : 'Mode sombre'}
        </span>
      </button>
    </aside>
  )
}
