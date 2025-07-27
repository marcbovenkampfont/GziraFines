import { useState } from "react";
import type { Player } from "../../shared/types/players.types";
import Select from "../Select/SelectCustom";
import { useNavigate } from "react-router-dom";
import { players } from "../../shared/constants/playersList";
import "./Login.scss"
import { APP_ROUTES } from "../../shared/constants/appRoutes";
import { useAuth } from "../../context/authContext";

export const Login: React.FC = () => {
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const [isDisableButton, setIsDisableButton] = useState<boolean>(true);
    const [password, setPassword] = useState<string>("")

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (option: Player | undefined): void => {
        if (option !== undefined) {
            setSelectedPlayer(option);

            if (option.role === "user") {
                setIsDisableButton(false);
            }

            setPassword("")
            
        } else {
            setSelectedPlayer(null);
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
            <Select
                options={players}
                onChangePlayer={handleChange}
            />
            {selectedPlayer && selectedPlayer.password !== undefined && 
                <input
                    id="password"
                    type="password"
                    style={{
                        border: "none",
                        borderBottom: "1px solid white",
                        outline: "none",
                        padding: "8px 0",
                        fontSize: "16px",
                        width: "100%",
                        marginTop: "20px",
                        color: "white",
                        backgroundColor: "#800000"
                    }}
                    value={password}
                    onChange={e => handleOnChangePassword(e.target.value)}
                    placeholder="Password"
                />
            }
            <button 
                // onClick={() => navigate(APP_ROUTES.resume)}
                onClick={handleClickLogin}
                disabled={isDisableButton}
                style={{marginTop: "40px"}}
            >
                Login
            </button>
        </div>
    )
}