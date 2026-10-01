import { useState } from 'react'
import Sidebar from './components/Sidebar'
import RightPanel from './components/RightPanel'
import Header from './components/Header'
import Feed from './components/Feed'
import Footer from './components/Footer'
import StoryViewer from './components/StoryViewer'
import SearchPanel from './components/SearchPanel'
import NotificationsPanel from './components/NotificationsPanel'
import CommentsModal from './components/CommentsModal'
import CreateModal from './components/CreateModal'
import postsData from './data/posts'

export default function App() {
  const [posts, setPosts] = useState(postsData)
  const [activeStory, setActiveStory] = useState(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [commentsPost, setCommentsPost] = useState(null)
  const [unread, setUnread] = useState(true)

  const closeAllPanels = () => {
    setSearchOpen(false)
    setNotifOpen(false)
  }

  const handleOpenSearch = () => {
    setNotifOpen(false)
    setSearchOpen((v) => !v)
  }

  const handleOpenNotifications = () => {
    setSearchOpen(false)
    setUnread(false)
    setNotifOpen((v) => !v)
  }

  const handleAddComment = (postId, text) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: [
                ...p.comments,
                { id: p.comments.length + 1, username: 'imen.dev', text },
              ],
            }
          : p
      )
    )
    setCommentsPost((prev) =>
      prev && prev.id === postId
        ? {
            ...prev,
            comments: [
              ...prev.comments,
              { id: prev.comments.length + 1, username: 'imen.dev', text },
            ],
          }
        : prev
    )
  }

  const handlePublish = ({ media, caption }) => {
    const newPost = {
      id: Date.now(),
      username: 'imen.dev',
      verified: false,
      avatar: 'https://i.pravatar.cc/150?img=44',
      following: true,
      location: null,
      type: 'image',
      media,
      caption,
      likes: 0,
      comments: [],
      shares: 0,
      reposts: 0,
      timeAgo: "À l'instant",
    }
    setPosts((prev) => [newPost, ...prev])
  }

  return (
    <div className="ig-root">
      <Sidebar
        active="home"
        onOpenSearch={handleOpenSearch}
        onOpenNotifications={handleOpenNotifications}
        onOpenCreate={() => setCreateOpen(true)}
        hasUnread={unread}
      />

      <div className="ig-app">
        <Header
          onOpenStory={setActiveStory}
          onOpenSearch={handleOpenSearch}
          onOpenNotifications={handleOpenNotifications}
          onOpenCreate={() => setCreateOpen(true)}
        />
        <Feed posts={posts} onOpenComments={setCommentsPost} />
        <Footer onOpenSearch={handleOpenSearch} />
      </div>

      <RightPanel />

      <SearchPanel open={searchOpen} onClose={closeAllPanels} />
      <NotificationsPanel open={notifOpen} onClose={closeAllPanels} />

      {activeStory && (
        <StoryViewer story={activeStory} onClose={() => setActiveStory(null)} />
      )}

      <CommentsModal
        post={commentsPost}
        onClose={() => setCommentsPost(null)}
        onAddComment={handleAddComment}
      />

      <CreateModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onPublish={handlePublish}
      />
    </div>
  )
}
