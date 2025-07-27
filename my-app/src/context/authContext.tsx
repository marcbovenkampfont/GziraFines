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
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const login = (newPlayer: Player) => {
    setPlayer(newPlayer)
    setIsAdmin(newPlayer.role === Role.admin ? true : false);
    localStorage.setItem('player', JSON.stringify(newPlayer))
  }

  const logout = () => {
    setPlayer(null)
    setIsAdmin(false)
    localStorage.removeItem('player')
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
