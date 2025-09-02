// Spinner.tsx
import './Loader.scss'

type LoaderProps = {
  size?: "extra-small" | "small" | "medium" | "large"
}

const Loader: React.FC<LoaderProps> = ({ size = "medium" }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 'auto'
    }}>
      <div className={`spinner spinner-${size}`} />
    </div>
  )
}

export default Loader
