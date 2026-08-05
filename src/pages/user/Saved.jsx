import React, { useState } from 'react';
import { Heart, MapPin, Star, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import UserLayout from '../../layouts/Userlayout';
import Card from '../../components/user/Card';

const mockSaved = [
  {
    id: 1,
    name: "Taj Falaknuma Palace - Hyderabad",
    propertyType: "Palace Hotel",
    stars: 5,
    location: "Engine Bowli, Falaknuma, Hyderabad",
    subLocation: "5 km from Charminar • 15 km from Rajiv Gandhi Int'l Airport",
    badges: [
      { text: "Luxury Heritage", type: "pink-outline", icon: "diamond" },
      { text: "Top Rated", type: "outline" }
    ],
    features: [
      "Royal palace experience with personal butler service",
      "Authentic Nizam dining and panoramic city views"
    ],
    promoTags: ["Free Breakfast Included", "Pay at Hotel"],
    ratingScore: "4.9",
    ratingText: "Exceptional",
    reviews: "3,820 reviews",
    locationScore: "4.9 Location score",
    pricingLabel: "Per night for 2 guests",
    oldPrice: "Rs. 32,000",
    discount: "-20%",
    price: "Rs. 25,600",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800"
    ],
    amenities: ["WiFi", "Parking", "AC", "Pool", "Spa", "Bar"],
    awardBadge: "Nizam Choice"
  },
  {
    id: 2,
    name: "ITC Kohenur, A Luxury Collection Hotel",
    propertyType: "Luxury Resort",
    stars: 5,
    location: "HITEC City, Hyderabad",
    subLocation: "Overlooking Durgam Cheruvu Lake • 800 m from Mindspace IT Park",
    badges: [
      { text: "Booked 32 times today", type: "red-text" }
    ],
    features: [
      "Stunning lake views with rooftop lounge & infinity pool",
      "Multiple award-winning restaurants & wellness spa"
    ],
    promoTags: ["Free Cancellation", "No Prepayment"],
    ratingScore: "4.8",
    ratingText: "Exceptional",
    reviews: "2,150 reviews",
    locationScore: "4.8 Location score",
    pricingLabel: "Per night for 2 guests",
    oldPrice: "Rs. 24,000",
    discount: "-15%",
    price: "Rs. 20,400",
    images: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800"
    ],
    amenities: ["WiFi", "Parking", "AC", "Pool", "Gym", "Bar"],
    awardBadge: "Traveller Review Awards 2024"
  }
];

const Saved = () => {
  const [savedProperties, setSavedProperties] = useState(mockSaved);
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('smartstay_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const toggleFavorite = (e, id) => {
    e.stopPropagation();
    let updated;
    if (favorites.includes(id)) {
      updated = favorites.filter(favId => favId !== id);
    } else {
      updated = [...favorites, id];
    }
    setFavorites(updated);
    localStorage.setItem('smartstay_favorites', JSON.stringify(updated));
    window.dispatchEvent(new Event('favorites-update'));
  };

  return (
    <UserLayout>
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 min-h-[70vh]">


        {savedProperties.filter(p => favorites.includes(p.id)).length > 0 ? (
          <div className="flex flex-col gap-5 max-w-4xl">
            {savedProperties.filter(p => favorites.includes(p.id)).map(property => (
              <Card 
                key={property.id} 
                hotel={property} 
                favorites={favorites} 
                toggleFavorite={toggleFavorite} 
                isDetailed={false} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-200 border-dashed">
            <Heart size={48} className="text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-700 mb-2">No saved properties yet</h3>
            <p className="text-slate-500 mb-6">Start exploring to find properties you love.</p>
            <Link 
              to="/listing"
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors inline-block"
            >
              Explore Properties
            </Link>
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default Saved;
