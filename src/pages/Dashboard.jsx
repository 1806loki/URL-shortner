import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import axios from "axios";
import LinkCard from "../components/LinkCard/LinkCard";

const Dashboard = () => {
  const [links, setLinks] = useState([]);
  const handleDeleteLink = (deletedShortId) => {
    setLinks(links.filter((link) => link.shortId !== deletedShortId));
  };

  useEffect(() => {
    const getLinks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api ");

        const result = await response.data;
        console.log("result", result.links);
        setLinks(result.links);
      } catch (error) {
        console.log(error);
      }
    };

    getLinks();
  }, []);
  return (
    <>
      <Navbar />
      {links.map((link) => (
        <LinkCard
          key={link._id}
          originalURL={link.originalURL}
          shortId={link.shortId}
          onDelete={handleDeleteLink}
          createdAt={link.createdAt}
          clicks={link.clicks}
        />
      ))}
    </>
  );
};

export default Dashboard;
