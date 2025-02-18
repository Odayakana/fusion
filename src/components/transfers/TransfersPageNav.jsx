import { CNavLink } from '../CNavLink'

function TransfersPageNav() {

  return (
      <div className="onpage-nav-block">
          <ul className="onpage-nav">
              <CNavLink to={`/transfers-players`} active={[`transfers-players`]}>
                  Players
              </CNavLink>
              <CNavLink to={`/transfers-ongoing`} active={[`transfers-ongoing`]}>
                  Ongoing
              </CNavLink>
              <CNavLink to={`/transfers-signed`} active={[`transfers-signed`]}>
                  Signed
              </CNavLink>
          </ul>

      </div>
  )
}

export {TransfersPageNav}
