import React, { useEffect, useState } from "react";
import { MultaStatus } from "../../shared/types/multa.types";
import './MultaStatus.scss'

interface Props {
  status: MultaStatus;
}

// const statusStyles: Record<MultaStatus, string> = {
//   "PAGADO": "bg-green-100 text-green-700",
//   "NO PAGADO": "bg-yellow-100 text-yellow-700",
//   "REJECTED": "bg-red-100 text-red-700",
// };

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
