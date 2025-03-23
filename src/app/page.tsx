import React from 'react';
import Banner from '@/components/home/Banner';
import Categories from '@/components/home/Categories';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import SpecialOffers from '@/components/home/SpecialOffers';
import { FeaturesSection } from '@/components/home/WhyChooseUs';

const Home: React.FC = () => {
  return (
    <div>
      
      <Banner />
      <Categories />
      <FeaturedProducts />
      <FeaturesSection/>
      <SpecialOffers />
    </div>
  );
};

export default Home;
