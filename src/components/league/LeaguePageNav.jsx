import { CNavLink } from '../CNavLink'

function LeaguePageNav({slug}) {

  return (
      <div className="onpage-nav-block">
          <ul className="onpage-nav">
              <CNavLink to={`/league/${slug}/fixtures`} active={['fixtures']}>
                  Fixtures
              </CNavLink>
              <CNavLink to={`/league/${slug}/table`} active={['table']}>
                  Table
              </CNavLink>
          </ul>

      </div>
  )
}

export {LeaguePageNav}
