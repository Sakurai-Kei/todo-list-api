export default function Register() {
  return (
    <section className="w-screen h-screen flex justify-center items-center bg-slate-300">
      <form method="POST" action="/backend/user" className="flex flex-col">
        <div>
          <label htmlFor="name">Username</label>
          <input
            type="string"
            id="name"
            name="name"
            className="rounded-md m-2 p-2"
          />
        </div>
        <button
          type="submit"
          className="p-2 bg-blue-500 rounded-md shadow-sm text-white hover:text-black"
        >
          Register
        </button>
      </form>
    </section>
  );
}
