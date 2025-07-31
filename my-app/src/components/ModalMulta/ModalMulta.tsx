import './ModalMulta.scss'
import { useRightMenu } from '../../utils/menuContext.tsx'
import type { Multa } from '../../../backend/types/readSheet.types.ts'
import ButtonCustom from '../ButtonCustom/ButtonCustom.tsx'
import { dateFullFormat, moneyFormat } from '../../utils/formats.ts'
import { useWriteMulta } from '../../../backend/sheet/useAppendMulta.ts'
import { useAuth } from '../../context/authContext.tsx'
import { MultaStatus } from '../../shared/types/multa.types.ts'
import { MultaStatusBadge } from '../MultaStatus/MultaStatus.tsx'
import { useState } from 'react'
import Banner, { type BannerType } from "../../components/Banner/Banner";
import { AnimatePresence } from "motion/react"

export const ModalMultaType = {
  MULTA_RESUME: "resume",
  MULTA_UPDATE: "update",
} as const 
export type ModalMultaType = typeof ModalMultaType[keyof typeof ModalMultaType]

interface ModalMultaProps {
  type?: ModalMultaType
  buttons: {label: string, onClick: () => void}[]
}

const ModalMulta: React.FC<ModalMultaProps> = ({ type = ModalMultaType.MULTA_RESUME }) => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false)
  const { closeRightMenu, rightMenuData } = useRightMenu();

  const { updateMulta } = useWriteMulta();

  const { player } = useAuth();
  const [banner, setBanner] = useState<BannerType>({message: "", success: false})

  const multa: Multa = rightMenuData
  if (!multa) {
    return <p>Nada</p>
  }

  const getStatusMulta = (multa: Multa): MultaStatus => {
    return multa.rejected
      ? MultaStatus.REJECTED
      : multa.paid
        ? MultaStatus.PAID
        : MultaStatus.NOT_PAID
  }

  const getMultaContainer = (): React.ReactNode => {
    const multaStatus = getStatusMulta(multa);
    if (multaStatus === MultaStatus.REJECTED) {
      return <MultaStatusBadge status={multaStatus} />
    }
    if (multaStatus === MultaStatus.PAID) {
      return <>
        <MultaStatusBadge status={multaStatus} />
        <div style={{width: '100%', display: 'flex', flexDirection: 'column', gap: '10px'}}>
          <p style={{padding: '0', margin: '0'}}>PAID TO {multa.paidTo?.name}</p>
          <p style={{padding: '0', margin: '0'}}>PAID ON {multa.paidOn && dateFullFormat(multa.paidOn)}</p>
        </div>
      </>
    }
    return (
      <MultaStatusBadge status={multaStatus} />
    )
  }

  const handleUpdateMulta = async (type: "paid" | "rejected") => {
    const multaToUpdate: Multa = {
      id: multa.id,
      amount: multa.amount,
      date: multa.date,
      minsLate: multa.minsLate,
      paid: multa.paid,
      paidOn: multa.paidOn,
      paidTo: multa.paidTo,
      player: multa.player,
      rejected: multa.rejected,
      rule: multa.rule
    };
    if(type === "paid") {
      multaToUpdate.paid = true;
      multaToUpdate.paidTo = player ?? undefined;
      multaToUpdate.paidOn = new Date();
      setIsUpdating(true)
      const multaUpdated = await updateMulta(multaToUpdate)
      setBanner({message: multaUpdated ? "FINE PAID" : "ERROR UPDATING THE FINE", success: multaUpdated})
      setTimeout(() => setBanner({message: "", success: false}), 3000);
      console.log("Multa updated", multaUpdated)
      setIsUpdating(false)
      if (multaUpdated) {
        multa.paid = true;
        multa.paidTo = player ?? undefined;
        multa.paidOn = new Date();
      }

    } else if(type === "rejected") {
      multaToUpdate.rejected = true
      setIsUpdating(true)
      const multaUpdated = await updateMulta(multaToUpdate)
      setBanner({message: multaUpdated ? "FINE REJECTED" : "ERROR UPDATING THE FINE", success: multaUpdated})
      setTimeout(() => setBanner({message: "", success: false}), 3000);
      setIsUpdating(false)

      if (multaUpdated) {
        multa.rejected = true
      }
      
    }
  }

  return (
    <div className='modal-multa'>
        <div className='modal-multa-header'>
            <h3 style={{fontWeight: 500}}>FINE</h3>
            <ButtonCustom onClick={closeRightMenu}>
                X
            </ButtonCustom>

        </div>
        {multa &&
            <div className='modal-multa-info'>
              <h3>TOTAL TO PAY: {multa.amount}</h3>
              <h3>Rule violated</h3>
              <p>{multa.rule.name}</p>
              <p>Base cost {moneyFormat(multa.rule.cost)} {multa.rule.multiplication && `multiplicated every ${multa.rule.multiplication}'`}</p>
              <p>On {dateFullFormat(multa.date)}</p>

              <h3>By</h3>
              <p>{multa.player.name}</p>

              <div className="modal-multa-info-status">
                <h3>Status</h3>
                {getMultaContainer()}
              </div>

            </div>
        }

        {type === ModalMultaType.MULTA_UPDATE &&
          <div className='modal-multa-buttons'>
              {getStatusMulta(multa) === MultaStatus.NOT_PAID && 
                <ButtonCustom disabled={isUpdating} border={true} onClick={() => handleUpdateMulta("paid")}>
                  PAY
                </ButtonCustom>}
              {getStatusMulta(multa) === MultaStatus.NOT_PAID && 
                <ButtonCustom disabled={isUpdating} border={true} onClick={() => handleUpdateMulta("rejected")}>
                  REJECT
                </ButtonCustom>}
          </div>
        }

        <AnimatePresence mode="wait">
            {banner.message && 
              <Banner key="banner" message={banner.message} success={banner.success} />
            }
          </AnimatePresence>
    </div>
  )
}

export default ModalMulta;