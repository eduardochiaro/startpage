import Bookmarks from "../widgets/bookmarks";

const Center = () => {
  return (
    <div className="bg-green-100 flex flex-grow bg-cover bg-center" style={{ backgroundImage: `url("./images/bgs/bg-1.jpg")`}}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-10 w-full p-10 z-8">
        <Bookmarks size="1" />
        <div className="rounded bg-white drop-shadow p-6">02</div>
        <div className="rounded bg-white drop-shadow p-6">03</div>
        <div className="rounded bg-white drop-shadow p-6 col-span-2">06</div>
        <div className="rounded bg-white drop-shadow p-6">05</div>
      </div>
    </div>
  )
}
export default Center;