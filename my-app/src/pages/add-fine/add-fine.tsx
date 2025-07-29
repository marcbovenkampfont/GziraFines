import React, { useState } from "react";
import Select from "../../components/Select/SelectCustom"
import { format } from "date-fns";
import { players } from "../../shared/constants/playersList";
import type { Player } from "../../shared/types/players.types";
import './add-fine.scss'
import type { Rule } from "../../shared/types/rules.types";
import { rulesList } from "../../shared/constants/rulesList";
import { useAppendMulta } from "../../../backend/sheet/useAppendMulta";
import type { Multa } from "../../../backend/types/readSheet.types";
import { getMoneyFromMulta } from "../../utils/multaCalculation";
import Banner, { type BannerType } from "../../components/Banner/Banner";
import { AnimatePresence } from "motion/react"

interface FormData {
  player: Player | undefined;
  rule: Rule | undefined;
  minsLate?: number;
  date: Date | null;
}

const AddInfractionForm: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    player: undefined,
    rule: undefined,
    minsLate: 0,
    date: null,
  });

  const { appendMulta } = useAppendMulta();

  const [submitted, setSubmitted] = useState(false);

  const [banner, setBanner] = useState<BannerType>({message: "", success: false})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (form.player && form.rule && form.date) {
      const multa: Multa = {
        player: form.player,
        rule: form.rule,
        date: form.date,
        minsLate: form.minsLate ?? 0,
        amount: getMoneyFromMulta(form.rule, form.minsLate), // calcular el amount de la multa aquí
        paid: false,
        rejected: false
      }
      const multaAdded = await appendMulta(multa);
      if(multaAdded) {
        setBanner({message: "Multa añadida correctamente", success: true});

        setForm({
          player: undefined,
          rule: undefined,
          minsLate: 0,
          date: null,
        });

        setSubmitted(false);

        setTimeout(() => setBanner({message: "", success: false}), 3000);
      } else {
        setBanner({message: "Error al añadir multa", success: false});
        setTimeout(() => setBanner({message: "", success: false}), 3000);
      }
    }
  };

  const isValid = form.player && form.date;

  return (
    <div className="add-fine">
        <form onSubmit={handleSubmit} className="add-fine-form">
          <div>
            <Select<Player>
                options={players}
                getOptionLabel={(player) => `${player.name} - #${player.number}`}
                getOptionValue={(player) => player.name}
                onChange={(player) => setForm({ ...form, player: player })}
                value={form.player}
                placeholder="Select a Player..."
            />
            {submitted && !form.player && <p className="text-red-500 text-sm">Campo obligatorio</p>}
          </div>

          <div>
            <Select<Rule>
                options={rulesList}
                getOptionLabel={(rule) => rule.shortName}
                getOptionValue={(rule) => rule.name}
                onChange={(rule) => setForm({ ...form, rule: rule})}
                value={form.rule}
                placeholder="Select the rule violated..."
            />
            {submitted && !form.rule && <p className="text-red-500 text-sm">Campo obligatorio</p>}
          </div>

          <div style={{width: '250px', display: 'flex', gap: '20px'}}>
            <label>Minuts late: </label>
            <input
              style={{width: '40px', textAlign: 'right'}}
              type="number"
              placeholder="Minutos (opcional)"
              value={form.minsLate || 0}
              onChange={(e) => setForm({ ...form, minsLate: parseInt(e.target.value) })}
            />
          </div>

          <div style={{width: '250px', display: 'flex', flexDirection: 'column', gap: '10px'}}>
            <label>Date of infraction</label>
            <input
                type="date"
                style={{width: '100%', height: '30px', textAlign: 'center'}}
                value={form.date ? format(form.date, "yyyy-MM-dd") : ""}
                onChange={(e) => {
                  const dateValue = e.target.value;
                  setForm({ ...form, date: dateValue ? new Date(dateValue) : null });
                }}
            />
            {submitted && !form.date && <p className="text-red-500 text-sm">Campo obligatorio</p>}
          </div>

          <button type="submit" disabled={!isValid} className="w-full">
            Añadir Infracción
          </button>
        </form>
        
        <AnimatePresence mode="wait">
          {banner.message && 
            <Banner key="banner" message={banner.message} success={banner.success} />
          }
        </AnimatePresence>
    </div>
  );
};

export default AddInfractionForm;
