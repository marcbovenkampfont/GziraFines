import { useState } from "react";
import { PersonRole, Role, type Player } from "../../shared/types/players.types";
import Select from "../Select/SelectCustom";
import { players } from "../../shared/constants/playersList";
import "./Login.scss"
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../shared/constants/appRoutes";
import ButtonCustom from "../ButtonCustom/ButtonCustom";

export const Login: React.FC = () => {
    const [selectedPlayer, setSelectedPlayer] = useState<Player | undefined>(undefined);
    const [isDisableButton, setIsDisableButton] = useState<boolean>(true);
    const [password, setPassword] = useState<string>("")

    const { login } = useAuth();

    const navigate = useNavigate();

    const handleChange = (option: Player | Player[] | undefined): void => {
        if (option !== undefined && !Array.isArray(option)) {
            setSelectedPlayer(option);
            console.log("PLAYER", option)
            if (option.role.includes(Role.user)) {
                setIsDisableButton(false);
            } else {
                setIsDisableButton(true);
            }

            setPassword("")
            
        } else {
            setSelectedPlayer(undefined);
            setIsDisableButton(true);
        }
    }

    const handleOnChangePassword = (value: string) => {
        setIsDisableButton(!(selectedPlayer?.password === value))
        setPassword(value)
    }

    const handleClickLogin = () =>  {
        login(selectedPlayer as Player)
        navigate(APP_ROUTES.resume)
    }

    return (
        <div className="login-container">
            Who are you?
            <Select<Player>
                options={players}
                getOptionLabel={(player) => player.personRole === PersonRole.player ? `${player.name} - #${player.number}` : `${player.name}`}
                getOptionValue={(player) => player.name}
                onChange={handleChange}
                value={selectedPlayer}
                placeholder="Select yourself..."
            />
            {selectedPlayer && selectedPlayer.role.includes(Role.admin) && selectedPlayer.password !== undefined && 
                <input
                    id="password"
                    type="password"
                    style={{
                        border: "none",
                        borderBottom: "1px solid white",
                        outline: "none",
                        padding: "8px 0",
                        fontSize: "16px",
                        width: "200px",
                        marginTop: "20px",
                        color: "white",
                        backgroundColor: "#800000"
                    }}
                    value={password}
                    onChange={e => handleOnChangePassword(e.target.value)}
                    placeholder="PASSWORD"
                />
            }
            <ButtonCustom border={true} onClick={handleClickLogin} disabled={isDisableButton} >
                LOGIN
            </ButtonCustom>
        </div>
    )
}