import { useRef, useState } from 'react'

export default function Post({ post, onLikeChange, onOpenComments }) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes)
  const [saved, setSaved] = useState(false)
  const [following, setFollowing] = useState(post.following)
  const [playing, setPlaying] = useState(false)
  const [burst, setBurst] = useState(false)
  const videoRef = useRef(null)

  const setLike = (value) => {
    if (value === liked) return
    setLiked(value)
    setLikeCount((c) => (value ? c + 1 : c - 1))
    onLikeChange?.(post.id, value)
  }

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play()
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  const handleMediaClick = () => {
    if (post.type === 'video') {
      togglePlay()
    }
  }

  const handleDoubleClick = () => {
    setLike(true)
    setBurst(true)
    setTimeout(() => setBurst(false), 700)
  }

  return (
    <article className="ig-post">
      <div className="ig-post__head">
        <div className="ig-post__user">
          {post.avatar ? (
            <img src={post.avatar} alt={post.username} className="ig-post__avatar" />
          ) : (
            <span className="ig-post__avatar ig-post__avatar--icon">
              <i className={`bi ${post.avatarIcon || 'bi-person'}`} />
            </span>
          )}
          <div className="ig-post__user-meta">
            <span className="ig-post__username">
              {post.username}
              {post.verified && (
                <i className="bi bi-patch-check-fill ig-post__verified" />
              )}
            </span>
            {post.location && (
              <span className="ig-post__location">{post.location}</span>
            )}
          </div>
          {!following && (
            <>
              <span className="ig-post__dot">·</span>
              <button
                className="ig-link-btn ig-link-btn--bold"
                onClick={() => setFollowing(true)}
              >
                Suivre
              </button>
            </>
          )}
        </div>
        <button className="ig-icon-btn" aria-label="Plus d'options">
          <i className="bi bi-three-dots" />
        </button>
      </div>

      <div
        className="ig-post__media"
        onClick={handleMediaClick}
        onDoubleClick={handleDoubleClick}
      >
        {post.type === 'video' ? (
          <>
            <video
              ref={videoRef}
              src={post.media}
              poster={post.poster}
              loop
              muted
              playsInline
              className="ig-post__media-el"
            />
            {!playing && (
              <span className="ig-post__play-overlay">
                <i className="bi bi-play-fill" />
              </span>
            )}
          </>
        ) : (
          <img src={post.media} alt={post.caption} className="ig-post__media-el" />
        )}
        {post.caption && post.type === 'video' && (
          <span className="ig-post__caption-overlay">{post.caption}</span>
        )}
        {burst && (
          <span className="ig-post__like-burst">
            <i className="bi bi-heart-fill" />
          </span>
        )}
      </div>

      <div className="ig-post__actions">
        <div className="d-flex gap-3">
          <button
            className={'ig-icon-btn' + (liked ? ' ig-icon-btn--liked' : '')}
            onClick={() => setLike(!liked)}
            aria-label="Aimer"
          >
            <i className={liked ? 'bi bi-heart-fill' : 'bi bi-heart'} />
          </button>
          <button
            className="ig-icon-btn"
            aria-label="Commenter"
            onClick={() => onOpenComments?.(post)}
          >
            <i className="bi bi-chat" />
          </button>
          <button className="ig-icon-btn" aria-label="Partager">
            <i className="bi bi-send" />
          </button>
        </div>
        <button
          className="ig-icon-btn"
          onClick={() => setSaved((s) => !s)}
          aria-label="Enregistrer"
        >
          <i className={saved ? 'bi bi-bookmark-fill' : 'bi bi-bookmark'} />
        </button>
      </div>

      <div className="ig-post__stats">
        <span>
          <i className="bi bi-heart-fill" /> {likeCount.toLocaleString('fr-FR')}
        </span>
        <button className="ig-post__stat-btn" onClick={() => onOpenComments?.(post)}>
          <i className="bi bi-chat-fill" /> {post.comments.length}
        </button>
        <span>
          <i className="bi bi-arrow-repeat" /> {post.reposts}
        </span>
        <span>
          <i className="bi bi-send-fill" /> {post.shares}
        </span>
      </div>

      {post.type !== 'video' && post.caption && (
        <p className="ig-post__caption">
          <strong>{post.username}</strong> {post.caption}
        </p>
      )}
      {post.comments.length > 0 && (
        <button
          className="ig-post__view-comments"
          onClick={() => onOpenComments?.(post)}
        >
          Voir les {post.comments.length} commentaire{post.comments.length > 1 ? 's' : ''}
        </button>
      )}
      <span className="ig-post__time">{post.timeAgo}</span>
    </article>
  )
}
