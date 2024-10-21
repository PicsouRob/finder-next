"use client";

import { useContext } from "react";

import Testimonial from "@/components/home/Testimonial";
import ContentInfo from "@/components/home/ContentInfo";
import SearchCategories from "@/components/home/SearchCategories";
import FindLink from "@/components/home/FindLink";
import Blog from "@/components/home/Blog";
import Services from "@/components/home/Services";
import Header from "@/components/nav/Header";
import Info from "@/components/home/Info";
import RecentPostedJobs from "@/components/jobs/RecentPostedJobs";
import Freelancers from "@/components/home/Freelancers";
import Footer from "@/components/commons/Footer";
import Hero from "@/components/home/Hero";
import { SessionContext } from "@/context/sessionContext";
import AuthenticatedHome from "./(dashboard)/AuthenticatedHome";

const Home: React.FC = () => {
    const { isAuthenticated } = useContext(SessionContext);
    
    return (
        <div className="">
            <Header />

            {!isAuthenticated ? (
                <>
                    <Hero />
                    <RecentPostedJobs />
                    <Freelancers />
                    <Services />
                    <Info />
                    <ContentInfo />
                    <SearchCategories />
                    <FindLink />
                    <Blog />
                    <Testimonial />
                </>
            ) : (
                <AuthenticatedHome />
            )}

            <Footer />
        </div>
    );
}

export default Home;