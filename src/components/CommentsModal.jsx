import { useState } from 'react'

export default function CommentsModal({ post, onClose, onAddComment }) {
  const [text, setText] = useState('')

  if (!post) return null

  const submit = (e) => {
    e.preventDefault()
    const value = text.trim()
    if (!value) return
    onAddComment(post.id, value)
    setText('')
  }

  return (
    <div className="ig-modal-backdrop" onClick={onClose}>
      <div className="ig-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ig-modal__head">
          <strong>Commentaires</strong>
          <button className="ig-icon-btn" onClick={onClose}>
            <i className="bi bi-x-lg" />
          </button>
        </div>
        <div className="ig-modal__body">
          <div className="ig-panel__row ig-modal__caption">
            <img
              src={post.avatar || 'https://i.pravatar.cc/150?img=1'}
              alt={post.username}
            />
            <div>
              <strong>{post.username}</strong> {post.caption}
            </div>
          </div>
          {post.comments.length === 0 && (
            <p className="ig-text-secondary text-center mt-4">
              Aucun commentaire pour le moment.
            </p>
          )}
          {post.comments.map((c) => (
            <div key={c.id} className="ig-panel__row">
              <img src={`https://i.pravatar.cc/150?img=${(c.id * 7) % 70}`} alt="" />
              <div>
                <strong>{c.username}</strong> {c.text}
              </div>
            </div>
          ))}
        </div>
        <form className="ig-modal__footer" onSubmit={submit}>
          <i className="bi bi-emoji-smile fs-5" />
          <input
            type="text"
            placeholder="Ajouter un commentaire..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit" className="ig-link-btn" disabled={!text.trim()}>
            Publier
          </button>
        </form>
      </div>
    </div>
  )
}
