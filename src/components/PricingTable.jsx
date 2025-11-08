import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function PricingTable({ onSelectPlan, user }) {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/plans`)
        if (!res.ok) throw new Error('Failed to load plans')
        const data = await res.json()
        setPlans(data)
      } catch (e) {
        setError(e.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <div className="text-center py-12">Loading plans…</div>
  if (error) return <div className="text-center text-red-600 py-12">{error}</div>

  return (
    <section id="pricing" className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold text-gray-900 text-center">Simple, transparent pricing</h2>
        <p className="text-gray-600 text-center mt-2">Pick a plan that grows with you.</p>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {plans.map((p) => (
            <div key={p.id} className={`rounded-xl border ${p.most_popular ? 'border-blue-600 shadow-blue-100 shadow-xl' : 'border-gray-200'} bg-white p-6 flex flex-col`}>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">{p.name}</h3>
                  {p.most_popular && (
                    <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2 py-1 rounded-full">Most popular</span>
                  )}
                </div>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">${p.price}</span>
                  <span className="text-gray-500">/mo</span>
                </div>
                <ul className="mt-6 space-y-2 text-sm text-gray-700">
                  {p.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-600" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => onSelectPlan(p)}
                className="mt-6 w-full rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5"
              >
                {user ? 'Continue to checkout' : 'Get started'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
