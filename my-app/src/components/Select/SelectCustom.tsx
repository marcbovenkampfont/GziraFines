import React from "react";
import "./SelectCustom.scss";
import type { Player } from "../../shared/types/players.types";
import { getPlayerFromName } from "../../utils/multaCalculation";

type SelectProps = {
  options: Player[];
  onChangePlayer: (player: Player | undefined) => void;
};



const Select: React.FC<SelectProps> = ({ options, onChangePlayer }) => {

  return (
    <select
      id="selector"
      className="custom-select"
      onChange={e => onChangePlayer && onChangePlayer(getPlayerFromName(e.target.value))}
      defaultValue=""
    >
      <option value="" disabled hidden>
        Selecciona un jugador...
      </option>

      {options.map((player, index) => (
        <option key={index} value={player.name}>
          {player.name} - #{player.number}
        </option>
      ))}
    </select>
  );
};

export default Select;
