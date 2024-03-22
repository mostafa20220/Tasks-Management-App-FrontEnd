import Link from "next/link";

const HomePage = () => {
  return (
    <div className="grid place-items-center h-screen">
      <main className=" w-fit p-8 text-center pb-40">
        <h1 className="text-4xl font-bold mb-12">
          Welcome to Tasks Management App
        </h1>
        <h2 className=" mb-8 text-xl">
          This is a simple app to manage your tasks.
          <br /> You can add, remove, and update your tasks.
        </h2>
        <Link
          href={"dashboard"}
          className="btn bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-800 transition-all"
        >
          Get Started
        </Link>
      </main>
    </div>
  );
};

export default HomePage;
