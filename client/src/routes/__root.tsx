import useGetUser from '@/api/hooks/useGetUser'
import { Link, createRootRoute, useNavigate } from '@tanstack/react-router'
import axios from 'axios'

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => {
    return (
      <div>
        <p>This is the notFoundComponent configured on root route</p>
        <Link to="/">Start Over</Link>
      </div>
    )
  },
})

function RootComponent() {
  const {user, isLoading, isError, error} = useGetUser()

  const navigate = useNavigate()

  console.log('isLoading', isLoading)


  if (isLoading) {
    return (
      <div>Loading user</div>
    )
  }

  console.log('isLoading', isLoading)

  if (isError) {
    if (axios.isAxiosError(error) && error.response) {
      const statusCode = error.response.status;

      if (statusCode === 404) {
        navigate({to: '/onboarding'})
      } 
    }
  } else {
    navigate({to: '/home'})
  }

  return (
    <>{user}</>
  )
}
