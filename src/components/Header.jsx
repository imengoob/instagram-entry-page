import stories from '../data/stories'
import { useTheme } from '../context/ThemeContext'

export default function Header({ onOpenStory, onOpenSearch, onOpenNotifications, onOpenCreate }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="ig-header">
      <div className="ig-topbar d-lg-none">
        <button className="ig-icon-btn" aria-label="Créer" onClick={onOpenCreate}>
          <i className="bi bi-plus-square" />
        </button>
        <h1 className="ig-logo">Instagram</h1>
        <div className="d-flex align-items-center gap-3">
          <button
            className="ig-icon-btn"
            onClick={toggleTheme}
            aria-label="Basculer le mode sombre / clair"
            title={theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
          >
            <i className={theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon-stars'} />
          </button>
          <button className="ig-icon-btn" aria-label="Notifications" onClick={onOpenNotifications}>
            <i className="bi bi-heart" />
          </button>
        </div>
      </div>

      <div className="ig-stories">
        {stories.map((story) => (
          <button
            key={story.id}
            className="ig-story-item"
            onClick={() => onOpenStory?.(story)}
          >
            <span
              className={
                'ig-story-ring' +
                (story.isOwn
                  ? ' ig-story-ring--own'
                  : story.seen
                  ? ' ig-story-ring--seen'
                  : '')
              }
            >
              <img src={story.avatar} alt={story.username} />
              {story.isOwn && (
                <span className="ig-story-plus">
                  <i className="bi bi-plus" />
                </span>
              )}
            </span>
            <span className="ig-story-name">{story.username}</span>
          </button>
        ))}
      </div>
    </header>
  )
}
