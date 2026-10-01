import { useEffect, useState } from 'react'

export default function StoryViewer({ story, onClose }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setProgress(0)
    const step = 100 / (5000 / 50)
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          onClose()
          return 100
        }
        return p + step
      })
    }, 50)
    return () => clearInterval(interval)
  }, [story, onClose])

  if (!story) return null

  return (
    <div className="ig-story-viewer" onClick={onClose}>
      <div className="ig-story-viewer__bar">
        <div
          className="ig-story-viewer__bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="ig-story-viewer__header">
        <img src={story.avatar} alt={story.username} />
        <span>{story.username}</span>
        <button
          className="ig-icon-btn ms-auto"
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
        >
          <i className="bi bi-x-lg" />
        </button>
      </div>
      <div className="ig-story-viewer__body">
        <img src={story.avatar} alt="" className="ig-story-viewer__media" />
      </div>
    </div>
  )
}
