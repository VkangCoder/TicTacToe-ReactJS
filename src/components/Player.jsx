import { useState } from "react";
export default function Player({
    initialName,
    symbol,
    isActive,
    onChangeName,
}) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing((editing) => !editing);

        if (isEditing) {
            onChangeName(symbol, playerName);
        }
    };

    const handleChange = (event) => {
        setPlayerName(event.target.value);
    };

    let editableName; // Correct the variable name here
    if (isEditing) {
        editableName = (
            <input
                type="text"
                required
                value={playerName}
                placeholder="Enter name"
                onChange={handleChange}
            />
        );
    } else {
        editableName = <span className="player-name">{playerName}</span>;
    }

    return (
        <li className={isActive ? "active" : ""}>
            <span className="player">
                {editableName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>
                {isEditing ? "Save" : "Edit"}
            </button>
        </li>
    );
}
