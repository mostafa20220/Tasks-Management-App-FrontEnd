export default function Loading() {
  return (
    <div className="fixed top-0 h-screen w-full backdrop-blur-sm flex flex-col justify-center items-center z-50">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  )
}
