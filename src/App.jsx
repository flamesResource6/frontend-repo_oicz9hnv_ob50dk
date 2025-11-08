import { useState } from 'react'
import Navbar from './components/Navbar'
import PricingTable from './components/PricingTable'
import Checkout from './components/Checkout'
import Testimonials from './components/Testimonials'

const MOCK_USER = null // Replace with Clerk user after auth integration

function App() {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [user] = useState(MOCK_USER)

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4">
        <section className="py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            Pricing that scales with you
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Choose a plan, checkout securely, and get instant access. Upgrade or cancel anytime.
          </p>
        </section>

        {!selectedPlan && (
          <PricingTable onSelectPlan={setSelectedPlan} user={user} />
        )}

        {selectedPlan && (
          <Checkout
            plan={selectedPlan}
            user={user}
            onBack={() => setSelectedPlan(null)}
            onCompleted={() => setSelectedPlan(null)}
          />
        )}

        <Testimonials />
      </main>

      <footer className="py-10 text-center text-sm text-gray-600">
        © {new Date().getFullYear()} FlamesBlue. All rights reserved.
      </footer>
    </div>
  )
}

export default App
