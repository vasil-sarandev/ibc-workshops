import { User } from '@models'
import { NextRouter } from 'next/router'
import { User as AuthUser } from '@auth0/auth0-spa-js'
import { STATIC_ROUTES } from '@util'

export const redirectUser = (user: User, authUser: AuthUser, router: NextRouter) => {
  if (authUser.email === 'ibc.admin@ibc-sofia.org') {
    router.push(STATIC_ROUTES.admin.href)
  } else {
    if (user) router.push(STATIC_ROUTES.account.href)
    else router.push(STATIC_ROUTES.userDetails.href)
  }
}
