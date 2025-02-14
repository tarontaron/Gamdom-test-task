import { create } from 'zustand';
import cookies from 'js-cookie';
import type { TUser } from '~/types/user';
import api from '~/services/api';
import { tokenKey } from '~/constants/cookies';

type TStoreState = {
  user: TUser | null;
  isLoading: boolean;
};

type TStoreActions = {
  init: () => void;
  logout: () => void;
  login: (token: string) => void;
};

type TStore = TStoreState & TStoreActions;

export const useAuthStore = create<TStore>()((set) => ({
  user: null,
  isLoading: false,
  init: async () => {
    set({ isLoading: true });

    const token = cookies.get(tokenKey);
    if (token) {
      const { data } = await api.user.getMe();

      set({ user: data, isLoading: false });
    }

    set({ isLoading: false });
  },
  login: async (token) => {
    cookies.set(tokenKey, token);
    const { data } = await api.user.getMe();

    set({ user: data });
  },
  logout: () => {
    cookies.remove(tokenKey);

    return set({ user: null });
  },
}));
