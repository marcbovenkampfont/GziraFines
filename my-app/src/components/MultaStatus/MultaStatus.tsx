import React, { useEffect, useState } from "react";
import { MultaStatus } from "../../shared/types/multa.types";
import './MultaStatus.scss'
import { useIntl } from "react-intl";

interface Props {
  status: MultaStatus;
}

export const MultaStatusBadge: React.FC<Props> = ({ status }) => {
    const [label, setLabel] = useState<string>("");
    const [className, setClassName] = useState<string>("");

    const intl = useIntl();

    useEffect(() => {
        if (status === MultaStatus.REJECTED) {
            setLabel(intl.formatMessage({ id: "shared.status.deleted" }))
            setClassName("rejected")
        } else if (status === MultaStatus.PAID) {
            setLabel(intl.formatMessage({ id: "shared.status.paid" }))
            setClassName("paid")
        } else if (status === MultaStatus.NOT_PAID) {
            setLabel(intl.formatMessage({ id: "shared.status.unpaid" }))
            setClassName("not-paid")
        }
    }, [status])

    return (
        <span className={`badge ${className}`}>
            {label}
        </span>
    );
};
