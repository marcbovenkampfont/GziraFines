// Spinner.tsx
import './Loader.scss'
const Loader = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      // height: '100px',
    }}>
      <div className="spinner" />
    </div>
  )
}

export default Loader
