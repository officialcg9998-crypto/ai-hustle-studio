import { useState } from "react";
const TOOLS = [
{
id: "product-desc",
icon: " ",
label: "Product Descriptions",
tag: "eCommerce",
pitch: "Sell on Etsy, Amazon, or Shopify? Generate SEO-optimized listings in seconds.",
placeholder: "Describe your product (e.g. handmade lavender soy candle, 8oz, cotton wick)
systemPrompt: `You are an expert eCommerce copywriter. Generate a compelling, SEO-optimiz
userPrompt: (input) => `Write a product description for: ${input}`,
},
{
id: "cold-email",
icon: " ",
label: "Cold Email Writer",
tag: "Freelancing",
pitch: "Win clients on autopilot. Generate personalized cold emails that actually get rep
placeholder: "Describe your service and target client (e.g. I do web design for local res
systemPrompt: `You are a cold email expert who writes short, punchy outreach emails with
userPrompt: (input) => `Write a cold email for this freelancer: ${input}`,
},
{
id: "youtube-hook",
icon: " ",
label: "YouTube Hook Generator",
tag: "Creator Economy",
pitch: "The first 30 seconds make or break a video. Generate viral hooks for any topic.",
placeholder: "Enter your video topic (e.g. how I made $5k in one month flipping furniture
systemPrompt: `You are a YouTube growth strategist who specializes in hooks. Generate 5 d
userPrompt: (input) => `Generate YouTube hooks for this video: ${input}`,
},
{
id: "niche-ideas",
icon: " ",
label: "Niche Business Finder",
tag: "Entrepreneurship",
pitch: "Discover untapped micro-niches you can monetize in 30 days or less.",
placeholder: "Enter your skills or interests (e.g. I like fitness and I know Excel)",
systemPrompt: `You are a serial entrepreneur and niche business expert. Generate 5 userPrompt: (input) => `Generate niche business ideas for someone with these skills/inter
specif
},
{
id: "social-bio",
icon: " ",
label: "Social Media Bio",
tag: "Personal Brand",
pitch: "Your bio is your storefront. Make it magnetic and convert visitors to followers."
placeholder: "Tell me about yourself (e.g. fitness coach helping busy moms lose weight wi
systemPrompt: `You are a personal branding expert. Write 3 versions of a social media bio
userPrompt: (input) => `Write social media bios for: ${input}`,
},
{
id: "pricing",
icon: " ",
label: "Freelance Pricing Advisor",
tag: "Freelancing",
pitch: "Stop undercharging. Get a custom pricing strategy for your exact service.",
placeholder: "Describe your freelance service (e.g. I write blog posts for SaaS companies
systemPrompt: `You are a freelance business consultant. Provide a detailed pricing userPrompt: (input) => `Create a pricing strategy for this freelance service: ${input}`,
strate
},
];
const TAG_COLORS = {
"eCommerce": "#f59e0b",
"Freelancing": "#10b981",
"Creator Economy": "#ef4444",
"Entrepreneurship": "#8b5cf6",
"Personal Brand": "#3b82f6",
};
export default function App() {
const [selected, setSelected] = useState(null);
const [input, setInput] = useState("");
const [output, setOutput] = useState("");
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const handleGenerate = async () => {
if (!input.trim()) return;
setLoading(true);
setOutput("");
setError("");
try {
const response = await fetch("https://api.anthropic.com/v1/messages", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
model: "claude-sonnet-4-20250514",
max_tokens: 1000,
system: selected.systemPrompt,
messages: [{ role: "user", content: selected.userPrompt(input) }],
}),
});
const data = await response.json();
const text = data.content?.map(b => b.text || "").join("\n") || "No response.";
setOutput(text);
} catch (e) {
setError("Something went wrong. Please try again.");
} finally {
setLoading(false);
}
};
const handleBack = () => {
setSelected(null);
setInput("");
setOutput("");
setError("");
};
return (
<div style={{
minHeight: "100vh",
background: "#0a0a0f",
fontFamily: "'Georgia', 'Times New Roman', serif",
color: "#e8e4d9",
padding: "0",
}}>
{/* Header */}
<div style={{
borderBottom: "1px solid #1e1e2e",
padding: "28px 40px",
display: "flex",
alignItems: "center",
justifyContent: "space-between",
background: "linear-gradient(180deg, #0d0d18 0%, #0a0a0f 100%)",
}}>
<div style={{ display: "flex", alignItems: "center", gap: 14 }}>
<div style={{
width: 36, height: 36, borderRadius: 8,
background: "linear-gradient(135deg, #f59e0b, #ef4444)",
display: "flex", alignItems: "center", justifyContent: "center",
fontSize: 18, fontWeight: "bold",
}}>$</div>
<div>
<div style={{ fontSize: 18, fontWeight: "bold", letterSpacing: "0.05em", color: "
AI HUSTLE STUDIO
</div>
<div style={{ fontSize: 11, color: "#666", letterSpacing: "0.12em", textTransform
6 Income Tools · Powered by Claude
</div>
</div>
</div>
<div style={{
fontSize: 11, color: "#f59e0b", letterSpacing: "0.1em",
textTransform: "uppercase", border: "1px solid #f59e0b33",
padding: "4px 12px", borderRadius: 20,
}}>
Free to use
</div>
</div>
{!selected ? (
// Tool Grid
<div style={{ maxWidth: 900, margin: "0 auto", padding: "50px 24px" }}>
<div style={{ textAlign: "center", marginBottom: 52 }}>
<h1 style={{
fontSize: "clamp(32px, 5vw, 52px)",
fontWeight: "normal",
color: "#fff",
lineHeight: 1.2,
marginBottom: 16,
}}>
Your AI-powered<br />
<span style={{
background: "linear-gradient(90deg, #f59e0b, #ef4444)",
WebkitBackgroundClip: "text",
WebkitTextFillColor: "transparent",
}}>income machine</span>
</h1>
<p style={{ color: "#888", fontSize: 16, maxWidth: 480, margin: "0 auto", lineHei
Six tools built to save time, win clients, and grow revenue.
Pick one and start generating.
</p>
</div>
<div style={{
display: "grid",
gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
gap: 20,
}}>
{TOOLS.map(tool => (
<div
key={tool.id}
onClick={() => setSelected(tool)}
style={{
background: "#111118",
border: "1px solid #1e1e2e",
borderRadius: 16,
padding: "28px 24px",
cursor: "pointer",
transition: "all 0.2s",
position: "relative",
overflow: "hidden",
}}
onMouseEnter={e => {
e.currentTarget.style.border = "1px solid #f59e0b55";
e.currentTarget.style.transform = "translateY(-3px)";
e.currentTarget.style.background = "#13131c";
}}
onMouseLeave={e => {
e.currentTarget.style.border = "1px solid #1e1e2e";
e.currentTarget.style.transform = "translateY(0)";
e.currentTarget.style.background = "#111118";
}}
>
<div style={{ fontSize: 32, marginBottom: 14 }}>{tool.icon}</div>
<div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10
<div style={{
fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em",
color: TAG_COLORS[tool.tag] || "#888",
background: `${TAG_COLORS[tool.tag]}18` || "#88888818",
padding: "2px 8px", borderRadius: 20,
border: `1px solid ${TAG_COLORS[tool.tag]}33`,
}}>{tool.tag}</div>
</div>
<div style={{ fontSize: 17, fontWeight: "bold", color: "#fff", marginBottom:
{tool.label}
</div>
<p style={{ color: "#777", fontSize: 13, lineHeight: 1.6, margin: 0 }}>
{tool.pitch}
</p>
<div style={{
position: "absolute", bottom: 20, right: 20,
color: "#f59e0b", fontSize: 18, opacity: 0.5,
}}>→</div>
</div>
))}
</div>
</div>
) : (
// Tool Interface
<div style={{ maxWidth: 760, margin: "0 auto", padding: "44px 24px" }}>
<button
onClick={handleBack}
style={{
background: "none", border: "none", color: "#666",
fontSize: 13, cursor: "pointer", padding: 0,
marginBottom: 28, letterSpacing: "0.05em",
display: "flex", alignItems: "center", gap: 6,
}}
>
← Back to tools
</button>
<div style={{
background: "#111118", border: "1px solid #1e1e2e",
borderRadius: 20, padding: "36px 32px", marginBottom: 24,
}}>
<div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
<span style={{ fontSize: 36 }}>{selected.icon}</span>
<div>
<div style={{
fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em",
color: TAG_COLORS[selected.tag] || "#888", marginBottom: 4,
}}>{selected.tag}</div>
<h2 style={{ margin: 0, fontSize: 24, color: "#fff", fontWeight: "bold" }}>
{selected.label}
</h2>
</div>
</div>
<p style={{ color: "#777", fontSize: 14, lineHeight: 1.6, marginBottom: 28 {selected.pitch}
</p>
}}>
<div style={{ marginBottom: 16 }}>
<label style={{
display: "block", fontSize: 11, textTransform: "uppercase",
letterSpacing: "0.1em", color: "#555", marginBottom: 10,
}}>Your Input</label>
<textarea
value={input}
onChange={e => setInput(e.target.value)}
placeholder={selected.placeholder}
rows={4}
style={{
width: "100%", background: "#0d0d16",
border: "1px solid #252535", borderRadius: 12,
padding: "16px", color: "#e8e4d9", fontSize: 14,
lineHeight: 1.6, resize: "vertical", outline: "none",
fontFamily: "inherit", boxSizing: "border-box",
}}
onFocus={e => e.target.style.border = "1px solid #f59e0b55"}
onBlur={e => e.target.style.border = "1px solid #252535"}
/>
</div>
<button
onClick={handleGenerate}
disabled={loading || !input.trim()}
style={{
background: loading || !input.trim()
? "#1e1e2e"
: "linear-gradient(135deg, #f59e0b, #ef4444)",
color: loading || !input.trim() ? "#444" : "#fff",
border: "none", borderRadius: 10,
padding: "14px 28px", fontSize: 14,
fontFamily: "inherit", fontWeight: "bold",
cursor: loading || !input.trim() ? "not-allowed" : "pointer",
letterSpacing: "0.05em", transition: "all 0.2s",
width: "100%",
}}
>
{loading ? "✦ Generating..." : "✦ Generate"}
</button>
</div>
{/* Output */}
{(output || error) && (
<div style={{
background: "#111118", border: "1px solid #1e1e2e",
borderRadius: 20, padding: "32px",
animation: "fadeIn 0.3s ease",
}}>
<div style={{
fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em",
color: "#f59e0b", marginBottom: 18,
}}>✦ Result</div>
{error ? (
<p style={{ color: "#ef4444", fontSize: 14 }}>{error}</p>
) : (
<div style={{
color: "#d4d0c8", fontSize: 14, lineHeight: 1.8,
whiteSpace: "pre-wrap", fontFamily: "'Georgia', serif",
}}>
{output}
</div>
)}
{output && (
<button
onClick={() => navigator.clipboard?.writeText(output)}
style={{
marginTop: 20, background: "none",
border: "1px solid #252535", color: "#666",
borderRadius: 8, padding: "8px 18px", fontSize: 12,
cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.05em",
}}
onMouseEnter={e => e.target.style.color = "#f59e0b"}
onMouseLeave={e => e.target.style.color = "#666"}
>
Copy to clipboard
</button>
)}
</div>
)}
</div>
)}
<style>{`
@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1;
* { box-sizing: border-box; }
textarea::placeholder { color: #3a3a4a; }
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #0a0a0f; }
::-webkit-scrollbar-thumb { background: #252535; border-radius: 3px; }
`}</style>
</div>
);
}
