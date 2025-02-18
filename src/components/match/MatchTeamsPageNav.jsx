import { CNavLink } from '../CNavLink'
import leagueTeams from "../../json-data/league-teams.json"
import {findObjectByKeyValue} from "../utils.js";

function MatchTeamsPageNav({id, teamOneId, teamTwoId}) {

    const teamOne = findObjectByKeyValue(leagueTeams, "id", teamOneId);
    const teamTwo = findObjectByKeyValue(leagueTeams, "id", teamTwoId);


    return (
      <div className="onpage-nav-block">
          <ul className="onpage-nav">
              <CNavLink to={`/match/${id}/summary/${teamOneId}`} active={[`/summary/${teamOneId}`]}>
                  {teamOne.title}
              </CNavLink>
              <CNavLink to={`/match/${id}/summary/${teamTwoId}`} active={[`/summary/${teamTwoId}`]}>
                  {teamTwo.title}
              </CNavLink>
          </ul>

      </div>
  )
}

export {MatchTeamsPageNav}
