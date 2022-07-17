export default function CreateTask() {
  return (
    <form method="POST" action="/backend/task">
      <label htmlFor="title">Task</label>
      <input type="string" id="title" name="title" />
      <label htmlFor="name">Username</label>
      <input type="string" id="name" name="name" />
      <button type="submit">Create Task</button>
    </form>
  );
}
