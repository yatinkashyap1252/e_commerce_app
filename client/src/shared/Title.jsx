import React from "react";
import { Helmet } from "react-helmet-async";

const Title = ({
  title = "E-Commerce",
  description = "lets have something new!",
}) => {
  return <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
  </Helmet>;
};

export default Title;
