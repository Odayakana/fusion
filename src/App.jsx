import React from "react";

import { Routes, Route, Navigate } from 'react-router-dom';
import { MyTeamPitch } from './pages/TeamPage';
import { MyTeamList } from './pages/TeamPageList';
import { PlayerPage } from './pages/PlayerPage';
import { LeagueTablePage } from './pages/LeagueTablePage';
import { LeagueFixturesPage } from './pages/LeagueFixturesPage';
import { TransfersPage } from './pages/TransfersPage';
import { TransfersSignedPage } from './pages/TransfersSignedPage';
import { TransfersOngoingPage } from './pages/TransfersOngoingPage';

import { MatchLineups } from './pages/MatchLineups';
import { MatchPage } from './pages/MatchPage';
import { MatchSummary } from './pages/MatchSummary';

import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { RegisterTeamPage } from './pages/RegisterTeamPage';

import { Onboarding } from './pages/Onboarding';
import { CreateLeague } from './pages/CreateLeague';
import { LeagueJoinPage } from './pages/LeagueJoinPage';

import { NotFoundPage } from './pages/404';
import { Layout } from './pages/Layout';

function App() {


    const [loggedIn, setLoggedIn] = React.useState(true);
    const [teamId, setTeamId] = React.useState(1);

    const renderIndexElement = () => {

        if (loggedIn) {
            return <Navigate to="/team-pitch/1" replace />
        }
        return <Navigate to="/login" replace />;
    };

  return (
      <Routes>
          <Route path="/" element={<Layout />}>
              <Route index element={renderIndexElement()} />
              <Route path="team-pitch/:id" element={<MyTeamPitch />} />
              <Route path="team-list/:id" element={<MyTeamList />} />
              <Route path="player/:slug" element={<PlayerPage />} />
              <Route path="league/:slug/table" element={<LeagueTablePage />} />
              <Route path="league/:slug/fixtures" element={<LeagueFixturesPage />} />
              <Route path="transfers-players" element={<TransfersPage />} />
              <Route path="transfers-ongoing" element={<TransfersOngoingPage />} />
              <Route path="transfers-signed" element={<TransfersSignedPage />} />
              <Route path="match/:id/lineups" element={<MatchLineups />} />
              <Route path="match/:id/match" element={<MatchPage />} />
              <Route path="match/:id/summary/:teamId" element={<MatchSummary />} />

              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="register-team" element={<RegisterTeamPage />} />

              <Route path="onboarding" element={<Onboarding />} />
              <Route path="create-league" element={<CreateLeague />} />
              <Route path="join-league" element={<LeagueJoinPage />} />

              <Route path="*" element={<NotFoundPage />} />
          </Route>
      </Routes>
  );
}

export default App;
