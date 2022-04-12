import * as React from 'react'
import { useRouter } from 'next/router'
import { useCart } from 'react-use-cart'

import getOrderBySessionId from '@/lib/get-order-session-id'

function SuccessPage() {
  const router = useRouter()
  const [loading, setLoading] = React.useState(true)
  const [order, setOrder] = React.useState(null)
  const { emptyCart } = useCart()

  React.useEffect(() => {
    const fetchOrder = async () => {
      const { order } = await getOrderBySessionId({ id: router.query.id })

      setLoading(false)
      setOrder(order)
      emptyCart()
    }

    if (router.query.id) fetchOrder()
  }, [router.query.id])

  if (loading) return 'loading'

  return order ? <pre>{JSON.stringify(order, null, 2)}</pre> : 'none'
}

export default SuccessPage
