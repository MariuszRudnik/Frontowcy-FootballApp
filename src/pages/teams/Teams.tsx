import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTeams, Team } from "../../components/fetch/fetch.tsx";
import FormAddTeams from "./Components/FormAddTeams.tsx";
import styled from "styled-components";
import DeleteTeamButton from "./Components/DeleteTeamButton.tsx";
import { DivCenter } from "../../components/styles/styles.styles.ts";
import FormUpdateTeam from "./Components/FormUpdateTeam.tsx";
import { BiSolidEdit } from "react-icons/bi";
import { EditButton } from "../players/Components/FormPlayerButton.styled.ts";

const Wrapper = styled.div`
  padding: 20px;
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const AddTeamButton = styled.button`
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #45a049;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-weight: bold;
  text-align: center;
  margin: 20px 0;
`;

const LoadingMessage = styled.div`
  color: #555;
  text-align: center;
  margin: 20px 0;
`;

const TeamList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const TeamItem = styled.div`
  padding: 10px;
  width: 80%;
  background-color: #6cccac;
  border: 1px solid #227826;
  border-radius: 5px;
  text-align: left;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: #5fb099;
  }
`;

const TeamsList: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

  const {
    data: teams,
    isLoading,
    isError,
  } = useQuery<Team[]>({
    queryKey: ["teams"],
    queryFn: fetchTeams,
    staleTime: 5000,
    retry: 2,
  });

  const handleEditClick = (teamId: string) => {
    setShowUpdateForm(true);
    setSelectedTeamId(teamId);
  };

  return (
    <Wrapper>
      {showUpdateForm && selectedTeamId && (
        <FormUpdateTeam
          isOpen={showUpdateForm}
          setIsOpen={setShowUpdateForm}
          teamId={selectedTeamId}
        />
      )}
      <TopWrapper>
        <h1>Teams List</h1>
        <AddTeamButton onClick={() => setShowAddForm(true)}>
          Add Team
        </AddTeamButton>
      </TopWrapper>

      {showAddForm && (
        <FormAddTeams isOpen={showAddForm} setIsOpen={setShowAddForm} />
      )}

      {isLoading && <LoadingMessage>Loading teams...</LoadingMessage>}

      {isError && (
        <ErrorMessage>
          Failed to fetch teams. Please try again later.
        </ErrorMessage>
      )}

      {!isLoading && teams && teams.length === 0 && (
        <ErrorMessage>No teams found.</ErrorMessage>
      )}

      {teams && teams.length > 0 && (
        <TeamList>
          {teams.map((team) => (
            <TeamItem key={team.id}>
              <span>
                {team.name} - Founded: {team.foundedYear}, Location:{" "}
                {team.location}
              </span>
              <DivCenter>
                <EditButton onClick={() => handleEditClick(team.id)}>
                  Edit <BiSolidEdit />
                </EditButton>
                <DeleteTeamButton teamId={team.id} />
              </DivCenter>
            </TeamItem>
          ))}
        </TeamList>
      )}
    </Wrapper>
  );
};

export default TeamsList;
