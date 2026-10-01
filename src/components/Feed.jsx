import Post from './Post'

export default function Feed({ posts, onOpenComments }) {
  return (
    <main className="ig-feed">
      {posts.map((post) => (
        <Post key={post.id} post={post} onOpenComments={onOpenComments} />
      ))}
      <div className="ig-feed__end">
        <p>Vous avez tout vu ✨</p>
      </div>
    </main>
  )
}
