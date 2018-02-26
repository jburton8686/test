import Link from "next/link";
import Head from "next/head";

export default ({ children, title = "This is the default title" }) => (
  // <link id="favicon" rel="cheers icon" type="../static/favicon.ico" href="favicon.ico" />
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link href="/">
          <button>Cheers</button>
        </Link>
        {" "}
        <Link href="/about">
          <button>About</button>
        </Link>
        {' '}
        <Link href="/search">
          <button>Search</button>
        </Link>
        {' '}
        <Link href="/login">
          <button>Login</button>
        </Link>
        {' '}
        <Link href="/signup">
          <button>Sign up</button>
        </Link>
        {' '}
        <Link href="/user">
          <button>User</button>
        </Link>
      </nav>
    </header>

    {children}
  </div>
);

{
  /* // const Navbar = () => (
//   <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
//     <a className="navbar-brand" href="/">
//       Cheers
//     </a>
//     <ul className="navbar-nav mr-auto">
//       <li className="nav-item">
//         <Link href="/about">
//           <a className="nav-link">About</a>
//         </Link>
//       </li>

//       <li className="nav-item">
//         <Link href="/user">
//           <a className="nav-link">User</a>
//         </Link>
//       </li>

//       <li className="nav-item">
//         <Link href="/login">
//           <a className="nav-link">Login</a>
//         </Link>
//       </li>
//       <li className="nav-item">
//         <Link href="/signup">
//           <a className="nav-link">Sign Up</a>
//         </Link>
//       </li>
//     </ul>
//   </nav>
// );
// export default Navbar; */
}
