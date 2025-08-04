import React, { useEffect, useState } from "react";
import { MultaStatus } from "../../shared/types/multa.types";
import './MultaStatus.scss'

interface Props {
  status: MultaStatus;
}

export const MultaStatusBadge: React.FC<Props> = ({ status }) => {
    const [label, setLabel] = useState<string>("");
    const [className, setClassName] = useState<string>("");

    useEffect(() => {
        if (status === MultaStatus.REJECTED) {
            setLabel("REJECTED")
            setClassName("rejected")
        } else if (status === MultaStatus.PAID) {
            setLabel("PAID")
            setClassName("paid")
        } else if (status === MultaStatus.NOT_PAID) {
            setLabel("NOT PAID")
            setClassName("not-paid")
        }
    }, [status])

        {/* <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status]}`}> */}
    return (
        <span className={`badge ${className}`}>
            {label}
        </span>
    );
};
