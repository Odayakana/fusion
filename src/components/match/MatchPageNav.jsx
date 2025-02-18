import { CNavLink } from '../CNavLink'

function MatchPageNav({id, teamOneId}) {

  return (
      <div className="onpage-nav-block">
          <ul className="onpage-nav">
              <CNavLink to={`/match/${id}/lineups`} active={[`/match/${id}/lineups`]}>
                  Lineup
              </CNavLink>
              <CNavLink to={`/match/${id}/match`} active={[`/match/${id}/match`]}>
                  Match
              </CNavLink>
              <CNavLink to={`/match/${id}/summary/${teamOneId}`} active={[`/match/${id}/summary`]}>
                  Summary
              </CNavLink>
          </ul>

      </div>
  )
}

export {MatchPageNav}
