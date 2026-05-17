import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation, Link } from "react-router-dom";
import "./index.css";

const API_BASE = import.meta.env.VITE_API_BASE || "/api";

const AboutPage = () => (
  <section
    className="page-section"
    style={{
      padding: "6vw 4vw",
      minHeight: "60vh",
      animation: "fadeIn var(--transition-fast)",
    }}
  >
    <div
      className="container"
      style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}
    >
      <h1
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "3rem",
          marginBottom: "2rem",
        }}
      >
        About Montreux & Co.
      </h1>
      <p
        style={{
          fontSize: "1.1rem",
          color: "var(--text-muted)",
          lineHeight: "1.8",
          marginBottom: "1.5rem",
        }}
      >
        Founded in 1926 in the heart of Switzerland, Montreux & Co. has been
        synonymous with uncompromising luxury and timeless elegance. For nearly
        a century, our fashion archive has curated the most exquisite pieces
        from around the globe.
      </p>
      <p
        style={{
          fontSize: "1.1rem",
          color: "var(--text-muted)",
          lineHeight: "1.8",
        }}
      >
        Our mission is to bring archival luxury fashion to the modern
        connoisseur, blending heritage craftsmanship with contemporary style.
      </p>
    </div>
  </section>
);

const ContactPage = () => (
  <section
    className="page-section"
    style={{
      padding: "6vw 4vw",
      minHeight: "60vh",
      animation: "fadeIn var(--transition-fast)",
    }}
  >
    <div className="container" style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h1
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "3rem",
          marginBottom: "2rem",
          textAlign: "center",
        }}
      >
        Contact Us
      </h1>
      <form
        style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          try {
            await fetch(`${API_BASE}/contact/`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(Object.fromEntries(formData)),
            });
            showToast("Message successfully sent to Montreux & Co!");
            e.target.reset();
          } catch (err) {
            showToast("Failed to send message. Make sure the backend is running.", "error");
          }
        }}
      >
        <input
          name="name"
          type="text"
          placeholder="Your Name"
          required
          style={{
            padding: "1rem",
            border: "1px solid var(--border-color)",
            fontSize: "1rem",
            fontFamily: "var(--font-sans)",
            outline: "none",
          }}
        />
        <input
          name="email"
          type="email"
          placeholder="Your Email"
          required
          style={{
            padding: "1rem",
            border: "1px solid var(--border-color)",
            fontSize: "1rem",
            fontFamily: "var(--font-sans)",
            outline: "none",
          }}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          required
          rows="5"
          style={{
            padding: "1rem",
            border: "1px solid var(--border-color)",
            fontSize: "1rem",
            fontFamily: "var(--font-sans)",
            resize: "vertical",
            outline: "none",
          }}
        ></textarea>
        <button
          type="submit"
          style={{
            padding: "1rem",
            background: "var(--text-main)",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          Send Message
        </button>
      </form>
    </div>
  </section>
);

const SupportPage = () => (
  <section
    className="page-section"
    style={{
      padding: "6vw 4vw",
      minHeight: "60vh",
      animation: "fadeIn var(--transition-fast)",
    }}
  >
    <div className="container" style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "3rem",
          marginBottom: "3rem",
          textAlign: "center",
        }}
      >
        Customer Support
      </h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
        <div>
          <h3
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.5rem",
              marginBottom: "0.5rem",
            }}
          >
            Shipping Information
          </h3>
          <p style={{ color: "var(--text-muted)", lineHeight: "1.6" }}>
            We offer complimentary express shipping worldwide. All orders are
            processed within 24 hours and shipped via secure, tracked courier
            services.
          </p>
        </div>
        <div>
          <h3
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.5rem",
              marginBottom: "0.5rem",
            }}
          >
            Returns & Exchanges
          </h3>
          <p style={{ color: "var(--text-muted)", lineHeight: "1.6" }}>
            If you are not completely satisfied with your purchase, you may
            return the item within 14 days of delivery for a full refund or
            exchange. Items must be unworn with original tags attached.
          </p>
        </div>
        <div>
          <h3
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.5rem",
              marginBottom: "0.5rem",
            }}
          >
            FAQ
          </h3>
          <p style={{ color: "var(--text-muted)", lineHeight: "1.6" }}>
            <strong>Do you authenticate archival pieces?</strong>
            <br />
            Yes, every item undergoes a rigorous 10-point authentication process
            by our expert curators before being listed in the archive.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const OrderHistoryPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_BASE}/orders/`, {
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });
      if (res.ok) {
        const data = await res.json();
        // Sort orders by date descending
        setOrders(data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
      }
    } catch (err) {
      console.error("Failed to fetch orders");
    } finally {
      setLoadingOrders(false);
    }
  };

  if (loadingOrders) return <div style={{ padding: "10vw", textAlign: "center", fontFamily: "var(--font-serif)", fontSize: "1.5rem" }}>Loading your archive history...</div>;

  return (
    <section className="page-section" style={{ padding: "6vw 4vw", minHeight: "70vh", animation: "fadeIn var(--transition-fast)" }}>
      <div className="container" style={{ maxWidth: "900px", margin: "0 auto" }}>
        <button
          onClick={() => navigate("/")}
          style={{
            background: "none",
            border: "none",
            color: "var(--text-muted)",
            cursor: "pointer",
            marginBottom: "2rem",
            fontSize: "0.9rem",
            padding: 0,
          }}
        >
          ← Back to Shopping
        </button>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "3rem", marginBottom: "3.5rem" }}>Order History</h1>
        
        {orders.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem 0" }}>
            <p style={{ color: "var(--text-muted)", fontSize: "1.2rem", marginBottom: "2rem" }}>Your fashion archive history is currently empty.</p>
            <button 
              onClick={() => navigate("/")}
              style={{ padding: "1rem 2rem", border: "1px solid var(--text-main)", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.85rem" }}
            >
              Discover the Archive
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {orders.map((order) => (
              <div key={order.id} style={{ border: "1px solid var(--border-color)", padding: "2.5rem", background: "#fff" }}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "1.5rem" }}>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.4rem" }}>Order Identification</div>
                    <div style={{ fontWeight: 600, fontSize: "1.1rem" }}>#{order.id.toString().padStart(6, '0')}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.4rem" }}>Shipment Status</div>
                    <div style={{ 
                      fontWeight: 600, 
                      fontSize: "0.9rem",
                      padding: "0.2rem 0.8rem",
                      borderRadius: "20px",
                      background: order.status === 'PAID' ? '#f0f9f0' : order.status === 'PENDING' ? '#fff9f0' : '#f5f5f5',
                      color: order.status === 'PAID' ? '#2e7d32' : order.status === 'PENDING' ? '#ed6c02' : 'var(--text-main)',
                      display: "inline-block"
                    }}>{order.status}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.4rem" }}>Order Date</div>
                    <div style={{ fontSize: "1rem" }}>{new Date(order.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                  </div>
                </div>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  {order.items.map((item) => (
                    <div key={item.id} style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
                      <div style={{ width: "80px", height: "100px", background: "#f9f9f9", flexShrink: 0 }}>
                        <img src={item.product_image} alt={item.product_name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <div style={{ flexGrow: 1 }}>
                        <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem", fontWeight: 400, marginBottom: "0.25rem" }}>{item.product_name}</h4>
                        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.variation_details}</p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>{item.quantity} × ${item.price}</div>
                        <div style={{ fontWeight: 500, marginTop: "0.2rem" }}>${(item.quantity * item.price).toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div style={{ marginTop: "2rem", borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem", display: "flex", justifyContent: "flex-end", alignItems: "baseline", gap: "1rem" }}>
                  <span style={{ fontSize: "0.9rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Total Investment</span>
                  <span style={{ fontSize: "1.5rem", fontWeight: 600 }}>${order.total_price}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const MajorCategoryIcon = ({ type }) => {
  const props = {
    width: 14,
    height: 14,
    stroke: "currentColor",
    fill: "none",
    strokeWidth: 2,
    style: { marginRight: "6px", verticalAlign: "middle", marginTop: "-2px" },
  };
  if (type === "Men")
    return (
      <svg {...props} viewBox="0 0 24 24">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    );
  if (type === "Women")
    return (
      <svg {...props} viewBox="0 0 24 24">
        <path d="M12 12l-4 9h8l-4-9" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    );
  if (type === "Kids")
    return (
      <svg {...props} viewBox="0 0 24 24">
        <path d="M16 21v-2a3 3 0 0 0-3-3h-2a3 3 0 0 0-3 3v2" />
        <circle cx="12" cy="9" r="3" />
      </svg>
    );
  return (
    <svg {...props} viewBox="0 0 24 24">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
};

const CheckoutPage = ({
  cart,
  cartTotal,
  user,
  setCart,
  setUser,
}) => {
  const navigate = useNavigate();
  const [country, setCountry] = useState(user?.country || "");
  const [state, setState] = useState(user?.state || "");
  const [city, setCity] = useState(user?.city || "");
  const [address, setAddress] = useState(user?.address || "");
  const [phone, setPhone] = useState(user?.phone || "");

  let shippingFee = 0;
  if (country === "Nigeria") {
    shippingFee = state.toLowerCase() === "lagos" ? 10 : 25;
  } else if (country !== "") {
    shippingFee = 50; // International
  }

  const taxFee = cartTotal * 0.075; // 7.5% VAT
  const finalTotal = cartTotal + shippingFee + taxFee;

  const handlePaystack = () => {
    if (!country || !state || !address || !phone) {
      showToast(
        "Please complete your delivery address and phone number before paying.",
        "error"
      );
      return;
    }

    // Removed sync update to prevent re-render before Paystack opens

    const handler = window.PaystackPop.setup({
      key: "pk_test_ab4c5c13d1ac64611e92b92cfcc60c23243a91f3",
      email: user.email,
      amount: Math.round(finalTotal * 100 * 1500), // Converted to base currency
      currency: "NGN",
      ref: "" + Math.floor(Math.random() * 1000000000 + 1),
      callback: function (response) {
        fetch(`${API_BASE}/orders/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            address: `${address}, ${city}, ${state}, ${country}`,
            items: cart,
            payment_reference: response.reference
          })
        }).then(res => {
          if (res.ok) {
            showToast(`Payment complete! Order archived.`);
            setCart([]);
            navigate("/");
            window.scrollTo(0, 0);
          } else {
            res.json().then(data => {
              console.error("Order creation failed:", data);
              showToast(`Payment confirmed, but failed to record order: ${JSON.stringify(data)}`, "error");
            });
          }
        }).catch((err) => {
          console.error("Network error during order creation:", err);
          showToast("Network error while recording order.", "error");
        });
      },
      onClose: function () {
        console.log("Payment window closed.");
      },
    });
    handler.openIframe();
  };

  return (
    <section
      className="page-section"
      style={{
        padding: "4vw 4vw",
        minHeight: "70vh",
        background: "#fcfbf9",
        animation: "fadeIn var(--transition-fast)",
      }}
    >
      <div
        className="container"
        style={{ maxWidth: "1000px", margin: "0 auto" }}
      >
        <button
          onClick={() => navigate("/")}
          style={{
            background: "none",
            border: "none",
            color: "var(--text-muted)",
            cursor: "pointer",
            marginBottom: "2rem",
            fontSize: "0.9rem",
            padding: 0,
          }}
        >
          ← Back to Shopping
        </button>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "2.5rem",
            marginBottom: "2rem",
          }}
        >
          Checkout
        </h1>

        <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
          <div
            style={{
              flex: "1 1 500px",
              background: "#fff",
              padding: "2rem",
              border: "1px solid var(--border-color)",
            }}
          >
            <h3
              style={{
                fontSize: "1.2rem",
                marginBottom: "1.5rem",
                borderBottom: "1px solid var(--border-color)",
                paddingBottom: "0.5rem",
                fontFamily: "var(--font-serif)",
              }}
            >
              1. Delivery Information
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                marginBottom: "2.5rem",
              }}
            >
              <div className="form-row">
                <div>
                  <label
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--text-muted)",
                      marginBottom: "0.5rem",
                      display: "block",
                    }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={user.name}
                    readOnly
                    style={{
                      width: "100%",
                      padding: "0.8rem",
                      border: "1px solid var(--border-color)",
                      background: "#f9f9f9",
                      outline: "none",
                      fontFamily: "var(--font-sans)",
                      color: "var(--text-muted)",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--text-muted)",
                      marginBottom: "0.5rem",
                      display: "block",
                    }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    readOnly
                    style={{
                      width: "100%",
                      padding: "0.8rem",
                      border: "1px solid var(--border-color)",
                      background: "#f9f9f9",
                      outline: "none",
                      fontFamily: "var(--font-sans)",
                      color: "var(--text-muted)",
                    }}
                  />
                </div>
              </div>
              <div>
                <label
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text-muted)",
                    marginBottom: "0.5rem",
                    display: "block",
                  }}
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  placeholder="E.g. +234 800 000 0000"
                  style={{
                    width: "100%",
                    padding: "0.8rem",
                    border: "1px solid var(--border-color)",
                    outline: "none",
                    fontFamily: "var(--font-sans)",
                  }}
                />
              </div>
              <div className="form-row">
                <div>
                  <label
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--text-muted)",
                      marginBottom: "0.5rem",
                      display: "block",
                    }}
                  >
                    Country *
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                    style={{
                      width: "100%",
                      padding: "0.8rem",
                      border: "1px solid var(--border-color)",
                      outline: "none",
                      fontFamily: "var(--font-sans)",
                      background: "#fff",
                    }}
                  >
                    <option value="">Select Country</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Other">Other (International)</option>
                  </select>
                </div>
                <div>
                  <label
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--text-muted)",
                      marginBottom: "0.5rem",
                      display: "block",
                    }}
                  >
                    State/Province *
                  </label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                    placeholder="E.g. Lagos, Texas, etc."
                    style={{
                      width: "100%",
                      padding: "0.8rem",
                      border: "1px solid var(--border-color)",
                      outline: "none",
                      fontFamily: "var(--font-sans)",
                    }}
                  />
                </div>
              </div>
              <div className="form-row">
                <div>
                  <label
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--text-muted)",
                      marginBottom: "0.5rem",
                      display: "block",
                    }}
                  >
                    City *
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    placeholder="City name"
                    style={{
                      width: "100%",
                      padding: "0.8rem",
                      border: "1px solid var(--border-color)",
                      outline: "none",
                      fontFamily: "var(--font-sans)",
                    }}
                  />
                </div>
              </div>
              <div>
                <label
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text-muted)",
                    marginBottom: "0.5rem",
                    display: "block",
                  }}
                >
                  Street Address *
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  rows="2"
                  placeholder="House number, street name, apartment"
                  style={{
                    width: "100%",
                    padding: "0.8rem",
                    border: "1px solid var(--border-color)",
                    resize: "vertical",
                    outline: "none",
                    fontFamily: "var(--font-sans)",
                  }}
                ></textarea>
              </div>
            </div>

            <h3
              style={{
                fontSize: "1.2rem",
                marginBottom: "1.5rem",
                borderBottom: "1px solid var(--border-color)",
                paddingBottom: "0.5rem",
                fontFamily: "var(--font-serif)",
              }}
            >
              2. Payment Method
            </h3>
            <div
              style={{
                padding: "1rem",
                border: "1px solid var(--text-main)",
                background: "#fcfbf9",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <input
                type="radio"
                checked
                readOnly
                style={{
                  accentColor: "var(--text-main)",
                  width: "18px",
                  height: "18px",
                }}
              />
              <span style={{ fontWeight: 500, fontSize: "0.9rem" }}>
                Pay Securely with Paystack
              </span>
            </div>
          </div>

          <div style={{ flex: "1 1 300px" }}>
            <div
              style={{
                background: "#fff",
                padding: "2rem",
                border: "1px solid var(--border-color)",
                position: "sticky",
                top: "100px",
              }}
            >
              <h3
                style={{
                  fontSize: "1.2rem",
                  marginBottom: "1.5rem",
                  borderBottom: "1px solid var(--border-color)",
                  paddingBottom: "0.5rem",
                  fontFamily: "var(--font-serif)",
                }}
              >
                Order Summary
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  maxHeight: "400px",
                  overflowY: "auto",
                  marginBottom: "1.5rem",
                  paddingRight: "0.5rem",
                }}
              >
                {cart.map((item, idx) => (
                  <div key={idx} style={{ display: "flex", gap: "1rem" }}>
                    <img
                      src={item.image_url}
                      alt={item.name}
                      style={{
                        width: "60px",
                        height: "80px",
                        objectFit: "cover",
                      }}
                    />
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                        {item.name}
                      </div>
                      {item.variation && (
                        <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                          {item.variation.size && item.variation.color ? `${item.variation.size} / ${item.variation.color}` : item.variation.size || item.variation.color}
                        </div>
                      )}
                      <div
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--text-muted)",
                          marginTop: "0.2rem",
                        }}
                      >
                        Qty: {item.quantity}
                      </div>
                    </div>
                    <div style={{ fontWeight: 500, fontSize: "0.9rem" }}>
                      $
                      {(parseFloat(item.base_price) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  borderTop: "1px solid var(--border-color)",
                  paddingTop: "1rem",
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem",
                  fontSize: "0.9rem",
                }}
              >
                <span style={{ color: "var(--text-muted)" }}>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem",
                  fontSize: "0.9rem",
                }}
              >
                <span style={{ color: "var(--text-muted)" }}>Tax (7.5%)</span>
                <span>${taxFee.toFixed(2)}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "1.5rem",
                  fontSize: "0.9rem",
                }}
              >
                <span style={{ color: "var(--text-muted)" }}>Shipping Fee</span>
                <span
                  style={{
                    color: shippingFee === 0 ? "var(--text-main)" : "#333",
                  }}
                >
                  {country === ""
                    ? "Enter address"
                    : shippingFee === 0
                      ? "Free"
                      : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>
              <div
                style={{
                  borderTop: "1px solid var(--text-main)",
                  paddingTop: "1rem",
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  marginBottom: "2rem",
                }}
              >
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>

              <button
                onClick={handlePaystack}
                style={{
                  width: "100%",
                  padding: "1.2rem",
                  background: "var(--text-main)",
                  color: "#fff",
                  border: "none",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  cursor: "pointer",
                  transition: "0.3s",
                  fontWeight: 500,
                }}
                onMouseOver={(e) => (e.target.style.opacity = 0.9)}
                onMouseOut={(e) => (e.target.style.opacity = 1)}
              >
                Complete Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const heroImages = {
  All: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
  Men: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=2070&auto=format&fit=crop",
  Women:
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
  Kids: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=2070&auto=format&fit=crop",
};

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("montreux_cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [activeMajorCategory, setActiveMajorCategory] = useState("All");
  const [activeSubCategory, setActiveSubCategory] = useState("All");
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ ...toast, show: false }), 4000);
  };

  const handleSearch = () => {
    setActiveMajorCategory("All");
    setActiveSubCategory("All");
    navigate("/");
    window.scrollTo({ top: 500, behavior: "smooth" });
  };

  useEffect(() => {
    fetchData();
    checkAuth();
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    localStorage.setItem("montreux_cart", JSON.stringify(cart));
  }, [cart]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch(`${API_BASE}/products/`),
        fetch(`${API_BASE}/categories/`),
      ]);

      if (!prodRes.ok || !catRes.ok) {
        const statusMessage = !prodRes.ok
          ? `Products ${prodRes.status}`
          : `Categories ${catRes.status}`;
        throw new Error(`API returned an error: ${statusMessage}`);
      }

      const prodData = await prodRes.json();
      const catData = await catRes.json();

      setProducts(prodData);
      setCategories(catData);
    } catch (err) {
      console.error("Failed to fetch data", err);
      setError(
        "Unable to load archive data. Make sure the backend is running.",
      );
    } finally {
      setTimeout(() => setLoading(false), 800);
    }
  };

  const checkAuth = async () => {
    try {
      const res = await fetch(`${API_BASE}/auth/profile/`, { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    } catch (err) {
      console.log("Not authenticated");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE}/auth/logout/`, { 
        method: "POST",
        credentials: "include"
      });
      setUser(null);
      navigate("/");
      setIsProfileOpen(false);
      showToast("Logged out successfully");
    } catch (err) {
      showToast("Logout failed", "error");
    }
  };

  const addToCart = (product, variation = null) => {
    // If no variation provided, try to find one if the product has variations
    let finalVariation = variation;
    if (!finalVariation && product.variations && product.variations.length > 0) {
      // If it's the quick-add from grid, we might just pick the first one or open the modal
      if (product.variations.length === 1) {
        finalVariation = product.variations[0];
      } else {
        setSelectedProduct(product);
        return;
      }
    }

    const cartKey = finalVariation ? `${product.id}-${finalVariation.id}` : `${product.id}`;
    const existingIndex = cart.findIndex((item) => 
      (finalVariation ? item.variation?.id === finalVariation.id : !item.variation) && item.id === product.id
    );

    if (existingIndex > -1) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += 1;
      setCart(newCart);
    } else {
      setCart([...cart, { ...product, variation: finalVariation, quantity: 1 }]);
    }
    setIsCartOpen(true);
    showToast(`${product.name} added to cart`);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const updateQuantity = (index, delta) => {
    const newCart = [...cart];
    newCart[index].quantity = Math.max(1, newCart[index].quantity + delta);
    setCart(newCart);
  };

  const cartTotal = cart.reduce(
    (acc, item) => acc + parseFloat(item.base_price) * item.quantity,
    0,
  );
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const filteredProducts = products.filter((p) => {
    const matchesMajor =
      activeMajorCategory === "All" ||
      p.category?.major_category === activeMajorCategory;
    const matchesSub =
      activeSubCategory === "All" || p.category?.name === activeSubCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.description &&
        p.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesMajor && matchesSub && matchesSearch;
  });

  const availableSubCategories = categories.filter(
    (cat) =>
      activeMajorCategory === "All" ||
      cat.major_category === activeMajorCategory,
  );

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader">Loading Montreux Archive...</div>
      </div>
    );
  }

  return (
    <>
      {/* Top Announcement Bar */}
      <div
        className="top-bar"
        style={{
          background: "var(--text-main)",
          color: "#fff",
          fontSize: "0.75rem",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          padding: "0.6rem 4vw",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="desktop-only" style={{ opacity: 0.8 }}>
          Complimentary Worldwide Express Shipping
        </div>
        <div style={{ display: "flex", gap: "1.5rem", marginLeft: "auto" }}>
          <button
            style={{
              color: "#fff",
              opacity: 0.8,
              cursor: "pointer",
              background: "none",
              border: "none",
              textTransform: "uppercase",
              fontSize: "0.75rem",
            }}
            onMouseOver={(e) => (e.target.style.opacity = 1)}
            onMouseOut={(e) => (e.target.style.opacity = 0.8)}
            onClick={() => {
              navigate("/about");
              window.scrollTo(0, 0);
            }}
          >
            About
          </button>
          <button
            style={{
              color: "#fff",
              opacity: 0.8,
              cursor: "pointer",
              background: "none",
              border: "none",
              textTransform: "uppercase",
              fontSize: "0.75rem",
            }}
            onMouseOver={(e) => (e.target.style.opacity = 1)}
            onMouseOut={(e) => (e.target.style.opacity = 0.8)}
            onClick={() => {
              navigate("/contact");
              window.scrollTo(0, 0);
            }}
          >
            Contact
          </button>
          <button
            style={{
              color: "#fff",
              opacity: 0.8,
              cursor: "pointer",
              background: "none",
              border: "none",
              textTransform: "uppercase",
              fontSize: "0.75rem",
            }}
            onMouseOver={(e) => (e.target.style.opacity = 1)}
            onMouseOut={(e) => (e.target.style.opacity = 0.8)}
            onClick={() => {
              navigate("/support");
              window.scrollTo(0, 0);
            }}
          >
            Support
          </button>
          {user && (
            <button
              style={{
                color: "#fff",
                opacity: 0.8,
                cursor: "pointer",
                background: "none",
                border: "none",
                textTransform: "uppercase",
                fontSize: "0.75rem",
              }}
              onMouseOver={(e) => (e.target.style.opacity = 1)}
              onMouseOut={(e) => (e.target.style.opacity = 0.8)}
              onClick={() => {
                navigate("/orders");
                window.scrollTo(0, 0);
              }}
            >
              Orders
            </button>
          )}
        </div>
      </div>

      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-top">
            <button
              className="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            <div className="logo">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/");
                }}
              >
                Montreux & Co.
              </a>
            </div>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search fashion archive..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button onClick={handleSearch}>🔍</button>
            </div>
            <div
              className="header-actions"
              style={{ display: "flex", alignItems: "center", gap: "1rem" }}
            >
              {user ? (
                <button
                  style={{
                    fontSize: "0.9rem",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                  }}
                  onClick={() => setIsProfileOpen(true)}
                >
                  👤 {user.name.split(" ")[0]}
                </button>
              ) : (
                <button
                  style={{
                    fontSize: "0.9rem",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    opacity: 0.7,
                  }}
                  onMouseOver={(e) => (e.target.style.opacity = 1)}
                  onMouseOut={(e) => (e.target.style.opacity = 0.7)}
                  onClick={() => setIsAuthOpen(true)}
                >
                  Sign In
                </button>
              )}
              <div
                style={{
                  height: "20px",
                  width: "1px",
                  background: "var(--text-main)",
                  opacity: 0.2,
                }}
              ></div>
              <button className="cart-btn" onClick={() => setIsCartOpen(true)}>
                🛒 ({cartItemCount})
              </button>
            </div>
          </div>
          <nav className="nav">
            <ul className="nav-list">
              {["All", "Men", "Women", "Kids"].map((major) => (
                <li key={major}>
                  <button
                    className={activeMajorCategory === major ? "active" : ""}
                    onClick={() => {
                      setActiveMajorCategory(major);
                      setActiveSubCategory("All");
                      navigate("/");
                    }}
                  >
                    <MajorCategoryIcon type={major} /> {major}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      <div 
        className={`mobile-menu-backdrop ${isMobileMenuOpen ? "open" : ""}`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>
      
      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <button
          className="close-btn"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          ×
        </button>
        <div className="mobile-search">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
                setIsMobileMenuOpen(false);
              }
            }}
          />
        </div>
        <ul className="mobile-nav">
          {["All", "Men", "Women", "Kids"].map((major) => (
            <li key={major}>
              <button
                style={{
                  color:
                    activeMajorCategory === major
                      ? "var(--text-main)"
                      : "var(--text-muted)",
                }}
                onClick={() => {
                  setActiveMajorCategory(major);
                  setActiveSubCategory("All");
                  navigate("/");
                  if (major === "All") setIsMobileMenuOpen(false);
                }}
              >
                <MajorCategoryIcon type={major} /> {major}
              </button>
              {activeMajorCategory === major && major !== "All" && (
                <ul
                  style={{
                    marginLeft: "1rem",
                    marginTop: "1.5rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.2rem",
                  }}
                >
                  <li>
                    <button
                      style={{
                        fontSize: "1.2rem",
                        color:
                          activeSubCategory === "All"
                            ? "var(--text-main)"
                            : "var(--text-muted)",
                      }}
                      onClick={() => {
                        setActiveSubCategory("All");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      All {major}
                    </button>
                  </li>
                  {availableSubCategories.map((cat) => (
                    <li key={cat.id}>
                      <button
                        style={{
                          fontSize: "1.2rem",
                          color:
                            activeSubCategory === cat.name
                              ? "var(--text-main)"
                              : "var(--text-muted)",
                        }}
                        onClick={() => {
                          setActiveSubCategory(cat.name);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        {cat.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {user ? (
          <div style={{ marginTop: "auto", borderTop: "1px solid var(--border-color)", paddingTop: "2.5rem", paddingBottom: "2rem" }}>
            <h4 style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--text-muted)", marginBottom: "2rem" }}>My Private Archive</h4>
            <ul style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              <li>
                <button 
                  onClick={() => { setIsProfileOpen(true); setIsMobileMenuOpen(false); }}
                  style={{ fontSize: "1.8rem", fontFamily: "var(--font-serif)", display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <span style={{ opacity: 0.5, fontSize: "1.2rem" }}>👤</span> Profile
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { navigate("/orders"); setIsMobileMenuOpen(false); window.scrollTo(0,0); }}
                  style={{ fontSize: "1.8rem", fontFamily: "var(--font-serif)", display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <span style={{ opacity: 0.5, fontSize: "1.2rem" }}>📦</span> Orders
                </button>
              </li>
              <li>
                <button 
                  onClick={handleLogout}
                  style={{ fontSize: "1.8rem", fontFamily: "var(--font-serif)", color: "#d32f2f", display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <span style={{ opacity: 0.5, fontSize: "1.2rem" }}>🚪</span> Sign Out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <div style={{ marginTop: "auto", borderTop: "1px solid var(--border-color)", paddingTop: "2.5rem", paddingBottom: "2rem" }}>
             <button 
                onClick={() => { setIsAuthOpen(true); setIsMobileMenuOpen(false); }}
                style={{ fontSize: "2rem", fontFamily: "var(--font-serif)", display: "flex", alignItems: "center", gap: "1rem" }}
              >
                Sign In <span style={{ fontSize: "1rem", color: "var(--text-muted)" }}>/</span> Join
              </button>
          </div>
        )}
      </div>

      <Routes>
        <Route path="/" element={
          <>
          {/* Hero */}
          <section
            className="hero"
            style={{
              backgroundImage: `url('${heroImages[activeMajorCategory]}')`,
            }}
          >
            <div className="container">
              <div className="hero-content">
                <h1>Archival Luxury Fashion</h1>
                <p>Discover timeless pieces from the Montreux archive</p>
              </div>
            </div>
          </section>

          {/* Error Message */}
          {error && (
            <section className="error-section">
              <div className="container">
                <div className="error-message">
                  <strong>⚠️ {error}</strong>
                </div>
              </div>
            </section>
          )}

          {/* Products */}
          <section className="products-section">
            <div
              className="container products-layout"
              style={{ display: "flex", gap: "4vw", alignItems: "flex-start" }}
            >
              {/* Subcategory Sidebar */}
              {activeMajorCategory !== "All" &&
                availableSubCategories.length > 0 && (
                  <aside
                    className="category-sidebar"
                    style={{
                      width: "200px",
                      flexShrink: 0,
                      position: "sticky",
                      top: "100px",
                      height: "fit-content",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.2rem",
                        marginBottom: "1.5rem",
                        fontWeight: 600,
                        borderBottom: "1px solid var(--border-color)",
                        paddingBottom: "0.5rem",
                      }}
                    >
                      {activeMajorCategory}
                    </h3>
                    <ul
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                      }}
                    >
                      <li>
                        <button
                          className={activeSubCategory === "All" ? "active-sub" : ""}
                          onClick={() => setActiveSubCategory("All")}
                          style={{
                            textAlign: "left",
                            width: "100%",
                            fontSize: "0.9rem",
                            color:
                              activeSubCategory === "All"
                                ? "var(--text-main)"
                                : "var(--text-muted)",
                          }}
                        >
                          All {activeMajorCategory}
                        </button>
                      </li>
                      {availableSubCategories.map((cat) => (
                        <li key={cat.id}>
                          <button
                            className={activeSubCategory === cat.name ? "active-sub" : ""}
                            onClick={() => setActiveSubCategory(cat.name)}
                            style={{
                              textAlign: "left",
                              width: "100%",
                              fontSize: "0.9rem",
                              color:
                                activeSubCategory === cat.name
                                  ? "var(--text-main)"
                                  : "var(--text-muted)",
                            }}
                          >
                            {cat.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </aside>
                )}

              <div
                className="products-main"
                style={{ flexGrow: 1, minWidth: 0 }}
              >
                <div className="products-header">
                  <h2>
                    {activeSubCategory === "All"
                      ? activeMajorCategory === "All"
                        ? "All Products"
                        : `All ${activeMajorCategory}`
                      : activeSubCategory}
                  </h2>
                  <p>{filteredProducts.length} items found</p>
                </div>
                <div className="products-grid">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="product-card">
                      <div
                        className="product-image"
                        onClick={() => setSelectedProduct(product)}
                      >
                        <img
                          src={
                            product.image_url ||
                            "https://via.placeholder.com/320x427?text=No+Image"
                          }
                          alt={product.name}
                        />
                        {product.discount_price && (
                          <div className="discount-badge">Sale</div>
                        )}
                      </div>
                      <div className="product-info">
                        <span className="category">
                          {product.category?.name}
                        </span>
                        <h3 className="product-name">{product.name}</h3>
                        <div className="price">
                          {product.discount_price ? (
                            <>
                              <span className="original-price">
                                ${product.base_price}
                              </span>
                              <span className="sale-price">
                                ${product.discount_price}
                              </span>
                            </>
                          ) : (
                            <span className="current-price">
                              ${product.base_price}
                            </span>
                          )}
                        </div>
                        <button
                          className="add-to-cart-btn"
                          onClick={() => addToCart(product)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
        } />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/orders" element={<OrderHistoryPage />} />
        <Route path="/checkout" element={
          <CheckoutPage
            cart={cart}
            cartTotal={cartTotal}
            user={user}
            setCart={setCart}
            setUser={setUser}
          />
        } />
      </Routes>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedProduct(null)}
            >
              ×
            </button>
            <div className="modal-body">
              <div className="modal-image">
                <img
                  src={
                    selectedProduct.image_url ||
                    "https://via.placeholder.com/320x427?text=No+Image"
                  }
                  alt={selectedProduct.name}
                />
              </div>
              <div className="modal-info">
                <span className="category">
                  {selectedProduct.category?.name}
                </span>
                <h2>{selectedProduct.name}</h2>
                <div className="price">
                  {selectedProduct.discount_price ? (
                    <>
                      <span className="original-price">
                        ${selectedProduct.base_price}
                      </span>
                      <span className="sale-price">
                        ${selectedProduct.discount_price}
                      </span>
                    </>
                  ) : (
                    <span className="current-price">
                      ${selectedProduct.base_price}
                    </span>
                  )}
                </div>
                <p className="description">{selectedProduct.description}</p>
                
                {selectedProduct.variations && selectedProduct.variations.length > 0 && (
                  <div style={{ marginBottom: "2rem" }}>
                    <h4 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem" }}>Select Variation</h4>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                      {selectedProduct.variations.map((v) => (
                        <button
                          key={v.id}
                          onClick={() => setSelectedVariation(v)}
                          style={{
                            padding: "0.75rem 1.25rem",
                            border: selectedVariation?.id === v.id ? "1px solid var(--text-main)" : "1px solid var(--border-color)",
                            background: selectedVariation?.id === v.id ? "var(--text-main)" : "transparent",
                            color: selectedVariation?.id === v.id ? "#fff" : "var(--text-main)",
                            fontSize: "0.85rem",
                            transition: "0.2s"
                          }}
                        >
                          {v.size && v.color ? `${v.size} / ${v.color}` : v.size || v.color || "Default"}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  className="add-to-cart-btn"
                  onClick={() => {
                    if (selectedProduct.variations && selectedProduct.variations.length > 0 && !selectedVariation) {
                      showToast("Please select a size/color", "error");
                      return;
                    }
                    addToCart(selectedProduct, selectedVariation);
                    setSelectedProduct(null);
                    setSelectedVariation(null);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      <div className={`cart-sidebar ${isCartOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h3>Your Cart ({cartItemCount})</h3>
          <button onClick={() => setIsCartOpen(false)}>×</button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty</p>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img
                  src={
                    item.image_url ||
                    "https://via.placeholder.com/80x100?text=No+Image"
                  }
                  alt={item.name}
                />
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  {item.variation && (
                    <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                      {item.variation.size && item.variation.color ? `${item.variation.size} / ${item.variation.color}` : item.variation.size || item.variation.color}
                    </p>
                  )}
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(index, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(index, 1)}>+</button>
                  </div>
                  <p className="price">
                    ${parseFloat(item.base_price).toFixed(2)}
                  </p>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total: ${cartTotal.toFixed(2)}</span>
            </div>
            <button
              className="checkout-btn"
              onClick={() => {
                if (!user) {
                  setIsCartOpen(false);
                  setIsAuthOpen(true);
                } else {
                  setIsCartOpen(false);
                  navigate("/checkout");
                  window.scrollTo(0, 0);
                }
              }}
            >
              {user ? "Proceed to Checkout" : "Sign In to Checkout"}
            </button>
          </div>
        )}
      </div>

      {/* Profile Modal */}
      {isProfileOpen && user && (
        <div
          className="modal-overlay"
          onClick={() => setIsProfileOpen(false)}
          style={{ zIndex: 2000 }}
        >
          <div
            className="modal-content"
            style={{
              maxWidth: "500px",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: "3rem 2.5rem",
              display: "block",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setIsProfileOpen(false)}
              style={{
                top: "1rem",
                right: "1.5rem",
                border: "none",
                background: "none",
                fontSize: "2rem",
              }}
            >
              ×
            </button>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "2.2rem",
                marginBottom: "2rem",
                textAlign: "center",
              }}
            >
              My Profile
            </h2>
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.2rem",
              }}
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const payload = Object.fromEntries(formData);

                try {
                  const res = await fetch(`${API_BASE}/auth/profile/`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify(payload),
                  });
                  if (!res.ok) throw new Error("Failed to update profile");

                  setUser({ ...user, ...payload });
                  showToast("Profile updated successfully!");
                  setIsProfileOpen(false);
                } catch (err) {
                  showToast("Error updating profile. Please try again.", "error");
                }
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                }}
              >
                <div style={{ gridColumn: "1 / -1" }}>
                  <label
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--text-muted)",
                      marginBottom: "0.5rem",
                      display: "block",
                    }}
                  >
                    Full Name
                  </label>
                  <input
                    name="name"
                    defaultValue={user.name}
                    required
                    style={{
                      width: "100%",
                      padding: "0.8rem",
                      border: "1px solid var(--border-color)",
                      outline: "none",
                      fontFamily: "var(--font-sans)",
                    }}
                  />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--text-muted)",
                      marginBottom: "0.5rem",
                      display: "block",
                    }}
                  >
                    Email
                  </label>
                  <input
                    name="email"
                    defaultValue={user.email}
                    type="email"
                    required
                    style={{
                      width: "100%",
                      padding: "0.8rem",
                      border: "1px solid var(--border-color)",
                      outline: "none",
                      fontFamily: "var(--font-sans)",
                      background: "#f9f9f9",
                    }}
                    readOnly
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--text-muted)",
                      marginBottom: "0.5rem",
                      display: "block",
                    }}
                  >
                    Phone Number
                  </label>
                  <input
                    name="phone"
                    defaultValue={user.phone || ""}
                    type="tel"
                    style={{
                      width: "100%",
                      padding: "0.8rem",
                      border: "1px solid var(--border-color)",
                      outline: "none",
                      fontFamily: "var(--font-sans)",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--text-muted)",
                      marginBottom: "0.5rem",
                      display: "block",
                    }}
                  >
                    Gender
                  </label>
                  <select
                    name="gender"
                    defaultValue={user.gender || ""}
                    style={{
                      width: "100%",
                      padding: "0.8rem",
                      border: "1px solid var(--border-color)",
                      outline: "none",
                      fontFamily: "var(--font-sans)",
                      background: "#fff",
                    }}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--text-muted)",
                      marginBottom: "0.5rem",
                      display: "block",
                    }}
                  >
                    Country
                  </label>
                  <select
                    name="country"
                    defaultValue={user.country || ""}
                    style={{
                      width: "100%",
                      padding: "0.8rem",
                      border: "1px solid var(--border-color)",
                      outline: "none",
                      fontFamily: "var(--font-sans)",
                      background: "#fff",
                    }}
                  >
                    <option value="">Select Country</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Other">Other (International)</option>
                  </select>
                </div>
                <div>
                  <label
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--text-muted)",
                      marginBottom: "0.5rem",
                      display: "block",
                    }}
                  >
                    State/Province
                  </label>
                  <input
                    name="state"
                    defaultValue={user.state || ""}
                    type="text"
                    style={{
                      width: "100%",
                      padding: "0.8rem",
                      border: "1px solid var(--border-color)",
                      outline: "none",
                      fontFamily: "var(--font-sans)",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--text-muted)",
                      marginBottom: "0.5rem",
                      display: "block",
                    }}
                  >
                    City
                  </label>
                  <input
                    name="city"
                    defaultValue={user.city || ""}
                    type="text"
                    style={{
                      width: "100%",
                      padding: "0.8rem",
                      border: "1px solid var(--border-color)",
                      outline: "none",
                      fontFamily: "var(--font-sans)",
                    }}
                  />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--text-muted)",
                      marginBottom: "0.5rem",
                      display: "block",
                    }}
                  >
                    Street Address
                  </label>
                  <textarea
                    name="address"
                    defaultValue={user.address || ""}
                    rows="2"
                    style={{
                      width: "100%",
                      padding: "0.8rem",
                      border: "1px solid var(--border-color)",
                      resize: "vertical",
                      outline: "none",
                      fontFamily: "var(--font-sans)",
                    }}
                  ></textarea>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  marginTop: "1rem"
                }}
              >
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: "1.2rem",
                    background: "var(--text-main)",
                    color: "#fff",
                    border: "none",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    letterSpacing: "0.1em",
                  }}
                  onMouseOver={(e) => (e.target.style.opacity = 0.9)}
                  onMouseOut={(e) => (e.target.style.opacity = 1)}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  style={{
                    padding: "1.2rem",
                    background: "#fff",
                    color: "#d32f2f",
                    border: "1px solid #d32f2f",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    letterSpacing: "0.1em",
                  }}
                  onMouseOver={(e) => (e.target.style.background = "#fff0f0")}
                  onMouseOut={(e) => (e.target.style.background = "#fff")}
                >
                  Logout
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {isAuthOpen && (
        <div
          className="modal-overlay"
          onClick={() => setIsAuthOpen(false)}
          style={{ zIndex: 2000 }}
        >
          <div
            className="modal-content"
            style={{
              display: "block",
              maxWidth: "420px",
              padding: "3rem 2.5rem",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setIsAuthOpen(false)}
              style={{
                top: "1rem",
                right: "1.5rem",
                border: "none",
                background: "none",
                fontSize: "2rem",
              }}
            >
              ×
            </button>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "2.2rem",
                marginBottom: "2rem",
                textAlign: "center",
              }}
            >
              {authMode === "login" ? "Welcome Back" : "Join Montreux"}
            </h2>
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.2rem",
              }}
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                if (
                  authMode === "signup" &&
                  formData.get("password") !== formData.get("confirm_password")
                ) {
                  showToast("Passwords do not match!", "error");
                  return;
                }
                try {
                  const res = await fetch(`${API_BASE}/auth/login/`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({
                      email: formData.get("email"),
                      password: formData.get("password"),
                      name: formData.get("name") || "",
                      mode: authMode,
                    }),
                  });
                  const data = await res.json();
                  if (!res.ok)
                    throw new Error(data.error || "Authentication failed");

                  setUser(data);
                  setIsAuthOpen(false);
                  showToast(authMode === "signup" ? "Account created!" : "Welcome back!");
                  if (cart.length > 0) setIsCartOpen(true);
                } catch (err) {
                  showToast(err.message, "error");
                }
              }}
            >
              {authMode === "signup" && (
                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: "1rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      opacity: 0.5,
                    }}
                  >
                    👤
                  </span>
                  <input
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    required
                    style={{
                      width: "100%",
                      padding: "1rem 1rem 1rem 3rem",
                      border: "1px solid var(--border-color)",
                      outline: "none",
                      fontFamily: "var(--font-sans)",
                    }}
                  />
                </div>
              )}
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    opacity: 0.5,
                  }}
                >
                  ✉️
                </span>
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  required
                  style={{
                    width: "100%",
                    padding: "1rem 1rem 1rem 3rem",
                    border: "1px solid var(--border-color)",
                    outline: "none",
                    fontFamily: "var(--font-sans)",
                  }}
                />
              </div>
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    opacity: 0.5,
                  }}
                >
                  🔒
                </span>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  style={{
                    width: "100%",
                    padding: "1rem 3.5rem 1rem 3rem",
                    border: "1px solid var(--border-color)",
                    outline: "none",
                    fontFamily: "var(--font-sans)",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "1rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    opacity: 0.5,
                  }}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {authMode === "signup" && (
                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: "1rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      opacity: 0.5,
                    }}
                  >
                    🔒
                  </span>
                  <input
                    name="confirm_password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    required
                    style={{
                      width: "100%",
                      padding: "1rem 3.5rem 1rem 3rem",
                      border: "1px solid var(--border-color)",
                      outline: "none",
                      fontFamily: "var(--font-sans)",
                    }}
                  />
                </div>
              )}

              <button
                type="submit"
                style={{
                  padding: "1.2rem",
                  background: "var(--text-main)",
                  color: "#fff",
                  border: "none",
                  marginTop: "1rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  cursor: "pointer",
                  transition: "0.3s",
                }}
                onMouseOver={(e) => (e.target.style.opacity = 0.9)}
                onMouseOut={(e) => (e.target.style.opacity = 1)}
              >
                {authMode === "login" ? "Sign In" : "Create Account"}
              </button>
            </form>
            <p
              style={{
                textAlign: "center",
                marginTop: "2rem",
                color: "var(--text-muted)",
                fontSize: "0.9rem",
              }}
            >
              {authMode === "login"
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                style={{
                  color: "var(--text-main)",
                  textDecoration: "underline",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                }}
                onClick={() => {
                  setAuthMode(authMode === "login" ? "signup" : "login");
                  setShowPassword(false);
                }}
              >
                {authMode === "login" ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Montreux & Co.</h4>
              <p>Archival luxury fashion since 1926</p>
            </div>
            <div className="footer-section">
              <h4>Categories</h4>
              <ul>
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => {
                        setActiveMajorCategory(cat.major_category || "All");
                        setActiveSubCategory(cat.name);
                        window.scrollTo(0, 0);
                      }}
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-section">
              <h4>Support</h4>
              <ul>
                <li>
                  <button
                    onClick={() => {
                      setActivePage("Contact");
                      window.scrollTo(0, 0);
                    }}
                  >
                    Contact
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActivePage("Support");
                      window.scrollTo(0, 0);
                    }}
                  >
                    Shipping & Returns
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActivePage("About");
                      window.scrollTo(0, 0);
                    }}
                  >
                    About
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Montreux Global & Co. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      {toast.show && (
        <div
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            background: toast.type === "error" ? "#1a1a1a" : "#fff",
            color: toast.type === "error" ? "#fff" : "#1a1a1a",
            padding: "1rem 2rem",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            zIndex: 3000,
            fontFamily: "var(--font-sans)",
            fontSize: "0.9rem",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            border: toast.type === "error" ? "none" : "1px solid var(--border-color)",
            animation: "slideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            display: "flex",
            alignItems: "center",
            gap: "1rem"
          }}
        >
          <span style={{ fontSize: "1.2rem" }}>
            {toast.type === "error" ? "✕" : "✓"}
          </span>
          {toast.message}
          <style>
            {`
              @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
              }
            `}
          </style>
        </div>
      )}
    </>
  );
}

export default App;
