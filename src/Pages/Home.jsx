import React from 'react';
import Banner from '../Components/Banner';
import Featured from '../Components/Featured';
import Contact from '../Components/Contact';
import UpcomingCamps from './UpcomingCamps';
import DonorStories from './DonorStories';
import MissionSection from './MissionSection';



const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Featured></Featured>
            <UpcomingCamps></UpcomingCamps>
            <DonorStories></DonorStories>
            <MissionSection></MissionSection>
            <Contact></Contact>
        </div>
    );
};

export default Home;