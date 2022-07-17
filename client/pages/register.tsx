export default function Register() {
  return (
    <form method="POST" action="/backend/user">
      <label htmlFor="name">Username</label>
      <input type="string" id="name" name="name" />
      <button type="submit">Register</button>
    </form>
  );
}
