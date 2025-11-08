export default function Testimonials(){
  const items = [
    { name: 'Maya', role: 'Founder', quote: 'The pricing is fair and the value is incredible. We upgraded to Pro and never looked back.' },
    { name: 'Liam', role: 'Engineer', quote: 'Setup took minutes and billing just works. Exactly what we needed.' },
    { name: 'Ava', role: 'Designer', quote: 'Beautiful UI and clear plans. The Business tier support is unmatched.' },
  ]
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold text-gray-900 text-center">Loved by modern teams</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {items.map((it, i) => (
            <figure key={i} className="rounded-xl border border-gray-200 bg-white p-6">
              <blockquote className="text-gray-700">“{it.quote}”</blockquote>
              <figcaption className="mt-4 text-sm text-gray-600">
                <span className="font-medium text-gray-900">{it.name}</span> · {it.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
