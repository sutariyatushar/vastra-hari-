/* Replace the file src/components/VastraHari.tsx with this content */
import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, Search, Menu, X, Heart, Star, Filter, Grid, List, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Shield, Truck, RotateCcw, Clock, Plus, Edit2, Trash2, Save, Eye, EyeOff } from 'lucide-react';

const VastraHari = () => {
  // UI state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({ username: '', password: '' });

  // Persisted data states
  const [products, setProducts] = useState(() => {
    try { return JSON.parse(localStorage.getItem('vh_products')) || []; } catch(e){ return []; }
  });
  const [bannerData, setBannerData] = useState(() => {
    try { return JSON.parse(localStorage.getItem('vh_banner')) || { title: "Welcome to Vastra Hari", subtitle: "Discover Beautiful Women's Clothing", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200" } } catch(e){ return { title: "Welcome to Vastra Hari", subtitle: "Discover Beautiful Women's Clothing", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200" } }
  });
  const [aboutData, setAboutData] = useState(() => {
    try { return JSON.parse(localStorage.getItem('vh_about')) || { title: "Our Story", content: "Vastra Hari has been a trusted name in women's fashion...", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600" } } catch(e){ return { title: "Our Story", content: "Vastra Hari has been a trusted name in women's fashion...", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600" } }
  });
  const [contactData, setContactData] = useState(() => {
    try { return JSON.parse(localStorage.getItem('vh_contact')) || { phone: "+91 90992 26221", email: "info@vastrahari.com", address: "Ahmedabad, Gujarat, India" } } catch(e){ return { phone: "+91 90992 26221", email: "info@vastrahari.com", address: "Ahmedabad, Gujarat, India" } }
  });
  const [logoData, setLogoData] = useState(() => localStorage.getItem('vh_logo') || null);

  // Cart & wishlist
  const [cartItems, setCartItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('vh_cart')) || []; } catch(e){ return []; }
  });
  const [wishlist, setWishlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem('vh_wishlist')) || []; } catch(e){ return []; }
  });

  // Filters & UI controls
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [editingProduct, setEditingProduct] = useState(null);

  // Create default products if none
  useEffect(() => {
    if (!products || products.length === 0) {
      const defaults = [
        {
          id: 1,
          name: "Elegant Silk Saree",
          price: 2999,
          originalPrice: 4999,
          category: "sarees",
          image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400",
          rating: 4.5,
          reviews: 125,
          colors: ["Red", "Blue", "Green","Yellow"],
          sizes: ["M","L","XL","2XL","3XL"],
          description: "Beautiful traditional silk saree perfect for special occasions"
        },
        {
          id: 2,
          name: "Designer Kurti Set",
          price: 1599,
          originalPrice: 2299,
          category: "kurtis",
          image: "https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=400",
          rating: 4.3,
          reviews: 89,
          colors: ["Pink", "Yellow", "White"],
          sizes: ["S", "M", "L", "XL"],
          description: "Comfortable and stylish kurti set for daily wear"
        },
        {
          id: 3,
          name: "Bridal Lehenga",
          price: 15999,
          originalPrice: 24999,
          category: "lehengas",
          image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400",
          rating: 4.8,
          reviews: 45,
          colors: ["Red", "Pink", "Gold"],
          sizes: ["S", "M", "L"],
          description: "Stunning bridal lehenga with intricate embroidery"
        },
        {
          id: 4,
          name: "Casual Dress",
          price: 899,
          originalPrice: 1299,
          category: "dresses",
          image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400",
          rating: 4.2,
          reviews: 67,
          colors: ["Black", "Navy", "Maroon"],
          sizes: ["XS", "S", "M", "L"],
          description: "Comfortable casual dress for everyday wear"
        }
      ];
      setProducts(defaults);
    }
    // eslint-disable-next-line
  }, []);

  // Persist changes
  useEffect(()=>{ localStorage.setItem('vh_products', JSON.stringify(products)); }, [products]);
  useEffect(()=>{ localStorage.setItem('vh_banner', JSON.stringify(bannerData)); }, [bannerData]);
  useEffect(()=>{ localStorage.setItem('vh_about', JSON.stringify(aboutData)); }, [aboutData]);
  useEffect(()=>{ localStorage.setItem('vh_contact', JSON.stringify(contactData)); }, [contactData]);
  useEffect(()=>{ localStorage.setItem('vh_cart', JSON.stringify(cartItems)); }, [cartItems]);
  useEffect(()=>{ localStorage.setItem('vh_wishlist', JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(()=>{ if (logoData) localStorage.setItem('vh_logo', logoData); }, [logoData]);

  const categories = [
    { id: 'all', name: 'All Products', count: products.length },
    { id: 'sarees', name: 'Sarees', count: products.filter(p => p.category === 'sarees').length },
    { id: 'kurtis', name: 'Kurtis', count: products.filter(p => p.category === 'kurtis').length },
    { id: 'lehengas', name: 'Lehengas', count: products.filter(p => p.category === 'lehengas').length },
    { id: 'dresses', name: 'Dresses', count: products.filter(p => p.category === 'dresses').length }
  ];

  // Improved filtering (name, description, category)
  const filteredProducts = products.filter(product => {
    const q = searchTerm.trim().toLowerCase();
    const matchesSearch = !q || product.name.toLowerCase().includes(q) || (product.description || '').toLowerCase().includes(q) || product.category.toLowerCase().includes(q);
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Admin login
  const handleAdminLogin = () => {
    if (adminCredentials.username === 'vastrahari' && adminCredentials.password === 'vastrahari@2005') {
      setIsAdminLogin(true);
      setShowAdminLogin(false);
      setActiveSection('admin');
      setAdminCredentials({ username: '', password: '' });
    } else {
      alert('Invalid credentials!');
    }
  };

  // Utility: read file to data URL
  const readFileToDataUrl = (file, cb) => {
    const reader = new FileReader();
    reader.onload = (e) => cb(e.target.result);
    reader.readAsDataURL(file);
  };

  // Admin product functions
  const addProduct = () => {
    const newProduct = {
      id: Date.now(),
      name: "New Product",
      price: 999,
      originalPrice: 1499,
      category: "kurtis",
      image: "",
      rating: 4.0,
      reviews: 0,
      colors: ["Black"],
      sizes: ["M","L","XL"],
      description: "New product description"
    };
    setProducts([newProduct, ...products]);
    setEditingProduct(newProduct.id);
  };

  const saveProduct = (productId, updatedData) => {
    setProducts(products.map(p => p.id === productId ? { ...p, ...updatedData } : p));
    setEditingProduct(null);
  };

  const deleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  // Cart & wishlist functions
  const addToCart = (product, opts = {}) => {
    const existingIndex = cartItems.findIndex(ci => ci.id === product.id && ci.selectedSize === opts.selectedSize && ci.selectedColor === opts.selectedColor);
    if (existingIndex >= 0) {
      const copy = [...cartItems];
      copy[existingIndex].quantity += opts.quantity || 1;
      setCartItems(copy);
    } else {
      setCartItems([{ ...product, quantity: opts.quantity || 1, selectedSize: opts.selectedSize || (product.sizes && product.sizes[0]) || '', selectedColor: opts.selectedColor || (product.colors && product.colors[0]) || '' }, ...cartItems]);
    }
    alert('Product added to cart!');
  };

  const updateCartItem = (index, newItem) => {
    const copy = [...cartItems];
    copy[index] = newItem;
    setCartItems(copy);
  };

  const removeCartItem = (index) => {
    if (window.confirm('Remove item from cart?')) {
      const copy = [...cartItems];
      copy.splice(index,1);
      setCartItems(copy);
    }
  };

  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) setWishlist(wishlist.filter(id => id !== productId));
    else setWishlist([productId, ...wishlist]);
  };

  const moveWishlistToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      toggleWishlist(productId);
      addToCart(product);
    }
  };

  // WhatsApp message for order/inquiry with size/color/qty and discount
  const sendToWhatsApp = (product, opts = {}) => {
    const size = opts.selectedSize || (product.selectedSize) || '';
    const color = opts.selectedColor || (product.selectedColor) || '';
    const qty = opts.quantity || 1;
    const discountPercent = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
    const messageLines = [
      `Hi! I'm interested in *${product.name}*`,
      `Price: ₹${product.price.toLocaleString()} (Original: ₹${product.originalPrice?.toLocaleString() || '-'})`,
      `Discount: ${discountPercent}%`,
      `Quantity: ${qty}`,
      size ? `Size: ${size}` : '',
      color ? `Color: ${color}` : '',
      `Product link: ${window.location.href}`
    ].filter(Boolean).join('%0A');
    const whatsappUrl = `https://wa.me/9099226221?text=${encodeURIComponent(messageLines)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Product card component
  const ProductCard = ({ product }) => {
    const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
    const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');

    return (
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
        <div className="relative overflow-hidden">
          <img src={product.image || 'https://via.placeholder.com/600x400?text=No+Image'} alt={product.name} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300" />
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <button onClick={() => toggleWishlist(product.id)} className={`p-2 rounded-full ${wishlist.includes(product.id) ? 'bg-red-500 text-white' : 'bg-white text-gray-600'} hover:bg-red-500 hover:text-white transition-colors`}>
              <Heart size={16} fill={wishlist.includes(product.id) ? 'white' : 'none'} />
            </button>
          </div>
          <div className="absolute top-4 left-4">
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0}% OFF
            </span>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (<Star key={i} size={14} className={i < Math.floor(product.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'} />))}
            </div>
            <span className="text-sm text-gray-600">({product.reviews || 0})</span>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl font-bold text-gray-800">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && <span className="text-lg text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>}
          </div>

          <div className="flex gap-2 mb-3 items-center">
            {product.sizes && <select value={selectedSize} onChange={(e)=>setSelectedSize(e.target.value)} className="p-2 border rounded-lg">{product.sizes.map(s=> <option key={s} value={s}>{s}</option>)}</select>}
            {product.colors && <select value={selectedColor} onChange={(e)=>setSelectedColor(e.target.value)} className="p-2 border rounded-lg">{product.colors.map(c=> <option key={c} value={c}>{c}</option>)}</select>}
          </div>

          <div className="flex gap-2">
            <button onClick={() => sendToWhatsApp(product, { selectedSize, selectedColor, quantity: 1 })} className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105">Order Now</button>
            <button onClick={() => addToCart(product, { selectedSize, selectedColor, quantity: 1 })} className="p-2 border-2 border-pink-500 text-pink-500 rounded-lg hover:bg-pink-500 hover:text-white transition-colors"><ShoppingCart size={20} /></button>
          </div>
        </div>
      </div>
    );
  };

  // Admin product card
  const AdminProductCard = ({ product }) => {
    const [editData, setEditData] = useState(product);
    const isEditing = editingProduct === product.id;

    useEffect(()=>{ setEditData(product); }, [product]);

    return (
      <div className="bg-white rounded-lg shadow-md p-4 border">
        {isEditing ? (
          <div className="space-y-4">
            <input type="text" value={editData.name} onChange={(e)=>setEditData({...editData, name: e.target.value})} className="w-full p-2 border rounded-lg" placeholder="Product Name" />
            <div className="grid grid-cols-2 gap-4">
              <input type="number" value={editData.price} onChange={(e)=>setEditData({...editData, price: parseInt(e.target.value || 0)})} className="p-2 border rounded-lg" placeholder="Price" />
              <input type="number" value={editData.originalPrice} onChange={(e)=>setEditData({...editData, originalPrice: parseInt(e.target.value || 0)})} className="p-2 border rounded-lg" placeholder="Original Price" />
            </div>
            <select value={editData.category} onChange={(e)=>setEditData({...editData, category: e.target.value})} className="w-full p-2 border rounded-lg">
              <option value="sarees">Sarees</option><option value="kurtis">Kurtis</option><option value="lehengas">Lehengas</option><option value="dresses">Dresses</option>
            </select>

            <div>
              <label className="block text-sm font-medium mb-1">Upload Image</label>
              <input type="file" accept="image/*" onChange={(e)=>{ const f = e.target.files?.[0]; if (f) readFileToDataUrl(f, (d)=> setEditData({...editData, image: d})); }} />
            </div>

            <textarea value={editData.description} onChange={(e)=>setEditData({...editData, description: e.target.value})} className="w-full p-2 border rounded-lg h-28" placeholder="Description" />

            <div className="grid grid-cols-2 gap-2">
              <input value={(editData.sizes || []).join(',')} onChange={(e)=>setEditData({...editData, sizes: e.target.value.split(',').map(s=>s.trim()).filter(Boolean)})} className="p-2 border rounded-lg" placeholder="Sizes comma separated (M,L,XL,2XL)" />
              <input value={(editData.colors || []).join(',')} onChange={(e)=>setEditData({...editData, colors: e.target.value.split(',').map(c=>c.trim()).filter(Boolean)})} className="p-2 border rounded-lg" placeholder="Colors comma separated (Red,Blue)" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <input type="number" value={editData.rating || 0} onChange={(e)=>setEditData({...editData, rating: parseFloat(e.target.value || 0)})} className="p-2 border rounded-lg" placeholder="Rating (0-5)" />
              <input type="number" value={editData.reviews || 0} onChange={(e)=>setEditData({...editData, reviews: parseInt(e.target.value || 0)})} className="p-2 border rounded-lg" placeholder="Reviews count" />
            </div>

            <div className="flex gap-2">
              <button onClick={()=>saveProduct(product.id, editData)} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2"><Save size={16}/> Save</button>
              <button onClick={()=>setEditingProduct(null)} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">Cancel</button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex gap-4 mb-4">
              <img src={product.image || 'https://via.placeholder.com/160x160?text=No+Image'} alt={product.name} className="w-20 h-20 object-cover rounded-lg" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{product.name}</h3>
                <p className="text-gray-600 text-sm">{product.description}</p>
                <div className="flex items-center gap-2 mt-2"><span className="font-bold">₹{product.price}</span>{product.originalPrice && <span className="text-gray-500 line-through">₹{product.originalPrice}</span>}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={()=> setEditingProduct(product.id)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center gap-1"><Edit2 size={14}/> Edit</button>
              <button onClick={()=> deleteProduct(product.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 flex items-center gap-1"><Trash2 size={14}/> Delete</button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                  <img src={logoData || 'data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2280%22 height=%2280%22><text x=%225%22 y=%2250%22 font-size=%2240%22>VH</text></svg>'} alt="VH" className="w-8 h-8 object-contain" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">VASTRA HARI</h1>
                  <p className="text-sm text-gray-600">WOMEN'S CLOTHING SHOP</p>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <button onClick={()=>setActiveSection('home')} className={`${activeSection==='home' ? 'text-pink-600' : 'text-gray-700'} hover:text-pink-600 transition-colors`}>Home</button>
              <button onClick={()=>setActiveSection('products')} className={`${activeSection==='products' ? 'text-pink-600' : 'text-gray-700'} hover:text-pink-600 transition-colors`}>Products</button>
              <button onClick={()=>setActiveSection('about')} className={`${activeSection==='about' ? 'text-pink-600' : 'text-gray-700'} hover:text-pink-600 transition-colors`}>About</button>
              <button onClick={()=>setActiveSection('contact')} className={`${activeSection==='contact' ? 'text-pink-600' : 'text-gray-700'} hover:text-pink-600 transition-colors`}>Contact</button>
              <button onClick={()=>setActiveSection('cart')} className={`${activeSection==='cart' ? 'text-pink-600' : 'text-gray-700'} hover:text-pink-600 transition-colors`}>Cart ({cartItems.reduce((s,i)=>s+i.quantity,0)})</button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-pink-500 focus:border-transparent" />
              </div>

              <div className="relative">
                <button onClick={()=>setActiveSection('cart')} className="p-2 text-gray-700 hover:text-pink-600 transition-colors"><ShoppingCart size={24} /></button>
                {cartItems.length > 0 && (<span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{cartItems.length}</span>)}
              </div>

              {!isAdminLogin ? (
                <button onClick={()=>setShowAdminLogin(true)} className="p-2 text-gray-700 hover:text-pink-600 transition-colors"><User size={24} /></button>
              ) : (
                <div className="flex items-center gap-2">
                  <button onClick={()=>setActiveSection('admin')} className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:from-blue-600 hover:to-blue-700">Admin Panel</button>
                  <button onClick={()=>{ setIsAdminLogin(false); setActiveSection('home'); }} className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600">Logout</button>
                </div>
              )}

              <button onClick={()=>setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-gray-700 hover:text-pink-600">{isMenuOpen ? <X size={24}/> : <Menu size={24}/>}</button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t">
            <div className="px-4 py-2 space-y-2">
              <div className="pb-4 relative">
                <Search className="absolute left-7 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-pink-500 focus:border-transparent" />
              </div>
              {['home','products','about','contact','cart'].map(section=> (
                <button key={section} onClick={()=>{ setActiveSection(section); setIsMenuOpen(false); }} className={`block w-full text-left px-4 py-2 ${activeSection===section ? 'text-pink-600 bg-pink-50' : 'text-gray-700'} hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors capitalize`}>{section}</button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-90vw">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Admin Login</h3>
              <button onClick={()=>setShowAdminLogin(false)} className="text-gray-500 hover:text-gray-700"><X size={20}/></button>
            </div>
            <div className="space-y-4">
              <input type="text" placeholder="Username" value={adminCredentials.username} onChange={(e)=>setAdminCredentials({...adminCredentials, username: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              <div className="relative">
                <input type={showPassword ? "text" : "password"} placeholder="Password" value={adminCredentials.password} onChange={(e)=>setAdminCredentials({...adminCredentials, password: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10" />
                <button type="button" onClick={()=>setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">{showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}</button>
              </div>
              <button onClick={handleAdminLogin} className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold">Login</button>
              {/* <p className="text-sm text-gray-600 text-center">Demo credentials: admin / vastrahari@2024</p> */}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Home */}
        {activeSection==='home' && (
          <>
            <div className="relative mb-12 rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10"></div>
              <img src={bannerData.image} alt="Banner" className="w-full h-96 md:h-[500px] object-cover" />
              <div className="absolute inset-0 z-20 flex items-center">
                <div className="max-w-2xl mx-auto text-center px-6">
                  <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">{bannerData.title}</h2>
                  <p className="text-xl md:text-2xl text-white/90 mb-8">{bannerData.subtitle}</p>
                  <button onClick={()=>setActiveSection('products')} className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all shadow-lg">Shop Now</button>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-12">
              {[{ icon: Truck, title: "Free Delivery", desc: "On orders above ₹999" },{ icon: RotateCcw, title: "Easy Returns", desc: "7 day return policy"},{ icon: Shield, title: "Secure Payment", desc: "100% secure checkout"},{ icon: Clock, title: "24/7 Support", desc: "Always here to help"}].map((feature,index)=> (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow"><feature.icon className="mx-auto text-pink-500 mb-4" size={48} /><h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3><p className="text-gray-600 text-sm">{feature.desc}</p></div>
              ))}
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Featured Products</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">{products.slice(0,4).map(p=> <ProductCard key={p.id} product={p} />)}</div>
              <div className="text-center mt-8"><button onClick={()=>setActiveSection('products')} className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105 font-semibold">View All Products</button></div>
            </div>
          </>
        )}

        {/* Products */}
        {activeSection==='products' && (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/4">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2"><Filter size={20}/> Filters</h3>
                <div className="mb-6">
                  <h4 className="font-medium text-gray-700 mb-3">Categories</h4>
                  <div className="space-y-2">{categories.map(category=> (<button key={category.id} onClick={()=>setSelectedCategory(category.id)} className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${selectedCategory===category.id ? 'bg-pink-100 text-pink-600 border border-pink-200' : 'hover:bg-gray-100 text-gray-700'}`}><div className="flex justify-between items-center"><span>{category.name}</span><span className="text-sm">({category.count})</span></div></button>))}</div>
                </div>
              </div>
            </div>

            <div className="lg:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <div><h2 className="text-2xl font-bold text-gray-800">Our Products</h2><p className="text-gray-600">Showing {filteredProducts.length} products</p></div>
                <div className="flex items-center gap-2"><button onClick={()=>setViewMode('grid')} className={`p-2 rounded-lg ${viewMode==='grid' ? 'bg-pink-100 text-pink-600' : 'text-gray-600 hover:bg-gray-100'}`}><Grid size={20}/></button><button onClick={()=>setViewMode('list')} className={`p-2 rounded-lg ${viewMode==='list' ? 'bg-pink-100 text-pink-600' : 'text-gray-600 hover:bg-gray-100'}`}><List size={20}/></button></div>
              </div>

              <div className={`grid ${viewMode==='grid' ? 'md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'} gap-6`}>{filteredProducts.map(product=> <ProductCard key={product.id} product={product} />)}</div>

              {filteredProducts.length===0 && <div className="text-center py-12"><div className="text-gray-400 mb-4"><Search size={48} className="mx-auto" /></div><h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3><p className="text-gray-500">Try adjusting your search or filter criteria</p></div>}
            </div>
          </div>
        )}

        {/* About */}
        {activeSection==='about' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12"><h2 className="text-3xl font-bold text-gray-800 mb-4">{aboutData.title}</h2><p className="text-xl text-gray-600">{aboutData.content}</p></div>
            <div className="grid md:grid-cols-2 gap-12 items-center mb-12"><div><img src={aboutData.image} alt="About us" className="rounded-xl shadow-lg w-full" /></div><div><h3 className="text-2xl font-semibold text-gray-800 mb-4">{aboutData.title}</h3><p className="text-gray-600 mb-4">{aboutData.content}</p><div className="grid grid-cols-2 gap-4"><div className="text-center p-4 bg-pink-50 rounded-lg"><div className="text-2xl font-bold text-pink-600 mb-1">1000+</div><div className="text-sm text-gray-600">Happy Customers</div></div><div className="text-center p-4 bg-purple-50 rounded-lg"><div className="text-2xl font-bold text-purple-600 mb-1">500+</div><div className="text-sm text-gray-600">Products</div></div></div></div></div>
          </div>
        )}

        {/* Contact */}
        {activeSection==='contact' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12"><h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h2><p className="text-xl text-gray-600">We'd love to hear from you!</p></div>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Get in Touch</h3>
                <div className="space-y-4"><div className="flex items-center gap-4"><Phone className="text-pink-500" size={24} /><div><div className="font-semibold">Phone</div><div className="text-gray-600">{contactData.phone}</div></div></div><div className="flex items-center gap-4"><Mail className="text-pink-500" size={24} /><div><div className="font-semibold">Email</div><div className="text-gray-600">{contactData.email}</div></div></div><div className="flex items-center gap-4"><MapPin className="text-pink-500" size={24} /><div><div className="font-semibold">Address</div><div className="text-gray-600">{contactData.address}</div></div></div></div>

                <div className="mt-8"><h4 className="font-semibold text-gray-800 mb-4">Follow Us</h4><div className="flex gap-4"><button className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"><Facebook size={20}/></button><button className="p-3 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors"><Instagram size={20}/></button><button className="p-3 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors"><Twitter size={20}/></button></div></div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Send us a Message</h3>
                <form onSubmit={(e)=>{ e.preventDefault(); const fd=new FormData(e.target); const name=fd.get('name'); const phone=fd.get('phone'); const email=fd.get('email'); const msg=fd.get('message'); const messageLines = [`New message from website:`, `Name: ${name}`, `Phone: ${phone}`, `Email: ${email}`, `Message: ${msg}`].join('%0A'); window.open(`https://wa.me/9099226221?text=${encodeURIComponent(messageLines)}`,'_blank'); }} className="space-y-4">
                  <input name="name" type="text" placeholder="Your Name" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" />
                  <input name="email" type="email" placeholder="Your Email" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" />
                  <input name="phone" type="tel" placeholder="Your Phone" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" />
                  <textarea name="message" placeholder="Your Message" rows="4" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"></textarea>
                  <button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Cart */}
        {activeSection==='cart' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Your Cart</h2>
            {cartItems.length===0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">Your cart is empty.</p>
                <button onClick={()=>setActiveSection('products')} className="bg-pink-500 text-white px-4 py-2 rounded-lg">Shop Now</button>
              </div>
            ) : (
              <div className="grid gap-4">
                {cartItems.map((item, idx)=> (
                  <div key={idx} className="bg-white rounded-lg p-4 flex items-center gap-4">
                    <img src={item.image || 'https://via.placeholder.com/160x160?text=No+Image'} alt={item.name} className="w-24 h-24 object-cover rounded" />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                      <div className="flex items-center gap-2 mt-2"><div>Size: <strong>{item.selectedSize}</strong></div><div>Color: <strong>{item.selectedColor}</strong></div><div>Qty: <strong>{item.quantity}</strong></div></div>
                      <div className="mt-2 flex gap-2">
                        <button onClick={()=>{ const copy=[...cartItems]; copy[idx].quantity++; setCartItems(copy); }} className="px-3 py-1 bg-gray-100 rounded">+</button>
                        <button onClick={()=>{ const copy=[...cartItems]; if(copy[idx].quantity>1){copy[idx].quantity--; setCartItems(copy);} else removeCartItem(idx); }} className="px-3 py-1 bg-gray-100 rounded">-</button>
                        <button onClick={()=>removeCartItem(idx)} className="px-3 py-1 bg-red-500 text-white rounded">Remove</button>
                        <button onClick={()=>sendToWhatsApp(item, { selectedSize: item.selectedSize, selectedColor: item.selectedColor, quantity: item.quantity })} className="px-3 py-1 bg-green-500 text-white rounded">Order via WhatsApp</button>
                      </div>
                    </div>
                    <div className="text-right"><div className="font-bold">₹{(item.price*item.quantity).toLocaleString()}</div></div>
                  </div>
                ))}

                {wishlist.length>0 && (
                  <div className="bg-white p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Liked Products</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      {wishlist.map(id=> {
                        const p = products.find(x=>x.id===id); if(!p) return null;
                        return (
                          <div key={id} className="p-2 border rounded">
                            <img src={p.image} alt={p.name} className="w-full h-28 object-cover mb-2" />
                            <div className="font-semibold">{p.name}</div>
                            <div className="flex gap-2 mt-2">
                              <button onClick={()=>moveWishlistToCart(id)} className="bg-pink-500 text-white px-3 py-1 rounded">Move to Cart</button>
                              <button onClick={()=>toggleWishlist(id)} className="px-3 py-1 border rounded">Remove</button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Admin Panel */}
        {activeSection==='admin' && isAdminLogin && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <div><h2 className="text-3xl font-bold text-gray-800">Admin Panel</h2><p className="text-gray-600">Manage products and content</p></div>
              <div className="flex gap-2">
                <button onClick={addProduct} className="bg-green-500 text-white px-4 py-2 rounded">Add Product</button>
                <button onClick={()=>{ localStorage.clear(); window.location.reload(); }} className="bg-red-500 text-white px-4 py-2 rounded">Reset Demo Data</button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">Banner & Logo</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input type="text" value={bannerData.title} onChange={(e)=>setBannerData({...bannerData, title: e.target.value})} className="p-3 border rounded" placeholder="Banner Title" />
                <input type="text" value={bannerData.subtitle} onChange={(e)=>setBannerData({...bannerData, subtitle: e.target.value})} className="p-3 border rounded" placeholder="Banner Subtitle" />
                <div className="md:col-span-2">
                  <label className="block mb-2">Upload Banner Image</label>
                  <input type="file" accept="image/*" onChange={(e)=>{ const f=e.target.files?.[0]; if(f) readFileToDataUrl(f, (d)=> setBannerData({...bannerData, image: d})); }} />
                </div>
                <div>
                  <label className="block mb-2">Upload Logo</label>
                  <input type="file" accept="image/*" onChange={(e)=>{ const f=e.target.files?.[0]; if(f) readFileToDataUrl(f, (d)=> setLogoData(d)); }} />
                </div>
                {logoData && <div className="flex items-center gap-4"><img src={logoData} alt="logo" className="w-20 h-20 object-contain" /><div className="text-sm text-gray-600">Current logo</div></div>}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">About Page</h3>
              <input type="text" value={aboutData.title} onChange={(e)=>setAboutData({...aboutData, title: e.target.value})} className="w-full p-3 border rounded mb-2" />
              <textarea value={aboutData.content} onChange={(e)=>setAboutData({...aboutData, content: e.target.value})} className="w-full p-3 border rounded mb-2" rows={4}></textarea>
              <div className="flex gap-4 items-center">
                <input type="file" accept="image/*" onChange={(e)=>{ const f=e.target.files?.[0]; if(f) readFileToDataUrl(f, (d)=> setAboutData({...aboutData, image: d})); }} />
                <button onClick={()=>alert('About page updated')} className="bg-blue-500 text-white px-4 py-2 rounded">Save About</button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">Contact Page</h3>
              <input type="text" value={contactData.phone} onChange={(e)=>setContactData({...contactData, phone: e.target.value})} className="w-full p-3 border rounded mb-2" />
              <input type="email" value={contactData.email} onChange={(e)=>setContactData({...contactData, email: e.target.value})} className="w-full p-3 border rounded mb-2" />
              <input type="text" value={contactData.address} onChange={(e)=>setContactData({...contactData, address: e.target.value})} className="w-full p-3 border rounded mb-2" />
              <button onClick={()=>alert('Contact info updated')} className="bg-blue-500 text-white px-4 py-2 rounded">Save Contact</button>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Products Management</h3>
              <div className="grid gap-6">{products.map(p=> <AdminProductCard key={p.id} product={p} />)}</div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                  <img src={logoData || 'data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2280%22 height=%2280%22><text x=%225%22 y=%2250%22 font-size=%2240%22>VH</text></svg>'} alt="VH" className="w-6 h-6 object-contain" />
                </div>
                <div><h3 className="text-lg font-bold">VASTRA HARI</h3><p className="text-sm text-gray-400">Women's Clothing</p></div>
              </div>
              <p className="text-gray-400 text-sm">Your trusted destination for beautiful women's clothing. Quality, style, and elegance in every piece.</p>
            </div>

            <div><h4 className="font-semibold mb-4">Quick Links</h4><div className="space-y-2">{['Home','Products','About','Contact','Cart'].map(link=>(<button key={link} onClick={()=>setActiveSection(link.toLowerCase())} className="block text-gray-400 hover:text-white transition-colors">{link}</button>))}</div></div>

            <div><h4 className="font-semibold mb-4">Categories</h4><div className="space-y-2">{['Sarees','Kurtis','Lehengas','Dresses'].map(cat=>(<button key={cat} onClick={()=>{ setSelectedCategory(cat.toLowerCase()); setActiveSection('products'); }} className="block text-gray-400 hover:text-white transition-colors">{cat}</button>))}</div></div>

            <div><h4 className="font-semibold mb-4">Contact Info</h4><div className="space-y-2 text-gray-400"><div className="flex items-center gap-2"><Phone size={16} /><span>{contactData.phone}</span></div><div className="flex items-center gap-2"><Mail size={16} /><span>{contactData.email}</span></div><div className="flex items-center gap-2"><MapPin size={16} /><span>{contactData.address}</span></div></div></div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center"><p className="text-gray-400">© 2024 Vastra Hari. All rights reserved.</p></div>
        </div>
      </footer>
    </div>
  );
};

export default VastraHari;
