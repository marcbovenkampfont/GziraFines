import './FilterOption.scss'

export const Option = {
  unpaid: 'unpaid',
  paid: 'paid',
  rejected: 'rejected',
} as const

export type Option = typeof Option[keyof typeof Option]

type FilterOptionProps = {
    onClick: () => void,
    title: string,
    color: string,
    selected: boolean
}

const FilterOption: React.FC<FilterOptionProps> = ({ title, onClick, color, selected }) => {

    return (
        <div  
            className="option"
            style={{
            border: `0.5px solid ${color}`,
            color: selected ? '#800000' : color,
            backgroundColor: selected ? color : 'transparent'
            }}
            onClick={onClick}
        >
            {title}
        </div>
    );
}

export default FilterOption;