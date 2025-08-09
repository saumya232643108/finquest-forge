import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

export default function Trade() {
  useEffect(() => { document.title = "Finquest — Trade"; }, []);

  const data = useMemo(() => Array.from({ length: 40 }).map((_, i) => ({ t: i, p: 100 + Math.sin(i / 4) * 8 + Math.random() * 3 })), []);

  const [side, setSide] = useState<'BUY' | 'SELL'>('BUY');
  const [price, setPrice] = useState("103.25");
  const [qty, setQty] = useState("10");

  const submit = () => {
    if (!price || !qty) return toast("Enter price and quantity");
    const sign = side === 'BUY' ? '+' : '-';
    toast.success(`${side} ${qty} @ ${price} submitted`);
  };

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => { if (e.key === 'Enter') submit(); };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <section className="lg:col-span-2 glass p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold">AAPL • 1D</h2>
          <p className="text-sm text-muted-foreground">Simulated data</p>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="priceFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={`hsl(var(--brand-emerald))`} stopOpacity={0.5} />
                  <stop offset="100%" stopColor={`hsl(var(--brand-emerald))`} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="t" hide />
              <YAxis hide domain={[80, 120]} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} labelStyle={{ color: 'hsl(var(--muted-foreground))' }} />
              <Area type="monotone" dataKey="p" stroke={`hsl(var(--brand-emerald))`} fill="url(#priceFill)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="glass p-4 space-y-4">
        <div className="flex gap-2">
          <button onClick={() => setSide('BUY')} className={`ripple-btn flex-1 rounded-lg px-3 py-2 ${side==='BUY' ? 'bg-primary text-primary-foreground glow-ring' : 'border'}`}>Buy</button>
          <button onClick={() => setSide('SELL')} className={`ripple-btn flex-1 rounded-lg px-3 py-2 ${side==='SELL' ? 'bg-destructive text-destructive-foreground glow-ring' : 'border'}`}>Sell</button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <label className="text-sm">Price
            <input value={price} onChange={(e)=>setPrice(e.target.value)} onKeyDown={onEnter} className="mt-1 w-full glass px-3 py-2 rounded-lg focus-visible:ring-2 focus-visible:ring-ring" />
          </label>
          <label className="text-sm">Quantity
            <input value={qty} onChange={(e)=>setQty(e.target.value)} onKeyDown={onEnter} className="mt-1 w-full glass px-3 py-2 rounded-lg focus-visible:ring-2 focus-visible:ring-ring" />
          </label>
        </div>
        <div className="flex gap-2">
          <button onClick={submit} className="ripple-btn flex-1 rounded-lg px-4 py-2 bg-secondary text-secondary-foreground">Place {side}</button>
        </div>
        <p className="text-xs text-muted-foreground">Press Enter in inputs to submit.</p>
      </section>

      <section className="lg:col-span-3 glass p-4">
        <h3 className="font-semibold mb-2">Recent Trades</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-sm text-muted-foreground">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="glass px-3 py-2 rounded">AAPL {100 + i}.00 • {i%2?'+':'-'}{(Math.random()*2).toFixed(2)}%</div>
          ))}
        </div>
      </section>
    </div>
  );
}
