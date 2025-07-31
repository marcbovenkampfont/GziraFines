import React, { useState } from "react";
import Select from "../../components/Select/SelectCustom"
import { format } from "date-fns";
import { players } from "../../shared/constants/playersList";
import { Role, type Player } from "../../shared/types/players.types";
import './add-fine.scss'
import type { Rule } from "../../shared/types/rules.types";
import { rulesList } from "../../shared/constants/rulesList";
import { useWriteMulta } from "../../../backend/sheet/useAppendMulta";
import Banner, { type BannerType } from "../../components/Banner/Banner";
import { AnimatePresence } from "motion/react"
import Page from "../../components/Page/Page";
import { getTitleName } from "../../utils/formats";
import ButtonCustom from "../../components/ButtonCustom/ButtonCustom";

interface FormData {
  player: Player[] | undefined;
  rule: Rule | undefined;
  minsLate?: number;
  date: Date | null;
}

const AddFine: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    player: undefined,
    rule: undefined,
    minsLate: 0,
    date: null,
  });

  const [isCreating, setIsCreating] = useState(false);

  const { appendMulta } = useWriteMulta();

  const [submitted, setSubmitted] = useState(false);

  const [banner, setBanner] = useState<BannerType>({message: "", success: false})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submit", form.player)
    setSubmitted(true);
    if (form.player && form.rule && form.date) {
      setIsCreating(true);
      const multaAdded = await appendMulta(form.rule, form.minsLate, form.date, form.player);
      setIsCreating(false);
      if(multaAdded) {
        setBanner({message: "Fine added correctly", success: true});

        setForm({
          player: undefined,
          rule: undefined,
          minsLate: 0,
          date: null,
        });

        setSubmitted(false);

        setTimeout(() => setBanner({message: "", success: false}), 3000);
      } else {
        setBanner({message: "Error trying to add a fine", success: false});
        setTimeout(() => setBanner({message: "", success: false}), 3000);
      }
    }
  };

  const isValid = form.player && form.date;

  return (
    <Page permissions={[Role.admin]}>
      <div className="add-fine">
          <form onSubmit={handleSubmit} className="add-fine-form">
            <div>
              <Select<Rule>
                options={rulesList}
                getOptionLabel={(rule) => rule.shortName}
                getOptionValue={(rule) => rule.name}
                onChange={(rule) => setForm({ ...form, rule: rule as Rule})}
                value={form.rule}
                placeholder="Select the rule violated..."
                disabled={isCreating}
                />
              {submitted && !form.rule && <p className="text-red-500 text-sm">Campo obligatorio</p>}
            </div>

            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <Select<Player>
                options={players}
                getOptionLabel={(player) => getTitleName(player, true)}
                getOptionValue={(player) => player.name}
                onChange={(player) => setForm({ ...form, player: player as Player[] })}
                value={form.player}
                placeholder="Select a Player..."
                disabled={isCreating}
                isMulti
                />
              {form.player !== undefined && (
                <p>{form.player.map(p => p.name).join(" - ") + "."}</p>
              )}
              
              {submitted && !form.player && <p className="text-red-500 text-sm">Campo obligatorio</p>}
            </div>

            <div style={{width: '250px', display: 'flex', gap: '20px'}}>
              <label>Minuts late: </label>
              <input
                style={{width: '40px', textAlign: 'right'}}
                type="number"
                placeholder="Minutos (opcional)"
                value={form.minsLate || 0}
                onChange={(e) => setForm({ ...form, minsLate: parseInt(e.target.value) })}
                disabled={isCreating}
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
                  disabled={isCreating}
                  />
              {submitted && !form.date && <p className="text-red-500 text-sm">Campo obligatorio</p>}
            </div>
            
            <ButtonCustom border={true} type="submit" disabled={!isValid || isCreating}>
              ADD FINE
            </ButtonCustom>
          </form>
          
          <AnimatePresence mode="wait">
            {banner.message && 
              <Banner key="banner" message={banner.message} success={banner.success} />
            }
          </AnimatePresence>
      </div>
    </Page>
  );
};

export default AddFine;
