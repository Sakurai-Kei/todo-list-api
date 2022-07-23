export default function CreateTask() {
  return (
    <section className="w-screen h-screen flex justify-center items-center bg-slate-300">
      <form method="POST" action="/backend/task" className="flex flex-col">
        <label htmlFor="title">Task</label>
        <input
          type="string"
          id="title"
          name="title"
          className="rounded-md m-2 p-2"
        />
        <label htmlFor="name">Username</label>
        <input
          type="string"
          id="name"
          name="name"
          className="rounded-md m-2 p-2"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 rounded-md shadow-sm text-white hover:text-black"
        >
          Create Task
        </button>
      </form>
    </section>
  );
}
