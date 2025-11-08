import { useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Checkout({ plan, user, onBack, onCompleted }) {
  const [email, setEmail] = useState(user?.email || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const startCheckout = async () => {
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      const res = await fetch(`${API_BASE}/api/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan_id: plan.id, email, user_id: user?.id || null })
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        throw new Error(d.detail || 'Checkout failed')
      }
      const data = await res.json()
      setSuccess(`Success! Subscription activated. ID: ${data.subscription_id}`)
      onCompleted?.(data)
    } catch (e) {
      setError(e.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-10">
      <div className="mx-auto max-w-md bg-white border border-gray-200 rounded-xl p-6">
        <button onClick={onBack} className="text-sm text-gray-600 hover:text-gray-900">← Back to plans</button>

        <h3 className="text-2xl font-semibold text-gray-900 mt-2">Checkout</h3>
        <p className="text-gray-600">You're getting the <span className="font-medium text-gray-900">{plan.name}</span> plan for ${plan.price}/mo.</p>

        <div className="mt-4 space-y-2">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            placeholder="you@example.com"
          />
        </div>

        <button
          onClick={startCheckout}
          disabled={loading || !email}
          className="mt-6 w-full rounded-md bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-medium py-2.5"
        >
          {loading ? 'Processing…' : 'Confirm and pay'}
        </button>

        {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
        {success && <p className="text-sm text-green-700 mt-3">{success}</p>}
      </div>
    </section>
  )
}
