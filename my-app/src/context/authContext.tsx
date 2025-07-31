import { createContext, useContext, useState } from 'react'
import { Role, type Player } from '../shared/types/players.types'

type AuthContextType = {
  player: Player | null
  login: (player: Player) => void
  logout: () => void
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [player, setPlayer] = useState<Player | null>(() => {
    const stored = localStorage.getItem('player');
    return stored ? JSON.parse(stored) : null
  })
  
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    const stored = localStorage.getItem('isAdmin');
    return stored ? JSON.parse(stored) : null;
  })

  const login = (newPlayer: Player) => {
    setPlayer(newPlayer)
    const isAdmin = newPlayer.role.includes(Role.admin)
    setIsAdmin(isAdmin);
    localStorage.setItem('player', JSON.stringify(newPlayer))
    localStorage.setItem('isAdmin', JSON.stringify(isAdmin))
  }

  const logout = () => {
    setPlayer(null)
    setIsAdmin(false)
    localStorage.removeItem('player')
    localStorage.removeItem('isAdmin')
  }

  return (
    <AuthContext.Provider value={{ player, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return context
}
