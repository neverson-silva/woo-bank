import { create } from 'zustand'

type UseDashboardStoreType = {
  updateAll: boolean
  toggleUpdateAll: () => void
}

export const useDashboardStore = create<UseDashboardStoreType>((set, get) => ({
  updateAll: false,
  toggleUpdateAll: () => {
    set({
      updateAll: !get().updateAll,
    })
  },
}))
