import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCreatives, deleteCreative } from "../api";

export default function Gallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  // Admin state
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [verifying, setVerifying] = useState(false);

  // Add modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("Photography");
  const [addStatus, setAddStatus] = useState("");
  const [adding, setAdding] = useState(false);

  const CATEGORIES = ["All", "Photography", "Design", "Other"];

  useEffect(() => {
    fetchCreatives()
      .then(setItems)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setVerifying(true);
    setPasswordError("");
    try {
      const res = await fetch("http://localhost:5000/api/creatives/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminPassword: passwordInput }),
      });
      if (res.status === 401) {
        setPasswordError("Wrong password. Try again.");
        setVerifying(false);
        return;
      }
      sessionStorage.setItem("adminPwd", passwordInput);
      setIsAdmin(true);
      setShowPasswordModal(false);
      setPasswordInput("");
    } catch {
      setPasswordError("Could not connect to server.");
    }
    setVerifying(false);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!imageUrl.trim()) return;
    setAdding(true);
    setAddStatus("");
    try {
      const adminPassword = sessionStorage.getItem("adminPwd");
      const res = await fetch("http://localhost:5000/api/creatives", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl, caption, category, adminPassword }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to add item");
      }
      const newItem = await res.json();
      setItems((prev) => [newItem, ...prev]);
      setImageUrl("");
      setCaption("");
      setCategory("Photography");
      setShowAddModal(false);
    } catch (err) {
      setAddStatus(err.message);
    }
    setAdding(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      const adminPassword = sessionStorage.getItem("adminPwd");
      await deleteCreative(id, adminPassword);
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const filtered = filter === "All" ? items : items.filter((i) => i.category === filter);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-rose-500/10 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">

        {/* Navigation */}
        <nav className="bento-card flex items-center justify-between px-8 py-5 mb-10">
          <Link to="/" className="font-bold text-2xl tracking-tight text-white capitalize hover:text-rose-400 transition-colors">
            Portfolio
          </Link>
          <div className="flex items-center gap-6 text-sm font-medium text-zinc-400">
            <Link to="/" className="transition-colors hover:text-white">Home</Link>
            <Link to="/gallery" className="text-white font-bold">Gallery</Link>
            {isAdmin ? (
              <button
                onClick={() => setShowAddModal(true)}
                className="rounded-full bg-rose-500 text-white px-5 py-2.5 transition-all hover:bg-rose-400 font-bold shadow-xl"
              >
                + Add
              </button>
            ) : (
              <button
                onClick={() => setShowPasswordModal(true)}
                className="rounded-full bg-white text-black px-5 py-2.5 transition-transform hover:scale-105 font-bold shadow-xl"
              >
                Admin
              </button>
            )}
          </div>
        </nav>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl sm:text-6xl font-black tracking-tighter text-white mb-4">
            Creative <span className="text-rose-400">Work.</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl">
            A collection of my photography and design work — moments captured and interfaces crafted.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-3 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${filter === cat
                ? "bg-rose-500 text-white shadow-lg"
                : "bg-zinc-800/50 border border-zinc-700/50 text-zinc-400 hover:text-white hover:border-zinc-500"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="text-center py-24 text-zinc-500 text-lg animate-pulse">Loading gallery...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 text-zinc-600">
            <p className="text-6xl mb-4">📷</p>
            <p className="text-lg font-medium">No items yet.{isAdmin ? " Add your first one!" : ""}</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filtered.map((item) => (
              <div key={item._id} className="bento-card bento-card-hover break-inside-avoid group relative overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full object-cover"
                  onError={(e) => { e.target.src = "https://placehold.co/600x400/18181b/666?text=Image"; }}
                />
                <div className="p-5 flex items-start justify-between gap-4">
                  <div>
                    {item.title && item.title !== "Untitled" && (
                      <p className="text-white font-medium">{item.title}</p>
                    )}
                  </div>
                  {isAdmin && (
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="shrink-0 text-zinc-500 hover:text-red-400 transition-colors text-xl"
                      title="Delete"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bento-card w-full max-w-sm p-8">
            <h2 className="text-2xl font-bold text-white mb-2">Admin Access</h2>
            <p className="text-zinc-400 text-sm mb-6">Enter your admin password to manage the gallery.</p>
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Password"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-rose-400 transition-colors"
                autoFocus
              />
              {passwordError && <p className="text-red-400 text-sm">{passwordError}</p>}
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={verifying}
                  className="flex-1 rounded-xl bg-rose-500 text-white py-3 font-bold hover:bg-rose-400 transition-colors disabled:opacity-60"
                >
                  {verifying ? "Checking..." : "Unlock"}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowPasswordModal(false); setPasswordError(""); setPasswordInput(""); }}
                  className="flex-1 rounded-xl bg-zinc-800 text-zinc-300 py-3 font-bold hover:bg-zinc-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bento-card w-full max-w-md p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Add Photo / Design</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1 uppercase tracking-wider">Image URL *</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  required
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-rose-400 transition-colors"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1 uppercase tracking-wider">Caption</label>
                <input
                  type="text"
                  placeholder="Write a caption..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-rose-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1 uppercase tracking-wider">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-rose-400 transition-colors"
                >
                  <option>Photography</option>
                  <option>Design</option>
                  <option>Other</option>
                </select>
              </div>
              {addStatus && <p className="text-red-400 text-sm">{addStatus}</p>}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={adding}
                  className="flex-1 rounded-xl bg-rose-500 text-white py-3 font-bold hover:bg-rose-400 transition-colors disabled:opacity-60"
                >
                  {adding ? "Adding..." : "Add to Gallery"}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowAddModal(false); setAddStatus(""); }}
                  className="flex-1 rounded-xl bg-zinc-800 text-zinc-300 py-3 font-bold hover:bg-zinc-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
