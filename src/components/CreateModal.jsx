import { useState } from 'react'

export default function CreateModal({ open, onClose, onPublish }) {
  const [imageUrl, setImageUrl] = useState('')
  const [caption, setCaption] = useState('')

  if (!open) return null

  const reset = () => {
    setImageUrl('')
    setCaption('')
  }

  const submit = (e) => {
    e.preventDefault()
    if (!imageUrl.trim()) return
    onPublish({ media: imageUrl.trim(), caption: caption.trim() })
    reset()
    onClose()
  }

  return (
    <div
      className="ig-modal-backdrop"
      onClick={() => {
        reset()
        onClose()
      }}
    >
      <div className="ig-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ig-modal__head">
          <strong>Créer une nouvelle publication</strong>
          <button
            className="ig-icon-btn"
            onClick={() => {
              reset()
              onClose()
            }}
          >
            <i className="bi bi-x-lg" />
          </button>
        </div>
        <form onSubmit={submit}>
          <div className="ig-modal__body">
            <div className="ig-create__preview">
              {imageUrl ? (
                <img src={imageUrl} alt="Aperçu" />
              ) : (
                <div className="ig-create__placeholder">
                  <i className="bi bi-image" />
                  <span>Collez une URL d'image pour prévisualiser</span>
                </div>
              )}
            </div>
            <input
              type="url"
              className="ig-create__input"
              placeholder="URL de l'image (ex: https://...)"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
            <textarea
              className="ig-create__input"
              rows={3}
              placeholder="Écrire une légende..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>
          <div className="ig-modal__footer justify-content-end">
            <button type="submit" className="ig-primary-btn" disabled={!imageUrl.trim()}>
              Partager
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
