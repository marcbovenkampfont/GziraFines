import { useState } from "react";
import { PersonRole,  type Player,} from "../../shared/types/players.types";
import Select from "../Select/SelectCustom";
import { players } from "../../shared/constants/playersList";
import "./Login.scss"
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../shared/constants/appRoutes";
import ButtonCustom from "../ButtonCustom/ButtonCustom";
import { FormattedMessage } from "react-intl";

export const Login: React.FC = () => {
    const [selectedPlayer, setSelectedPlayer] = useState<Player | undefined>(undefined);
    const [isDisableButton, setIsDisableButton] = useState<boolean>(true);
    const [password, setPassword] = useState<string>("")

    const { login } = useAuth();

    const navigate = useNavigate();

    const handleChange = (option: Player | Player[] | undefined): void => {
        if (option !== undefined && !Array.isArray(option)) {
            setSelectedPlayer(option);

            if (option.role.includes("USER")) {
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
            <FormattedMessage id="login.who-are-you" />
            <Select<Player>
                options={players}
                getOptionLabel={(player) => player.personRole === PersonRole.player ? `${player.name} - #${player.number}` : `${player.name}`}
                getOptionValue={(player) => player.name}
                onChange={handleChange}
                value={selectedPlayer}
                placeholder={<FormattedMessage id="login.choose-yourself" />}
            />
            {selectedPlayer && selectedPlayer.role.some((r) => ["ADMIN", "MODERATOR"].includes(r)) &&
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={e => handleOnChangePassword(e.target.value)}
                    placeholder="PASSWORD"
                    />
            }
            <ButtonCustom border={true} onClick={handleClickLogin} disabled={isDisableButton} >
                <FormattedMessage id="login.login" />
            </ButtonCustom>
        </div>
    )
}