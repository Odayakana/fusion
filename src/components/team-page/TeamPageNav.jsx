import { CNavLink } from '../CNavLink'

function TeamPageNav({id}) {

  return (
      <div className="onpage-nav-block">
          <ul className="onpage-nav">
              <CNavLink to={`/team-pitch/${id}`} active={['team-pitch']}>
                  Pitch
              </CNavLink>
              <CNavLink to={`/team-list/${id}`} active={['team-list']}>
                  List
              </CNavLink>
          </ul>

      </div>
  )
}

export {TeamPageNav}
