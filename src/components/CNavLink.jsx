import { Link, useLocation } from "react-router-dom"

function CNavLink({children, to, active = [], ...props}) {

    // const match = useMatch(to) ? 'active' : ''
    const location = useLocation();

    const isActive = () => {
        return active.some(path => location.pathname.includes(path));
    };

    const match = active && isActive() ? 'active' : '';

  return (
    <li className={match}>
        <Link to={to} {...props}>
            {children}
        </Link>
    </li>
  )
}

export {CNavLink}
