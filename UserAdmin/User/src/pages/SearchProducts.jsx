import { useState } from "react";
import {
  Search,
  Filter,
  Star,
  ShoppingCart,
  Plus,
  CheckCircle,
} from "lucide-react";
import { products } from "../lib/data";
import { useCart } from "../hooks/useCart";
import { Link } from "wouter";

export default function SearchProducts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [addedItems, setAddedItems] = useState(new Set());
  const { addToCart, getTotalItems } = useCart();

  const categories = ["all", "electronics", "clothing", "books", "home"];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const handleAddToCart = (product) => {
    addToCart(product);
    // Add visual feedback
    setAddedItems((prev) => new Set([...prev, product.id]));
    // Remove the feedback after 2 seconds
    setTimeout(() => {
      setAddedItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }, 2000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "20px",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            background: "white",
            borderRadius: "24px",
            padding: "40px",
            marginBottom: "30px",
            boxShadow: "0 25px 70px rgba(0,0,0,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "36px",
                fontWeight: "800",
                color: "#2d3748",
                marginBottom: "12px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <Search size={40} color="#667eea" />
              Product Marketplace
            </h1>
            <p
              style={{
                color: "#718096",
                fontSize: "18px",
              }}
            >
              Discover amazing products tailored just for you
            </p>
          </div>
          {getTotalItems() > 0 && (
            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)",
                  color: "white",
                  borderRadius: "50px",
                  padding: "12px 24px",
                  fontSize: "16px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <ShoppingCart size={20} />
                {getTotalItems()} item{getTotalItems() !== 1 ? "s" : ""}
              </div>
              <a href="/cart">
                <button
                  style={{
                    background:
                      "linear-gradient(135deg, #48bb78 0%, #38a169 100%)",
                    color: "white",
                    border: "none",
                    borderRadius: "12px",
                    padding: "14px 24px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 8px 25px rgba(72, 187, 120, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <ShoppingCart size={18} />
                  View Cart
                </button>
              </a>
            </div>
          )}
        </div>

        {/* Search and Filters */}
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "30px",
            marginBottom: "30px",
            boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto auto",
              gap: "20px",
              alignItems: "center",
            }}
          >
            {/* Search Bar */}
            <div style={{ position: "relative" }}>
              <Search
                size={20}
                color="#9ca3af"
                style={{
                  position: "absolute",
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
              <input
                type="text"
                placeholder="Search for products, brands, categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "100%",
                  paddingLeft: "48px",
                  paddingRight: "16px",
                  paddingTop: "16px",
                  paddingBottom: "16px",
                  border: "2px solid #e2e8f0",
                  borderRadius: "16px",
                  fontSize: "16px",
                  outline: "none",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                padding: "16px 20px",
                border: "2px solid #e2e8f0",
                borderRadius: "16px",
                fontSize: "16px",
                fontWeight: "500",
                outline: "none",
                cursor: "pointer",
                background: "white",
              }}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all"
                    ? "All Categories"
                    : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>

            {/* Price Range Indicator */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "16px 20px",
                background: "#f7fafc",
                borderRadius: "16px",
                fontSize: "14px",
                fontWeight: "600",
                color: "#4a5568",
              }}
            >
              <Filter size={18} color="#667eea" />${priceRange[0]} - $
              {priceRange[1]}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "24px",
            marginBottom: "40px",
          }}
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              style={{
                background: "white",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow =
                  "0 25px 60px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
              }}
            >
              {/* Product Image */}
              <div
                style={{
                  height: "200px",
                  background: `linear-gradient(135deg, ${
                    product.category === "electronics"
                      ? "#667eea, #764ba2"
                      : product.category === "clothing"
                      ? "#f093fb, #f5576c"
                      : product.category === "books"
                      ? "#4facfe, #00f2fe"
                      : product.category === "home"
                      ? "#43e97b, #38f9d7"
                      : "#ffecd2, #fcb69f"
                  })`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      maxHeight: "160px",
                      maxWidth: "90%",
                      objectFit: "contain",
                      borderRadius: "12px",
                      boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                    }}
                  />
                ) : (
                  <span
                    style={{
                      fontSize: "48px",
                      fontWeight: "800",
                      color: "white",
                      textShadow: "0 4px 12px rgba(0,0,0,0.2)",
                    }}
                  >
                    {product.name.charAt(0)}
                  </span>
                )}

                {/* Quick Add Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                  style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    background: "rgba(255,255,255,0.9)",
                    border: "none",
                    borderRadius: "50%",
                    width: "44px",
                    height: "44px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "white";
                    e.currentTarget.style.transform = "scale(1.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.9)";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <Plus size={20} color="#667eea" />
                </button>
              </div>

              {/* Product Info */}
              <div style={{ padding: "24px" }}>
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    color: "#2d3748",
                    marginBottom: "8px",
                    lineHeight: "1.3",
                  }}
                >
                  {product.name}
                </h3>

                <p
                  style={{
                    color: "#718096",
                    fontSize: "14px",
                    marginBottom: "16px",
                    textTransform: "capitalize",
                    fontWeight: "500",
                  }}
                >
                  {product.category}
                </p>

                {/* Rating */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <div style={{ display: "flex", gap: "2px" }}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={i < product.rating ? "#fbbf24" : "none"}
                        color={i < product.rating ? "#fbbf24" : "#d1d5db"}
                      />
                    ))}
                  </div>
                  <span
                    style={{
                      color: "#6b7280",
                      fontSize: "14px",
                      marginLeft: "8px",
                      fontWeight: "500",
                    }}
                  >
                    ({product.rating})
                  </span>
                </div>

                {/* Price and Add to Cart */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontSize: "24px",
                      fontWeight: "800",
                      color: "#667eea",
                    }}
                  >
                    ${product.price.toFixed(2)}
                  </span>

                  <button
                    onClick={() => handleAddToCart(product)}
                    style={{
                      background: addedItems.has(product.id)
                        ? "linear-gradient(135deg, #48bb78 0%, #38a169 100%)"
                        : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "white",
                      border: "none",
                      borderRadius: "12px",
                      padding: "12px 20px",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      boxShadow: addedItems.has(product.id)
                        ? "0 6px 20px rgba(72, 187, 120, 0.3)"
                        : "0 6px 20px rgba(102, 126, 234, 0.3)",
                    }}
                    onMouseEnter={(e) => {
                      if (!addedItems.has(product.id)) {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow =
                          "0 10px 30px rgba(102, 126, 234, 0.4)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!addedItems.has(product.id)) {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow =
                          "0 6px 20px rgba(102, 126, 234, 0.3)";
                      }
                    }}
                  >
                    {addedItems.has(product.id) ? (
                      <>
                        <CheckCircle size={16} />
                        Added!
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={16} />
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Products Found */}
        {filteredProducts.length === 0 && (
          <div
            style={{
              background: "white",
              borderRadius: "24px",
              padding: "60px 40px",
              textAlign: "center",
              boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                background: "linear-gradient(135deg, #fbb6ce 0%, #f687b3 100%)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 30px",
              }}
            >
              <Search size={40} color="white" />
            </div>
            <h3
              style={{
                fontSize: "28px",
                fontWeight: "700",
                color: "#2d3748",
                marginBottom: "16px",
              }}
            >
              No products found
            </h3>
            <p
              style={{
                color: "#718096",
                fontSize: "16px",
                marginBottom: "30px",
              }}
            >
              Try adjusting your search criteria or browse all categories
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                borderRadius: "12px",
                padding: "16px 32px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
