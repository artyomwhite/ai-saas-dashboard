import Topbar from "@/components/Topbar";
import Button from "@/components/Button";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for exploring the platform",
    features: [
      "50 AI messages / month",
      "Basic dashboard",
      "7-day chat history",
      "Community support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    description: "For growing SaaS teams",
    features: [
      "Unlimited AI messages",
      "Full analytics dashboard",
      "Unlimited chat history",
      "Priority AI responses",
      "Email support",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations",
    features: [
      "Everything in Pro",
      "Custom AI models",
      "SSO & SAML",
      "Dedicated support",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <>
      <Topbar title="Pricing" subtitle="Choose the plan that fits your team" />
      <main className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-50">
              Simple, transparent pricing
            </h2>
            <p className="mt-3 text-[15px] text-zinc-400">
              Start free, upgrade when you&apos;re ready. No hidden fees.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-200 ${
                  plan.highlighted
                    ? "border-violet-500/50 bg-gradient-to-b from-violet-500/10 to-zinc-900/40 shadow-xl shadow-violet-600/10"
                    : "border-zinc-800/80 bg-zinc-900/30 shadow-sm hover:border-zinc-700/80 hover:shadow-md hover:shadow-black/20"
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-violet-600 px-3 py-1 text-[11px] font-semibold tracking-wide text-white uppercase shadow-lg shadow-violet-600/30">
                    Most Popular
                  </span>
                )}

                <h3 className="text-lg font-semibold text-zinc-100">{plan.name}</h3>
                <p className="mt-1 text-[13px] text-zinc-500">{plan.description}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight text-zinc-50">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-[13px] text-zinc-500">{plan.period}</span>
                  )}
                </div>

                <ul className="mt-8 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-[13px] text-zinc-300">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  href="/dashboard"
                  variant={plan.highlighted ? "primary" : "secondary"}
                  className="mt-8 w-full"
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
