import React from "react";

import { BiSolidEdit } from "react-icons/bi";
import { EditButton } from "../../players/Components/FormPlayerButton.styled.ts";

interface EditTeamButtonProps {
  teamId: string;
  onEdit: (teamId: string) => void;
}

const EditTeamButton: React.FC<EditTeamButtonProps> = ({ teamId, onEdit }) => {
  return (
    <EditButton onClick={() => onEdit(teamId)}>
      Edit <BiSolidEdit />
    </EditButton>
  );
};

export default EditTeamButton;
