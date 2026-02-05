import {  createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { getMeAUth } from '../services/api/auth.api'
import { toast } from 'sonner'

interface MyRouterContext {
  auth: {
    user: { id: number } | null
  }
}


export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
  beforeLoad: async () => {
    try {
      const user = await getMeAUth();
      console.log(user, 'chedck user after auth');
      // console.log(user, 'chedck user after auth');
      
      return { auth: { user } };
    } catch (error : any) {
      console.log(error.response, 'chedck user after error');
      toast.error(error.response?.data?.message || 'Failed to retrieve user information');
      return { auth: { user: null } };
    }
  },
})