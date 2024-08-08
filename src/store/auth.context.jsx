import { createContext, useContext, useReducer } from 'react'

export const AuthContext = createContext({})

export const authActionTypes = {
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT',
}

const initialState = {
  isLoggedIn: false,
  userData: null,
}

const reducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case authActionTypes.SIGN_IN:
      return {
        ...state,
        isLoggedIn: true,
        userData: payload.userData,
      }
    case authActionTypes.SIGN_OUT:
      return { ...state, isLoggedIn: false, userData: null }
    default:
      return state
  }
}

export const useAuthActions = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return {
    state,
    handleSignIn: (payload) => {
      dispatch({
        type: authActionTypes.SIGN_IN,
        payload: {
          userData: payload.userData,
          accessUser: payload.accessUser,
        },
      })
    },
    handleSignOut: () => {
      dispatch({
        type: authActionTypes.SIGN_OUT,
      })
    },
  }
}

export const AuthProvider = ({ children }) => {
  const actions = useAuthActions()

  return (
    <AuthContext.Provider value={{ ...actions }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthStore = () => useContext(AuthContext)
