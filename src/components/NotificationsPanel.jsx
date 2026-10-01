import notifications from '../data/notifications'

const iconFor = {
  like: 'bi-heart-fill text-danger',
  follow: 'bi-person-plus-fill text-primary',
  comment: 'bi-chat-fill text-primary',
  share: 'bi-send-fill text-primary',
}

export default function NotificationsPanel({ open, onClose }) {
  return (
    <>
      <div
        className={'ig-panel-backdrop' + (open ? ' ig-panel-backdrop--show' : '')}
        onClick={onClose}
      />
      <div className={'ig-panel' + (open ? ' ig-panel--open' : '')}>
        <div className="ig-panel__head">
          <h2>Notifications</h2>
          <button className="ig-icon-btn d-lg-none" onClick={onClose}>
            <i className="bi bi-x-lg" />
          </button>
        </div>
        <p className="ig-panel__section-title">Cette semaine</p>
        <div className="ig-panel__list">
          {notifications.map((n) => (
            <div key={n.id} className="ig-panel__row">
              <img src={n.avatar} alt={n.username} />
              <div className="flex-fill">
                <span>
                  <strong>{n.username}</strong> {n.text}
                </span>
                <div className="ig-text-secondary small">Il y a {n.time}</div>
              </div>
              <i className={`bi ${iconFor[n.type] || 'bi-bell-fill'} ig-panel__row-icon`} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
