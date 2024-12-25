import React, { useState } from "react";
import styled from "styled-components";
import PlayersList from "../../pages/players/players.tsx";
import TeamsList from "../../pages/teams/Teams.tsx";
import GamesList from "../../pages/games/Games.tsx";

interface ButtonProps {
  bgColor?: string;
}

interface ViewProps {
  bgColor?: string;
}

const Wrapper = styled.div`
  text-align: center;
  margin: 20px;
`;

const Button = styled.button<ButtonProps>`
  padding: 10px 20px;
  margin: 10px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: beige;
  background-color: ${(props) => props.bgColor || "gray"};
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;

const View = styled.div<ViewProps>`
  position: relative;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: ${(props) => props.bgColor};
  color: beige;
  border-radius: 10px;
  font-size: 18px;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("/src/components/screen/players.png");
    background-position: right;
    background-repeat: no-repeat;
    opacity: 0.5;
    z-index: 0;
  }

  & > * {
    position: relative;
    z-index: 1;
  }
`;

const ViewSwitcher: React.FC = () => {
  const [activeView, setActiveView] = useState("players");

  const handleViewChange = (view: string) => {
    setActiveView(view);
  };

  return (
    <Wrapper>
      <Button bgColor="#2b513e" onClick={() => handleViewChange("players")}>
        Players
      </Button>
      <Button bgColor="#2b513e" onClick={() => handleViewChange("teams")}>
        Teams
      </Button>
      <Button bgColor="#2b513e" onClick={() => handleViewChange("games")}>
        Games
      </Button>

      {activeView === "players" && (
        <View bgColor={"#2b513e"}>
          <PlayersList />
        </View>
      )}
      {activeView === "teams" && (
        <View bgColor={"#01374a"}>
          <TeamsList />
        </View>
      )}
      {activeView === "games" && (
        <View bgColor={"#654d20"}>
          <GamesList />
        </View>
      )}
    </Wrapper>
  );
};

export default ViewSwitcher;
