import {create} from 'zustand';
import { persist } from 'zustand/middleware';
import { loginUser,logoutUser } from '../api/auth';

export const useAuthStore = create(
    persist(
        (set,get)=>({
            user: null,
            role: null,
            isLoading: true,
            loginUser: async (email, password) => {
                set({ isLoading: true });
                try {
                    const response = await loginUser(email, password);
                    set({ user: response.user,
                         role: response.isAdmin ? 'admin' : 'customer', isLoading: false });
                    return response;
                } catch (error) {
                    set({ isLoading: false });
                    console.error('Login failed:', error);
                    throw error;
                }
            },
            
            login: (user, role) =>{ console.log({user,role});set({user, role})},
            logout: async () => {
                try {
                    await logoutUser();
                } catch (error) {
                    console.error('Logout API error:', error);
                    // Clear local state even if API call fails
                } finally {
                    set({user: null, role: null,isLoading: false });
                }
            },
            checkAuth: async () =>{
                set({ isLoading: true });
                try{

                }
                catch(error){
                    console.error('Auth check failed:', error);
                    set({user: null,role:null, isLoading: false });
                }
            },
            setRole: (role) => set({role}),
            isAdmin: (state) => get().role === 'admin',
        }),
        {
            name: 'auth-store',
            partialize: (state) => ({ user: state.user, role: state.role })
        }
    )
)