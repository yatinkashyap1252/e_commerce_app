import React from "react";
import { Helmet } from "react-helmet-async";

const Title = ({
  title = "E_commerce_admin",
  description = "Lets control everything",
}) => {
  return <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
  </Helmet>;
};

export default Title;
